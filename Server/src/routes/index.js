require("dotenv").config();
const { API_KEY } = process.env;
const { Router } = require("express");
const axios = require("axios");
const router = Router();
const { Videogame, Genres } = require("../db");

router.get("/videogames", async (req, res) => {
  try {
    const platformsSet = new Set();
    const { name } = req.query;
    let page = 1;
    let bunchGames = [];
    while (page < 6) {
      const resp = await axios.get(
        `https://api.rawg.io/api/games?key=${API_KEY}&page=${page}`
      );
      const aux = resp.data.results;
      const filteredVideogames = aux.map((games) => {
        const platforms = games.platforms.map((p) => p.platform.name);
        const genres = games.genres.map((g) => g.name);
        return {
          id: games.id,
          name: games.name,
          description: games.description,
          platforms: platforms,
          image: games.background_image,
          date: games.released,
          rating: games.rating,
          genres: genres,
        };
      });
      filteredVideogames.forEach((game) => {
        bunchGames.push(game);
      });
      page++;
    }

    const videogamesBDD = await Videogame.findAll({
      include: {
        model: Genres,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    const handdlerBDD = videogamesBDD.map((game) => {
      return {
        id: game.id,
        name: game.name,
        description: game.description,
        platforms: game.platform,
        image: game.image,
        date: game.date,
        rating: game.rating,
        genres: game.genres.map((genre) => genre.name),
      };
    });
    bunchGames = [...handdlerBDD, ...bunchGames];
    if (name) {
      const filterName = bunchGames.filter((game) =>
        game.name.toLowerCase().includes(name.toLowerCase())
      );
      return res.status(200).json(filterName);
    }
    return res.status(200).json(bunchGames);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/videogames/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let page = 1;
    let bunchGames = [];
    while (page < 6) {
      const resp = await axios.get(
        `https://api.rawg.io/api/games?key=${API_KEY}&page=${page}`
      );
      const aux = resp.data.results;
      const filteredVideogames = aux.map((games) => {
        const platforms = games.platforms.map((p) => p.platform.name);
        const genres = games.genres.map((g) => g.name);
        return {
          id: games.id,
          name: games.name,
          description: games.description,
          platforms: platforms,
          image: games.background_image,
          date: games.released,
          rating: games.rating,
          genres: genres,
        };
      });
      filteredVideogames.forEach((game) => {
        bunchGames.push(game);
      });
      page++;
    }
    // console.log(bunchGames.length);
    const videogamesBDD = await Videogame.findAll({
      include: {
        model: Genres,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    const handdlerBDD = videogamesBDD.map((game) => {
      return {
        id: game.id,
        name: game.name,
        description: game.description,
        platforms: game.platform,
        image: game.image,
        date: game.date,
        rating: game.rating,
        genres: game.genres.map((genre) => genre.name),
      };
    });
    bunchGames = [...handdlerBDD, ...bunchGames];
    const findTheGame = bunchGames.find((game) => game.id == id);
    if (!findTheGame) {
      return res.status(404).json({ error: "Game not found" });
    }
    res.status(200).json(findTheGame);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/genres", async (req, res) => {
  try {
    const resp = await axios.get(
      `https://api.rawg.io/api/genres?key=${API_KEY}`
    );
    const data = resp.data.results;

    const listGenres = new Set();

    if (data) {
      const vgGenres = data.map((genre) => genre.name);
      vgGenres.forEach((genre) => {
        listGenres.add(genre);
      });

      const listUnitGenres = Array.from(listGenres);

      await Promise.all(
        listUnitGenres.map(async (d) => {
          await Genres.findOrCreate({ where: { name: d } });
        })
      );
      res.status(200).json(listUnitGenres);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/videogames", async (req, res) => {
  try {
    const { name, description, platform, image, date, rating, genres } =
      req.body;
    const existingGame = await Videogame.findOne({ where: { name } });
    if (existingGame) {
      return res
        .status(400)
        .json({ error: "the name of the game already exists" });
    }
    const newGame = await Videogame.create({
      name,
      description,
      platform,
      image,
      date,
      rating,
    });

    const spreads = [...genres];
    let tableGenres = await Genres.findAll({
      where: { name: spreads },
    });
    newGame.addGenres(tableGenres);
    res.status(201).json(newGame);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
