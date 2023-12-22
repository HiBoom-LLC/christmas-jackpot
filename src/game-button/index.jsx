import "./index.css";

// eslint-disable-next-line react/prop-types
const GameButton = ({ children, loading, ...props }) => {
  return (
    <button disabled={loading} className={"game-button orange"} {...props}>
      {loading ? <span className="loader"></span> : children}
    </button>
  );
};

export default GameButton;
