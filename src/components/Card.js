import React from "react";
import "../styles/Card.css";

const Card = ({ name, imgSource }) => {
  return (
    <div className="Card">
      <img className="Card__image" src={imgSource}></img>
      <p className="Card__name">Name: {name}</p>
    </div>
  );
};

export default Card;
