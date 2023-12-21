import { useEffect, useState } from "react";
import "./index.css";
import GameButton from "../../game-button";
import CustomModal from "../../congratulations-modal/CustomModal";

const Game = () => {
  const [loadingMain, setLoadingMain] = useState(true);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    try {
      const game2Json = localStorage.getItem("game2");
      const game2Data = JSON.parse(game2Json);
      setState(game2Data);
      setLoadingMain(false);
    } catch (err) {
      setLoadingMain(false);
    }
  }, []);

  if (loadingMain) {
    return null;
  }

  return (
    <div className="backgroundWrapper">
      <CustomModal
        show={showModal}
        title={"Ялагч"}
        desc={"Хишигбаяр"}
        onHide={() => setShowModal(false)}
      />
      <h1
        className="title"
        style={{
          textAlign: "center",
          width: "100%",
          fontSize: 42,
          marginBottom: 40,
        }}
      >
        Онооны самбар
      </h1>
      <table
        style={{
          maxWidth: 1024,
        }}
      >
        <thead>
          <tr>
            <td></td>
            {Array(state.judgeCount)
              .fill(null)
              .map((_, index) => {
                return (
                  <td key={`in_${index}`}>
                    <input
                      className="input"
                      placeholder="Шүүгчийн нэр"
                      type="text"
                      style={{
                        width: "calc(100% - 32px)",
                      }}
                    />
                  </td>
                );
              })}
          </tr>
        </thead>
        <tbody>
          {Array(state.playerCount)
            .fill(null)
            .map((_, index) => {
              return (
                <tr key={`ff_${index}`}>
                  <td>
                    <input
                      className="input"
                      type="text"
                      placeholder="Оролцогчын нэр"
                      style={{
                        width: "calc(100% - 32px)",
                      }}
                    />
                  </td>
                  {Array(state.judgeCount)
                    .fill(null)
                    .map((_, index) => {
                      return (
                        <td key={`in_${index}`}>
                          <input
                            className="input"
                            type="number"
                            placeholder="Оноо"
                            style={{
                              width: "calc(100% - 32px)",
                            }}
                          />
                        </td>
                      );
                    })}
                </tr>
              );
            })}
        </tbody>
      </table>
      <div
        className="d-flex justify-content-center"
        style={{
          marginTop: 40,
        }}
      >
        <GameButton
          onClick={() => {
            setShowModal(true);
          }}
          loading={loading}
          style={{
            fontSize: 24,
            height: 74,
            width: 300,
          }}
        >
          Ялагч тодруулах
        </GameButton>
      </div>
    </div>
  );
};

export default Game;
