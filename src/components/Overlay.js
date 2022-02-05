import "../styles/Overlay.css";
import React from "react";
import Loader from "./Loader";
const Overlay = ({ text }) => {
  return (
    <div className="Overlay">
      <Loader text={text}></Loader>
      {/*
        <div className="Overlay__content">
          <h1 className="Overlay__title">Game Over</h1>
          <p className="Overlay__text">Congratulations, your score is 1</p>
          <button className="Overlay__button">New Game</button>
        </div>
      */}
    </div>
  );
};
export default Overlay;
