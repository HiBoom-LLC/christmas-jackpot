import { useEffect, useRef, useState } from "react";
import "./index.css";
import Slot from "react-slot-machine";
import jackbotLottie from "../../assets/jackpot.json";
import Lottie from "lottie-react";
import GameButton from "../../game-button";
import CustomModal from "../../congratulations-modal/CustomModal";

const Jackpot3 = () => {
  const [loadingMain, setLoadingMain] = useState(true);
  const [state, setState] = useState({
    usersData: [],
  });
  const lottieRef = useRef(null);
  const [randomNumber, setRandomNumber] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    try {
      const game1Json = localStorage.getItem("game3");
      const game1Data = JSON.parse(game1Json);

      setState(game1Data);
      setLoadingMain(false);
    } catch (err) {
      setLoadingMain(false);
    }
  }, []);

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }

  const startSpin = () => {
    setWinner(null);
    setLoading(true);
    const num = getRandomInt(1, state.usersData.length);
    setRandomNumber(num);
    lottieRef.current.stop();
    lottieRef.current.play();
  };

  if (loadingMain) {
    return null;
  }

  const onCongratulations = () => {
    setTimeout(() => {
      setShowModal(true);
    }, 1000);
  };

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
      <CustomModal
        show={showModal}
        title={`${state.gift}-н азтан`}
        data={winner}
        onHide={() => setShowModal(false)}
        gameKey="game1"
      />
      <div
        style={{
          padding: "0 120px",
        }}
      >
        <h1 className="totalTitle">Шагнал: {state.gift}</h1>
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
                duration={5000}
                times={2}
                onEnd={() => {
                  setLoading(false);
                  onCongratulations();
                  setWinner(state.usersData[randomNumber + 1]);
                }}
                className="slotPicker"
              >
                {state.usersData.map((item, index) => {
                  return (
                    <div key={`slot_${index}`} className="slotItem">
                      {`${item?.["ID дугаар"]}`}
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
          <GameButton
            onClick={startSpin}
            loading={loading}
            style={{
              width: 300,
            }}
          >
            Эхлүүлэх
          </GameButton>
        </div>
        <h1 className="totalTitle">Нийт орологч: {state.usersData.length}</h1>
      </div>
    </div>
  );
};

export default Jackpot3;
