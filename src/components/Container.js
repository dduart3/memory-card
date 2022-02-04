import "../styles/Container.css";

import Header from "./Header";
import Cards from "./Cards";
import React, { useState, useEffect } from "react";
import axios from "axios";
const Container = () => {
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [characters, setCharacters] = useState(null);
  const [level, setLevel] = useState({ levelNumber: 1, cardsQuantity: 4 });
  const [cards, setCards] = useState(null);

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
    if (characters) {
      setCards(getRandomCharacters(characters, level.cardsQuantity));
    }
  }, [characters]);

  useEffect(() => {
    if (cards) {
      if (!cards.find((card) => card.clicked === false)) {
        updateLevel();
      }
    }
  }, [cards]);

  const incrementScore = () => {
    setCurrentScore(Math.round(Math.random() * 50));
  };

  const updateLevel = () => {
    setLevel({
      levelNumber: level.levelNumber + 1,
      cardsQuantity: level.cardsQuantity + 2,
    });
  };

  const setCardClicked = (card) => {
    setCards({
      ...cards,
      ...(card.clicked = true),
    });
  };

  const updateGame = (id) => {
    const card = cards.find((card) => card.id === id);

    if (card.clicked === true) {
      setGameOver(true);
    } else {
      setCardClicked(card);
    }
  };

  const createRandomNumbersArray = (size, max) => {
    const randomNumbers = [];

    //Fills an array with random numbers between 0 and the quantity parameter verifying that aren't repeated
    while (randomNumbers.length < size) {
      let randomNumber = Math.floor(Math.random() * max);
      if (!randomNumbers.find((el) => el === randomNumber)) {
        randomNumbers.push(randomNumber);
      }
    }
    return randomNumbers;
  };

  const getRandomCharacters = (characters, quantity) => {
    const randomCharacters = [];

    const size = quantity;
    const max = characters.length;
    const randomNumbers = createRandomNumbersArray(size, max);

    //Fills the randomCharacters array with characters info using the randomNumbers array to map over
    randomNumbers.map((number) => {
      return randomCharacters.push({
        id: characters[number].id,
        name: characters[number].name.replace(
          "_",
          " "
        ) /*Some card names have an underscore instead of an space*/,
        imgSource: characters[number].images[0],
        clicked: false,
      });
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
