import React from "react";
import Style from "./Card.module.css";
import imgNotFound from "../../imgs/notFound.jpg";
import { Link } from "react-router-dom";

const Card = ({ id, name, image,genres }) => {
  return (
    <div className={Style.card}>
      <Link to={`/home/${id}`}>
        <img
          className={Style.img}
          src={image}
          id={id}
          alt={name}
          onError={(e) => (e.currentTarget.src = imgNotFound)}
        />
      </Link>
      <h2><span>{name}</span></h2>
      <span>{genres}</span>
    </div>
  );
};

export default Card;
