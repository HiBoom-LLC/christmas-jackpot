import { useEffect, useRef, useState } from "react";
import "./index.css";
import Slot from "react-slot-machine";
import jackbotLottie from "../../assets/jackpot.json";
import Lottie from "lottie-react";
import GameButton from "../../game-button";
import CustomModal from "../../congratulations-modal/CustomModal";
import { shuffle } from "../../mainContext";
import { useNavigate } from "react-router-dom";

const Jackpot = () => {
  const [loadingMain, setLoadingMain] = useState(true);
  const navigate = useNavigate();
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
      const game1Json = localStorage.getItem("game1");
      const game1Data = JSON.parse(game1Json);
      const lmJson = localStorage.getItem("luckyMan");
      let usersData = game1Data.usersData;
      if (lmJson) {
        const lm = JSON.parse(lmJson);
        usersData = game1Data.usersData
          .map((u) => {
            const a = lm.find((l) => l?.["ID дугаар"] === u?.["ID дугаар"]);
            if (!a) {
              return u;
            }
            return null;
          })
          .filter((item) => item);
      }

      setState({
        ...game1Data,
        usersData: [...shuffle(usersData)],
      });
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
    let audio = new Audio("/spin.mp3");
    audio.play();
    setWinner(null);
    setLoading(true);
    const num = getRandomInt(1, state.usersData.length);

    setTimeout(() => {
      lottieRef.current.stop();
      lottieRef.current.play();
    }, 300);

    setTimeout(() => {
      setRandomNumber(num);
    }, 1450);
  };

  if (loadingMain) {
    return null;
  }

  const setLuckyMan = (w) => {
    const l = localStorage.getItem("luckyMan");
    if (l) {
      const arr = JSON.parse(l);
      arr.push(w);
      localStorage.setItem("luckyMan", JSON.stringify(arr));
    } else {
      localStorage.setItem("luckyMan", JSON.stringify([w]));
    }
  };

  const onCongratulations = () => {
    setTimeout(() => {
      setShowModal(true);
      const audio = new Audio("/congrats.mp3");
      audio.play();
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
        title="Азтан"
        data={winner}
        onHide={() => {
          setShowModal(false);
          navigate(0);
        }}
        gameKey="game1"
      />
      <div
        style={{
          padding: "0 120px",
        }}
      >
        <h1 className="totalTitle">Нийт оролцогч: {state.usersData.length}</h1>
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
                duration={14150}
                times={2}
                onEnd={() => {
                  setLoading(false);
                  onCongratulations();
                  const winnerIndex = randomNumber + 1;
                  const winner = { ...state.usersData[winnerIndex] };
                  setWinner(winner);
                  setLuckyMan(winner);
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
      </div>
    </div>
  );
};

export default Jackpot;
