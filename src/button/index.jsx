import "./index.css";

// eslint-disable-next-line react/prop-types
const Button = ({ children, onClick = () => {}, className, style }) => {
  return (
    <button
      className={`customButton ${className}`}
      onClick={onClick}
      style={style}
    >
      {children}
    </button>
  );
};

export default Button;
