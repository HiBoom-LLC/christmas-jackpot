import "./index.css";

// eslint-disable-next-line react/prop-types
const GameButton = ({ children, loading, laodingMt, ...props }) => {
  return (
    <button disabled={loading} className={"game-button orange"} {...props}>
      {loading ? (
        <span
          className="loader"
          style={{
            marginTop: laodingMt,
          }}
        ></span>
      ) : (
        children
      )}
    </button>
  );
};

export default GameButton;
