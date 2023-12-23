import * as XLSX from "xlsx";
import "./index.css";
import FileUploader from "../../file-uploader";
import Button from "../../button";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import workersData from "../../assets/workers202312221712.json";

// eslint-disable-next-line react/prop-types
const Config3 = () => {
  const [userData, setUserData] = useState([]);
  const [gift, setGift] = useState("");
  const navigate = useNavigate();

  const matchData = (timeData) => {
    const timeDataKeys = Object.keys(timeData[0]);
    return timeData
      .map((item) => {
        const worker = workersData.find(
          (wd) => wd["ID дугаар"] === item?.[timeDataKeys[1]]
        );
        if (worker) {
          return {
            ...item,
            ...worker,
          };
        } else {
          return null;
        }
      })
      .filter((it) => it !== null);
  };

  const fileUpload = (file) => {
    if (!file) {
      setUserData([]);
      return;
    }

    let reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = (e) => {
      if (e?.target?.result) {
        const workbook = XLSX.read(e.target.result, { type: "buffer" });
        const worksheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[worksheetName];
        const data = XLSX.utils.sheet_to_json(worksheet);
        const timeDataKeys = Object.keys(data[0]);
        let sortedData = data.sort((a, b) => {
          if (a?.[timeDataKeys[2]] > b?.[timeDataKeys[2]]) {
            return 1;
          }
          return -1;
        });

        let groupData = {};
        sortedData.map((item) => {
          if (!groupData.hasOwnProperty(item?.[timeDataKeys[1]])) {
            groupData[item?.[timeDataKeys[1]]] = sortedData.filter(
              (it) => it?.[timeDataKeys[1]] === item?.[timeDataKeys[1]]
            );
          }
        });

        const uniqueData = Object.keys(groupData).map((key) => {
          return groupData[key][0];
        });

        sortedData = uniqueData.sort((a, b) => {
          if (a?.[timeDataKeys[2]] > b?.[timeDataKeys[2]]) {
            return 1;
          }
          return -1;
        });
        const matchedData = matchData(sortedData);
        setUserData(matchedData);
      }
    };
  };

  const configDone = () => {
    if (!userData || userData?.length <= 0) {
      toast.warn("Оролцогчдийн бүртгэл файл оруулна уу.");
      return;
    }

    if (!gift) {
      toast.warn("Шагналын нэр оруулна уу.");
      return;
    }

    localStorage.setItem(
      "game3",
      JSON.stringify({
        usersData: userData,
        gift,
      })
    );
    navigate("/game3/jackpot");
  };

  return (
    <div className="backgroundWrapper">
      <div
        className="formGroup"
        style={{
          marginTop: 16,
        }}
      >
        <label>Оролцогчдын бүртгэл файл</label>
        <FileUploader onChange={fileUpload} />
      </div>

      <div className="formGroup">
        <label>Шагналын нэр</label>
        <input
          className="input"
          placeholder="Шагналын нэр оруулна уу"
          value={gift}
          onChange={(e) => {
            setGift(e.target.value);
          }}
        />
      </div>
      <div
        className="tableWrapper"
        style={{
          marginTop: 32,
        }}
      >
        <table className="table">
          <thead>
            <tr>
              <th>№</th>
              <th>ID</th>
              <th>Алба/Салбар</th>
              <th>Нэр</th>
              <th>Ширээ</th>
              <th>Ирсэн цаг</th>
            </tr>
          </thead>
          <tbody>
            {userData?.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item?.["ID дугаар"]}</td>
                  <td>{item?.["Алба/Салбар"]}</td>
                  <td>{item?.[" Нэр"]}</td>
                  <td>{item?.["Ширээний дугаар"]}</td>
                  <td>{item?.["Time"]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="d-flex justify-content-between align-items-center">
        <div className="total">Нийт орологч: {userData.length}</div>
        <Button
          onClick={() => {
            configDone();
          }}
          style={{
            marginTop: 16,
          }}
        >
          Үргэлжлүүлэх
        </Button>
      </div>
    </div>
  );
};

export default Config3;