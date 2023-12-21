import "./CustomModal.css";
import Modal from "react-modal";
import React from "react";
import championJson from "../../src/assets/champion.json";
import fireworkJson from "../../src/assets/champion-firework.json";
import Lottie from "lottie-react";
import Button from "../button";

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

const CustomModal = ({ show, onHide, randomNumber }) => {
  return (
    <Modal
      isOpen={show}
      onRequestClose={onHide}
      style={customStyles}
      contentLabel="Example Modal"
      closeTimeoutMS={100}
    >
      <div className="modal-body">
        <div className="lucky-title">Азтаны код</div>
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
        <div className="lucky-number">{randomNumber}</div>
        <div className="modal-footer">
          <Button onClick={onHide} className="close-button">
            Хаах
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default CustomModal;
