import React, { useEffect, useState } from "react";
import { getGenres, getVideogames } from "../Redux/Actions";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
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
  const [errors, setErrors] = useState({
    name: "",
    image: "",
    platform: "",
    description: "",
    rating: "",
    date: "",
    genres: "",
  });
  const [newGame, setNewGame] = useState({
    name: "",
    image: "",
    platform: [],
    description: "",
    rating: null,
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
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    switch (name) {
      case "name":
        errors.name = ValidateGameName({ name: value });
        break;
      case "image":
        errors.image = ValidateGameIMG({ image: value });
        break;
      case "description":
        errors.description = ValidateGameDescription({ description: value });
        break;
      case "date":
        errors.date = ValidateDate({ date: value });
        break;
      case "rating":
        errors.rating = ValidateRating({ rating: value });
        break;
      case "platform":
        errors.platform = ValidatePlatform({ platform: value });
        break;
      case "genres":
        errors.genres = ValidateGenres({ genres: value });
        break;
      default:
        break;
    }
    setErrors(errors);
    setNewGame((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handlerSubmmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/videogames", newGame);
  
      if (res.status === 201) {
        alert("Videogame created successfully");
        window.location.href = "/home";
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        alert("Error when creating the videogame. this may be due to: ERROR:" + error.response.data.error);
      } else {
        alert("Error creating videogame. Please try again later.");
      }
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

    const updatedGame = {
      ...newGame,
      [target]: [...newGame[target], ...selected],
    };

    setNewGame(updatedGame);

    let updatedErrors = { ...errors };

    switch (target) {
      case "platform":
        updatedErrors.platform = ValidatePlatform({
          platform: [...updatedGame.platform],
        });
        break;
      case "genres":
        updatedErrors.genres = ValidateGenres({
          genres: [...updatedGame.genres],
        });
        break;
      default:
        break;
    }
    setErrors(updatedErrors);
  };

  /* -------------------------------------------------------------------------- */

  const handlerDelete = (target, values) => {
    setNewGame((prevState) => ({
      ...prevState,
      [target]: prevState[target].filter((val) => !values.includes(val)),
    }));

    let updatedErrors = { ...errors };

    switch (target) {
      case "platform":
        updatedErrors.platform = ValidatePlatform({
          platform: newGame.platform.filter((val) => !values.includes(val)),
        });
        break;
      case "genres":
        updatedErrors.genres = ValidateGenres({
          genres: newGame.genres.filter((val) => !values.includes(val)),
        });
        break;
      default:
        break;
    }
    setErrors(updatedErrors);
  };
  /* -------------------------------------------------------------------------- */

  const allPlatforms = Array.from(
    new Set(catchGames.map((game) => game.platforms).flat())
  );
  if (!catchGenres && !catchGames && !newGame) {
    return <h1>Loading...</h1>;
    console.log("cargando");
  }
  return (
    <div>
      <form>
        <label>Videogame Name:</label>

        <input type="text" name="name" id="name" onChange={handlerChange} />
        {errors.name && <p>{errors.name}</p>}
        <hr />
        <label>Videogame Image:</label>

        <input type="text" name="image" id="image" onChange={handlerChange} />
        {errors.image && <p>{errors.image}</p>}
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
        {errors.platform && <p>{errors.platform}</p>}
        {newGame.platform.map((platform, index) => (
          <div key={index}>
            <span>{platform}</span>
            <button onClick={() => handlerDelete("platform", [platform])}>
              x
            </button>
          </div>
        ))}
        <hr />
        <label>Videogame Description: </label>

        <textarea
          type="text"
          name="description"
          id="description"
          onChange={handlerChange}
        />
        {errors.description && <p>{errors.description}</p>}
        <hr />
        <label>Date of Release:</label>

        <time>
          <input type="date" name="date" id="date" onChange={handlerChange} />
        </time>
        {errors.date && <p>{errors.date}</p>}
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
        {newGame.genres.map((genre, index) => (
          <div key={index}>
            <span>{genre}</span>
            <button onClick={() => handlerDelete("genres", [genre])}>x</button>
          </div>
        ))}
        {errors.genres && <p>{errors.genres}</p>}
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
        {errors.rating && <p>{errors.rating}</p>}
        <hr />

        <input
          type="submit"
          value="Submit"
          disabled={
            errors.name ||
            errors.image ||
            errors.description ||
            errors.date ||
            errors.rating ||
            errors.platform ||
            errors.genres ||
            !newGame.name ||
            !newGame.image ||
            !newGame.description ||
            !newGame.date ||
            !newGame.rating ||
            !newGame.platform ||
            !newGame.genres
          }
          onClick={handlerSubmmit}
        />

        <Link to="/home">
          <button>Go to Home</button>
        </Link>
      </form>
    </div>
  );
};

export default FormPage;
