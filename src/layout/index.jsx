import "./index.css";
import { IoChevronBack } from "react-icons/io5";
import Snowfall from "react-snowfall";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router";

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  const navigate = useNavigate();

  return (
    <div className="background">
      <Snowfall
        style={{
          width: "100%",
        }}
      />
      <ToastContainer
        position="top-right"
        newestOnTop={true}
        hideProgressBar={false}
        pauseOnHover
        theme="colored"
      />
      <div className="header">
        <div className="headerItems">
          {/* <img
            className="logo"
            src={"/logoVitarium.jpg"}
            alt="vitariumLog"
            height={100}
            width={160}
          /> */}
          <button
            className="backButton"
            onClick={() => {
              navigate(-1);
            }}
          >
            <IoChevronBack size={32} color={"white"} />
          </button>
        </div>
      </div>
      <div className="pageLayout">
        <div className="pageContent">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
