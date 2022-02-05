import "../styles/Overlay.css";
import React from "react";
import Loader from "./Loader";
const Overlay = ({
  level,
  score,
  showLoader,
  showGameOverInfo,
  onButtonClicked,
}) => {
  return (
    <div className="Overlay">
      {showLoader && <Loader level={level}></Loader>}
      {showGameOverInfo && (
        <div className="Overlay__content">
          <h1 className="Overlay__title">Game Over</h1>
          <p className="Overlay__text">
            Congratulations, your score is {score}
          </p>
          <button onClick={onButtonClicked} className="Overlay__button">
            New Game
          </button>
        </div>
      )}
    </div>
  );
};
export default Overlay;
