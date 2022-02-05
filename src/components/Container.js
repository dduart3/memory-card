import "../styles/Container.css";

import Header from "./Header";
import Cards from "./Cards";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Overlay from "./Overlay";

const Container = () => {
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [characters, setCharacters] = useState(null);
  const [level, setLevel] = useState({ levelNumber: 1, cardsQuantity: 4 });
  const [cards, setCards] = useState(null);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [isGameOverInfoVisible, setIsGameOverInfoVisible] = useState(false);
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);

  const isCharactersSet = () => characters;

  const isGameOver = () => gameOver;

  const isCardsSet = () => cards;

  const isCardClicked = (card) => card.clicked;

  const hasPlayerWon = () => level.levelNumber > 4;

  const isCurrentScoreTheHighest = () => currentScore > highScore;

  const areAllCardsClicked = () =>
    !cards.find((card) => card.clicked === false);

  //Fetch characters from api and set the responde in the state
  useEffect(() => {
    const getCharacters = async () => {
      try {
        const response = await axios.get(
          "https://naruto-api.herokuapp.com/api/v1/characters"
        );
        setCharacters(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCharacters();
  }, []);

  //Checks every time the cards state is updated and if all cards are clicked then levels up
  useEffect(() => {
    if (isCardsSet()) {
      if (areAllCardsClicked()) {
        updateLevel();
      }
    }
  }, [cards]);

  useEffect(() => {
    if (isCurrentScoreTheHighest()) {
      setHighScore(currentScore);
    }
  }, [currentScore]);

  useEffect(() => {
    if (hasPlayerWon()) {
      setGameOver(true);
    }

    if (isCharactersSet() && isGameOver()) {
      showGameOverInfo();
    } else if (isCharactersSet()) {
      showLoader(1.5);
      setCards(getRandomCharacters(characters, level.cardsQuantity));
    }
  }, [level, characters, gameOver]);

  const updateScore = () => {
    setCurrentScore(currentScore + 1);
  };

  const showLoader = (seconds) => {
    setIsOverlayVisible(true);
    setIsLoaderVisible(true);

    setTimeout(() => {
      setIsOverlayVisible(false);
      setIsLoaderVisible(false);
    }, seconds * 1000);
  };

  const showGameOverInfo = () => {
    setIsOverlayVisible(true);
    setIsGameOverInfoVisible(true);
  };

  const onButtonClicked = () => {
    setIsGameOverInfoVisible(false);
    setIsOverlayVisible(false);
    updateLevel();
  };

  const onCardClicked = (id) => {
    const card = cards.find((card) => card.id === id);

    if (isCardClicked(card)) {
      setGameOver(true);
    } else {
      setCardClicked(card);
      setCards(shuffleArray(cards));
      updateScore();
    }
  };

  const updateLevel = () => {
    if (isGameOver()) {
      //Restart level
      setCurrentScore(0);
      setGameOver(false);
      setLevel({
        levelNumber: 1,
        cardsQuantity: 4,
      });
    } else {
      //Level up
      setLevel({
        levelNumber: level.levelNumber + 1,
        cardsQuantity: level.cardsQuantity + 2,
      });
    }
  };

  const setCardClicked = (card) => {
    const cardIndex = cards.indexOf(card);

    const cardsCopy = [...cards];
    cardsCopy[cardIndex].clicked = true;

    setCards(cardsCopy);
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

  const shuffleArray = (array) => {
    let shuffled = array
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);

    return shuffled;
  };

  return (
    <div className="Container">
      {isOverlayVisible && (
        <Overlay
          level={level.levelNumber}
          score={currentScore}
          showLoader={isLoaderVisible}
          showGameOverInfo={isGameOverInfoVisible}
          onButtonClicked={onButtonClicked}
        ></Overlay>
      )}
      <Header title="Memory Card"></Header>
      <div className="Score">
        <p className="Score__element">Score: {currentScore}</p>
        <p className="Score__element">High Score: {highScore}</p>
      </div>
      <Cards
        onCardClicked={onCardClicked}
        cards={cards}
        currentScore={currentScore}
        highScore={highScore}
      ></Cards>
    </div>
  );
};

export default Container;
