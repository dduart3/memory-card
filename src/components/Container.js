import "../styles/Container.css";

import Header from "./Header";
import Cards from "./Cards";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Container = () => {
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, sethighScore] = useState(0);
  const [gameOver, setgameOver] = useState(false);
  const [characters, setCharacters] = useState(null);
  const [level, setLevel] = useState({ levelNumber: 1, cardsQuantity: 4 });

  useEffect(() => {
    const getCharacters = async () => {
      try {
        const response = await axios.get(
          "https://naruto-api.herokuapp.com/api/v1/characters"
        );
        console.log("esto se ejecuta unavez");
        setCharacters(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getCharacters();
  }, []);

  useEffect(() => {
    if (currentScore > highScore) {
      sethighScore(currentScore);
    }
  }, [currentScore]);

  const incrementScore = () => {
    setCurrentScore(Math.round(Math.random() * 50));
  };

  const updateLevel = () => {
    setLevel({
      levelNumber: level.levelNumber + 1,
      cardsQuantity: level.cardsQuantity + 2,
    });
  };

  const getRandomCharacters = (characters, quantity) => {
    const randomNumbersList = [];
    const randomCharacters = [];

    while (randomNumbersList.length < quantity) {
      let randomNumber = Math.floor(Math.random() * characters.length);
      if (!randomNumbersList.find((el) => el === randomNumber)) {
        randomNumbersList.push(randomNumber);
      }
    }

    randomNumbersList.map((number) => {
      randomCharacters.push(characters[number]);
    });

    return randomCharacters;
  };

  return (
    <div className="Container">
      <Header title="Memory Card"></Header>

      <Cards
        level={level}
        characters={characters}
        getRandomCharacters={getRandomCharacters}
        currentScore={currentScore}
        highScore={highScore}
        incrementScore={updateLevel}
      ></Cards>
    </div>
  );
};

export default Container;
