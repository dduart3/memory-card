import "../styles/Container.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Container = () => {
  const [characters, setCharacters] = useState(null);
  useEffect(() => {
    const getCharacters = async () => {
      try {
        const response = await axios.get(
          "https://naruto-api.herokuapp.com/api/v1/characters"
        );
        console.log(response.data);
        setCharacters(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getCharacters();
  }, []);

  return (
    <div className="Container">
      <div className="Header"></div>
    </div>
  );
};

export default Container;
