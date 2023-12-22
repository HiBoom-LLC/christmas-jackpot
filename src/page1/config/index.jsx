import * as XLSX from "xlsx";
import "./index.css";
import FileUploader from "../../file-uploader";
import Button from "../../button";
import dayjs from "dayjs";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Config = () => {
  const [timeString, setTimeString] = useState("");
  const [userData, setUserData] = useState([]);
  const [excelData, setExcelData] = useState([]);
  const navigate = useNavigate();

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
        let sortedData = data
          .filter((rowData) => rowData.__rowNum__ > 8)
          .sort((a, b) => {
            if (a.__EMPTY_1 > b.__EMPTY_1) {
              return 1;
            }
            return -1;
          });

        let groupData = {};
        sortedData.map((item) => {
          if (!groupData.hasOwnProperty(item.__EMPTY)) {
            groupData[item.__EMPTY] = sortedData.filter(
              (it) => it.__EMPTY === item.__EMPTY
            );
          }
        });
        
        const uniqueData = Object.keys(groupData).map((key) => {
          return groupData[key][0];
        });

        sortedData = uniqueData.sort((a, b) => {
          if (a.__EMPTY_1 > b.__EMPTY_1) {
            return 1;
          }
          return -1;
        });
        setExcelData(sortedData);
        setUserData(sortedData);
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

    toast.success("Амжилттай");
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

              setUserData(
                excelData.filter((item) => {
                  const date2 = dayjs(item.__EMPTY_1);
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
              <th>Ажилтны код</th>
              <th>Ирсэн цаг</th>
            </tr>
          </thead>
          <tbody>
            {userData?.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.__EMPTY}</td>
                  <td>{item.__EMPTY_1}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="total">Нийт орологч: {userData.length}</div>
      <div className="d-flex justify-content-end">
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
