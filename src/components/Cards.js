import "../styles/Cards.css";
import React from "react";
import Card from "./Card";
import { useState, useEffect } from "react";
import axios from "axios";

const Cards = ({
  currentScore,
  highScore,
  incrementScore,
  characters,
  level,
  getRandomCharacters,
}) => {
  return (
    <div className="Cards">
      {/*<p>Score: {currentScore}</p>
      <p>High Score: {highScore}</p>
  <button onClick={incrementScore}>Increment Score</button>*/}
    </div>
  );
};

export default Cards;
