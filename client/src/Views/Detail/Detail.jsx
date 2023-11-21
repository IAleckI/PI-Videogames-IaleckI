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
      <ul>
        <li> {catchDetail.description}</li>
        <li> {catchDetail.date}</li>
        
        {Array.isArray(catchDetail.platforms) ? (
          <ul>
            {catchDetail.platforms.map((platform, index) => (
              <li key={index}>{platform}</li>
            ))}
          </ul>
        ) : (
          <span>{catchDetail.platforms}</span>
        )}

        {Array.isArray(catchDetail.genres) ? (
          <ul>
            {catchDetail.genres.map((genre, index) => (
              <li key={index}>{genre}</li>
            ))}
          </ul>
        ) : (
          <span>{catchDetail.genres}</span>
        )}
        <li> {catchDetail.rating}</li>
      </ul>
    </div>
  );
};

export default Detail;
