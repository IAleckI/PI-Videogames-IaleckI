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
        genres={Array.isArray(game.genres) && game.genres.length > 0 ? (
          <ul>
            {game.genres.map((g, i) => (
              <li key={i}>{g}</li>
            ))}
          </ul>
        ) : (
          <span>No genres available</span>
        )}
        image={game.image} 
        />
      ))}
    </div>
  );
};

export default Cards;
