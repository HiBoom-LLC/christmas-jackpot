import { useEffect, useRef, useState } from "react";
import "./index.css";
import Slot from "react-slot-machine";
import jackbotLottie from "../../assets/jackpot.json";
import Lottie from "lottie-react";
import GameButton from "../../game-button";

const Jackpot = () => {
  const [loadingMain, setLoadingMain] = useState(true);
  const [state, setState] = useState({
    usersData: [],
    ready: false,
  });
  const lottieRef = useRef(null);
  const [randomNumber, setRandomNumber] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      const game1Json = localStorage.getItem("game1");
      const game1Data = JSON.parse(game1Json);
      if (game1Data.ready === true) {
        setState(game1Data);
      }
      setLoadingMain(false);
    } catch (err) {
      setLoadingMain(false);
    }
  }, []);

  const random = () => {
    setLoading(true);
    const num = Math.floor(Math.random() * state.usersData.length);
    setRandomNumber(num);
    lottieRef.current.stop();
    lottieRef.current.play();
  };

  if (loadingMain) {
    return null;
  }

  return (
    <div
      style={{
        maxHeight: 680,
        marginTop: "-20%",
        width: "100%",
        alignSelf: "center",
        justifySelf: "center",
      }}
    >
      <div
        style={{
          padding: "0 120px",
        }}
      >
        <div className="jackpotMachine">
          <div className="jackpot">
            <Lottie
              lottieRef={lottieRef}
              animationData={jackbotLottie}
              autoplay={false}
              loop={false}
            />
          </div>
          <div className="slotWrapper">
            <div className="my-spinner">
              <div className="top-shadow"></div>
              <Slot
                target={randomNumber}
                duration={15000}
                times={1}
                onEnd={() => {
                  setLoading(false);
                }}
                className="slotPicker"
              >
                {state.usersData.map((item, index) => {
                  return (
                    <div key={`slot_${index}`} className="slotItem">
                      {index + 1}
                    </div>
                  );
                })}
              </Slot>
              <div className="bottom-shadow"></div>
            </div>
          </div>
        </div>
        <div
          className="d-flex"
          style={{
            justifyContent: "center",
            marginTop: 80,
          }}
        >
          <GameButton onClick={random} loading={loading}>
            SPIN
          </GameButton>
        </div>
        {/* <div className="tableWrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>№</th>
                  <th>Ажилтны код</th>
                  <th>Ирсэн цаг</th>
                </tr>
              </thead>
              <tbody>
                {state.usersData?.map((item, index) => {
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
          </div> */}
      </div>
    </div>
  );
};

export default Jackpot;
