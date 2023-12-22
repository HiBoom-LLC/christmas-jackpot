import * as XLSX from "xlsx";
import "./index.css";
import FileUploader from "../../file-uploader";
import Button from "../../button";
import dayjs from "dayjs";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import workersData from "../../assets/workers202312221712.json";

// eslint-disable-next-line react/prop-types
const Config = () => {
  const [timeString, setTimeString] = useState("");
  const [userData, setUserData] = useState([]);
  const [excelData, setExcelData] = useState([]);
  const navigate = useNavigate();

  const matchData = (timeData) => {
    const timeDataKeys = Object.keys(timeData[0]);
    const workerDataKeys = Object.keys(workersData[0]);
    return timeData
      .map((item) => {
        const worker = workersData.find(
          (wd) => wd[workerDataKeys[5]] === item?.[timeDataKeys[1]]
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
        setExcelData(matchedData);
        setUserData(matchedData);
      }
    };
  };

  const configDone = () => {
    if (!userData || userData?.length <= 0) {
      toast.warn("Оролцогчдийн бүртгэл файл оруулна уу.");
      return;
    }

    if (!timeString) {
      toast.warn("Ирсэн цаг оруулна уу.");
      return;
    }
    if (!dayjs(timeString, "YYYY-MM-DD HH:mm:ss", false).isValid()) {
      toast.warn("Ирсэн цагийн формат буруу байна.");
      return;
    }

    localStorage.setItem(
      "game1",
      JSON.stringify({
        usersData: userData,
        time: timeString,
      })
    );
    navigate("/game1/jackpot");
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
        <label>Ирсэн цаг</label>
        <input
          className="input"
          placeholder="2023-12-31 00:00:00"
          value={timeString}
          onChange={(e) => {
            setTimeString(e.target.value);
            if (e.target.value.length > 12) {
              const date = dayjs(e.target.value);

              const timeDataKeys = Object.keys(excelData[0]);
              setUserData(
                excelData.filter((item) => {
                  const date2 = dayjs(item?.[timeDataKeys[2]]);
                  return date2.diff(date) < 0;
                })
              );
            }
          }}
        />
      </div>
      <div className="tableWrapper">
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
              const userDataKeys = Object.keys(item);
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item?.[userDataKeys[1]]}</td>
                  <td>{item?.[userDataKeys[6]]}</td>
                  <td>{item?.[userDataKeys[8]]}</td>
                  <td>{item?.[userDataKeys[10]]}</td>
                  <td>{item?.[userDataKeys[2]]}</td>
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

export default Config;
