import "../styles/Header.css";
import React from "react";

const Header = (props) => {
  const { title } = props;

  return (
    <div className="Header">
      <h1 className="Header__title">{title}</h1>
    </div>
  );
};

export default Header;
