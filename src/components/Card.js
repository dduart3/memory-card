import React from "react";
import "../styles/Card.css";

const Card = ({ id, name, imgSource, onCardClicked }) => {
  return (
    <div className="Card" id={id} onClick={onCardClicked}>
      <img className="Card__image" src={imgSource}></img>
      <p className="Card__name">{name}</p>
    </div>
  );
};

export default Card;
