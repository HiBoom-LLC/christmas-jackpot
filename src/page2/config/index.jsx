import React, { useState } from "react";
import Button from "../../button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ConfigGame2 = () => {
  const [playerCount, setPlayerCount] = useState();
  const [judgeCount, setJudgeCount] = useState();
  const navigate = useNavigate();

  const configDone = () => {
    if (!judgeCount || judgeCount === 0) {
      toast.warn("Шүүгчдийн тоо оруулна уу.");
      return;
    }

    if (!playerCount || playerCount === 0) {
      toast.warn("Оролцогчдын тоо оруулна уу.");
      return;
    }
    localStorage.setItem(
      "game2",
      JSON.stringify({
        playerCount,
        judgeCount,
      })
    );
    navigate("/game2/game");
  };

  return (
    <div className="backgroundWrapper">
      <div
        className="formGroup"
        style={{
          marginTop: 16,
        }}
      >
        <label>Шүүгчдийн тоо</label>
        <input
          className="input"
          type="number"
          placeholder="Шүүгчдийн тоо"
          value={judgeCount}
          onChange={(e) => {
            setJudgeCount(Number(e.target.value));
          }}
        />
      </div>
      <div className="formGroup">
        <label>Оролцогчдын тоо</label>
        <input
          className="input"
          type="number"
          placeholder="Оролцогчдын тоо"
          value={playerCount}
          onChange={(e) => {
            setPlayerCount(Number(e.target.value));
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

export default ConfigGame2;
