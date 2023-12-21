import "./CustomModal.css";
import Modal from "react-modal";
import React from "react";
import championJson from "../../src/assets/champion.json";
import fireworkJson from "../../src/assets/champion-firework.json";
import Lottie from "lottie-react";
import Button from "../button";

import fireworkSmallJson from "../../src/assets/firework.json";
import fireworkTop from "../../src/assets/firework-top.json";
import fireworkBottom from "../../src/assets/firework-bottom.json";

const customStyles = {
  content: {
    top: "45%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: 0,
    borderRadius: "36px",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    backgroundColor: "white",
  },
};

// eslint-disable-next-line react/prop-types
const CustomModal = ({ show, onHide, title, desc }) => {
  return (
    <div>
      {show && (
        <Lottie
          className="firework-animation-left"
          animationData={fireworkSmallJson}
          autoplay={true}
          loop={true}
        />
      )}
      {show && (
        <Lottie
          className="firework-animation-right"
          animationData={fireworkSmallJson}
          autoplay={true}
          loop={true}
        />
      )}

      {show && (
        <Lottie
          className="firework-animation-top"
          animationData={fireworkTop}
          autoplay={true}
          loop={true}
        />
      )}
      {show && (
        <Lottie
          className="firework-animation-bottom"
          animationData={fireworkBottom}
          autoplay={true}
          loop={true}
        />
      )}

      <Modal
        isOpen={show}
        onRequestClose={onHide}
        style={customStyles}
        contentLabel="Example Modal"
        closeTimeoutMS={100}
      >
        <div className="modal-body">
          <div className="lucky-title">{title}</div>
          <div className="lottie-animation">
            <Lottie
              className="lottie-firework"
              animationData={fireworkJson}
              autoplay={true}
              loop={true}
            />
            <Lottie
              className="lottie"
              animationData={championJson}
              autoplay={true}
              loop={true}
            />
            <Lottie
              className="lottie-firework"
              animationData={fireworkJson}
              autoplay={true}
              loop={true}
            />
          </div>
          <div className="lucky-number">{desc}</div>
          <div className="modal-footer">
            <Button onClick={onHide} className="close-button">
              Хаах
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CustomModal;
