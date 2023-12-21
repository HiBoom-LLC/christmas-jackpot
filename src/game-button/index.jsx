import "./index.css";

// eslint-disable-next-line react/prop-types
const GameButton = ({ children, onClick, loading }) => {
  return (
    <button
      disabled={loading}
      className={"game-button orange"}
      onClick={onClick}
    >
      {loading ? <span className="loader"></span> : children}
    </button>
  );
};

export default GameButton;
