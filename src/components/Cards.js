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
      {characters &&
        getRandomCharacters(characters, level.cardsQuantity)
          .map((character) => {
            return {
              name: character.name,
              imgSource: character.images[0],
            };
          })
          .map((characterObject) => {
            return (
              <Card
                name={characterObject.name}
                imgSource={characterObject.imgSource}
              ></Card>
            );
          })}
    </div>
  );
};

export default Cards;
