import * as XLSX from "xlsx";
import "./index.css";
import FileUploader from "../../file-uploader";
import Button from "../../button";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import workersData from "../../assets/workers202312221712.json";

// eslint-disable-next-line react/prop-types
const Config = () => {
  const [timeString, setTimeString] = useState("");
  const [userData, setUserData] = useState([]);
  const [excelData, setExcelData] = useState([]);
  const [luckyMan, setLuckyMan] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const l = localStorage.getItem("luckyMan");
    if (l) {
      const arr = JSON.parse(l);
      setLuckyMan(arr);
    }
  }, []);

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
        luckyMan.map((lm) => {
          let rmi = matchedData.findIndex(
            (item) => item?.["ID дугаар"] === lm?.["ID дугаар"]
          );
          if (rmi > -1) {
            matchedData.splice(rmi, 1);
          }
        });

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

  const search = (code) => {
    setUserData(excelData.filter((item) => item?.["ID дугаар"].startsWith(code) ));
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
              <th>
                <div className="d-flex">
                  ID{" "}
                  <input
                    className="search"
                    onChange={(e) => search(e.target.value)}
                  />
                </div>
              </th>
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
        <div className="total">Нийт оролцогч: {userData.length}</div>
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
