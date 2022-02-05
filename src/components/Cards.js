import "../styles/Cards.css";
import React from "react";
import Card from "./Card";

const Cards = ({ currentScore, highScore, cards, onCardClicked }) => {
  return (
    <div className="Cards">
      {cards &&
        cards.map((card) => {
          return (
            <Card
              id={card.id}
              onCardClicked={() => onCardClicked(card.id)}
              name={card.name}
              imgSource={card.imgSource}
              key={card.id}
            ></Card>
          );
        })}
    </div>
  );
};

export default Cards;
