import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../Redux/Actions";
import { useParams } from "react-router-dom";
import Style from "../Detail/Detail.module.css";
import notFound from "../../imgs/notFound.jpg";

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const catchDetail = useSelector((state) => state.getDetail);

  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch, id]);

  return (
    <div>
      <div className={Style.detail}>
        <button onClick={() => window.history.back()}>Go Back</button>
        <h1>DETAILS</h1>
        <h1>{catchDetail.name}</h1>
        <img
          className={Style.img}
          src={catchDetail.image}
          alt={catchDetail.name}
          onError={(e) => (e.currentTarget.src = notFound)}
        />
      </div>

      <div>
        <ul>
          <h4>Breve descripción:</h4>{" "}
          <p>
            {" "}
            {catchDetail.description
              ? catchDetail.description
              : "No hay descripción"}
          </p>
          <hr />
          <h4>fecha de lanzamiento:</h4> <p> {catchDetail.date}</p>
          <hr />
          <h4>Plataformas Disponibles: </h4>
        </ul>
        {Array.isArray(catchDetail.platforms) ? (
          <ul>
            {catchDetail.platforms.map((platform, index) => (
              <li key={index}>{platform}</li>
            ))}
          </ul>
        ) : (
          <span>{catchDetail.platforms}</span>
        )}
      </div>
      <hr />
      <div>
        <h4>Generos: </h4>
        {Array.isArray(catchDetail.genres) ? (
          <ul>
            {catchDetail.genres.map((genre, index) => (
              <li key={index}>{genre}</li>
            ))}
          </ul>
        ) : (
          <span>{catchDetail.genres}</span>
        )}
        <hr />
        <h4>Rating: </h4>
        <p> {catchDetail.rating}</p>
      </div>
    </div>
  );
};

export default Detail;
