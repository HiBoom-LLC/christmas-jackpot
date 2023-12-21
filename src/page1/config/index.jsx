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
        setUserData(
          data
            .filter((rowData) => rowData.__rowNum__ > 8)
            .sort((a, b) => {
              if (a.__EMPTY_1 > b.__EMPTY_1) {
                return 1;
              }
              return -1;
            })
        );
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
        ready: true,
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
          className="timeInput"
          placeholder="2023-12-31 00:00:00"
          value={timeString}
          onChange={(e) => {
            setTimeString(e.target.value);
          }}
        />
      </div>
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
