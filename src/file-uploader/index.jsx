import { useRef, useState } from "react";
import { SiMicrosoftexcel } from "react-icons/si";
import "./index.css";
import Button from "../button";

// eslint-disable-next-line react/prop-types
const FileUploader = ({ onChange = () => {} }) => {
  const fileRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleChange = (e) => {
    if (e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
      onChange(e.target.files[0]);
    } else {
      setSelectedFile(null);
      onChange(null);
    }
  };

  return (
    <>
      <input
        ref={fileRef}
        type="file"
        accept=".xls,.xlsx,.csv"
        hidden={true}
        onChange={handleChange}
      />
      <div
        className="fileUploader"
        onClick={() => {
          if (!selectedFile) {
            fileRef.current.click();
          }
        }}
      >
        {selectedFile ? (
          <div className="fileInfoWrapper">
            <div className="fileInfo">
              <SiMicrosoftexcel color="white" size={48} />
              <p>{selectedFile.name}</p>
            </div>
            <Button
              onClick={() => {
                fileRef.current.click();
              }}
            >
              Файл солих
            </Button>
          </div>
        ) : (
          <>
            <SiMicrosoftexcel color="white" size={64} />
            <p
              style={{
                marginBottom: 5,
              }}
            >
              Excel файл оруулна уу.
            </p>
          </>
        )}
      </div>
    </>
  );
};

export default FileUploader;
