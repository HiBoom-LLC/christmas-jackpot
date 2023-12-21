import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MenuPage from "./menu-page";
import Snowfall from "react-snowfall";
import "./App.css";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        newestOnTop={true}
        hideProgressBar={false}
        pauseOnHover
        theme="colored"
      />
      <div className="background">
        <Snowfall
          style={{
            width: "100%",
          }}
        />
        <div className="contentWrapper">
          <div className="wrapper">
            <MenuPage />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
