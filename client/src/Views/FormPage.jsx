import React, { useEffect, useState } from "react";
import { getGenres, getVideogames } from "../Redux/Actions";
import Select from "react-select";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  ValidateGameName,
  ValidateGameIMG,
  ValidateGameDescription,
  ValidateDate,
  ValidateRating,
  ValidatePlatform,
  ValidateGenres,
} from "../Components/Validations/Validations";

const FormPage = () => {
  const [newGame, setNewGame] = useState({
    name: "",
    image: "",
    platform: [],
    description: "",
    rating: 0,
    date: "",
    genres: [],
  });

  const catchGames = useSelector((state) => state.getVideogames);
  const catchGenres = useSelector((state) => state.getGenres);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getVideogames());
    dispatch(getGenres());
  }, []);

  const handlerChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setNewGame({
      ...newGame,
      [name]: value,
      error,
    });
  };

  const handlerSubmmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/videogames", newGame);

      if (res.status === 201) {
        alert("Videogame created successfully");
      }
    } catch (error) {
      console.log(res.state);
      alert("Error creating videogame");
    }
  };

  const handlerArray = (e, target) => {
    const options = e.target.options;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected && !newGame[target].includes(options[i].value)) {
        selected.push(options[i].value);
      }
    }
    setNewGame((prevState) => ({
      ...prevState,
      [target]: [...prevState[target], ...selected],
    }));
  };

  const allPlatforms = Array.from(
    new Set(catchGames.map((game) => game.platforms).flat())
  );
  if (!catchGenres && !catchGames) {
    return <h1>Loading...</h1>;
    console.log("cargando");
  }
  return (
    <div>
      <form>
        <label>
          Videogame Name:
          <input type="text" name="name" id="name" onChange={handlerChange} />
        </label>
        <hr />
        <label>
          Videogame Image:
          <input type="text" name="image" id="image" onChange={handlerChange} />
        </label>
        <hr />
        <label> Videogame Platform:</label>
        <select
          name="platform"
          id="platform"
          onChange={(e) => handlerArray(e, "platform")}
          multiple
        >
          {allPlatforms.map((platforms, index) => (
            <option key={index} value={platforms}>
              {platforms}
            </option>
          ))}
        </select>
        <hr />
        <label>
          Videogame Description:
          <input
            type="text"
            name="description"
            id="description"
            onChange={handlerChange}
          />
        </label>
        <hr />
        <label>
          Date of Release:
          <time>
            <input type="date" name="date" id="date" onChange={handlerChange} />
          </time>
        </label>
        <hr />

        <label>Puntuación del juego (del 1 al 5):</label>
        <input
          type="number"
          id="rating"
          name="rating"
          min="1.0"
          max="5.0"
          step="0.1"
          required
          onChange={handlerChange}
        />
        <hr />
        <label> generos: </label>
        <select
          name="genres"
          id="genres"
          onChange={(e) => handlerArray(e, "genres")}
          multiple
        >
          {catchGenres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>

        <hr />
        <input type="submit" value="Submit" onClick={handlerSubmmit} />
      </form>
    </div>
  );
};

export default FormPage;
