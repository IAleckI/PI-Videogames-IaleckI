import React from "react";
import Card from "../Card/Card";
import Style from "./Cards.module.css";

const Cards = ({ catchGames }) => {
  return (
    <div className={Style.cardList}>
      {catchGames.map((game) => (
        <Card 
        key={game.id} 
        id={game.id} 
        name={game.name} 
        image={game.image} 
        />
      ))}
    </div>
  );
};

export default Cards;
