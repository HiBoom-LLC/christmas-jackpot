import { useContext } from "react";
import "./index.css";
import { IoChevronBack } from "react-icons/io5";
import { MainContext } from "../mainContext";
import Snowfall from "react-snowfall";

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  const { prevPage, pageHistory } = useContext(MainContext);
  return (
    <div className="background">
      <Snowfall
        style={{
          width: "100%",
        }}
      />

      <div className="header">
        <div className="headerItems">
          {pageHistory !== undefined ? (
            <button
              className="backButton"
              onClick={() => {
                prevPage();
              }}
            >
              <IoChevronBack size={32} color={"white"} />
            </button>
          ) : null}
        </div>
      </div>
      <div className="pageLayout">
        <div className="pageContent">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
