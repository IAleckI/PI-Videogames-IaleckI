require("dotenv").config();
const { API_KEY } = process.env;
const { Router } = require("express");
const axios = require("axios");
const router = Router();
const { Videogame, Genres } = require("../db");

router.get("/videogames", async (req, res) => {
  try {
    const { name } = req.query;
    const resp = await axios.get(
      `https://api.rawg.io/api/games?key=${API_KEY}`
    );
    const { data } = resp;
    const filteredVideogames = data.results.map((games) => {
      return {
        name: games.name,
        platform: games.platforms.map((p) => p.platform.name),
        image: games.background_image,
        date: games.released,
        rating: games.rating,
      };
    });
    if (name) {
      const games = filteredVideogames.filter((game) =>
        game.name.toLowerCase().includes(name.toLowerCase())
      );
      if (games.length === 0) {
        return res.status(404).json({ error: "Game not found" });
      }
      return res.status(200).json(games);
    } else {
      return res.status(200).json(filteredVideogames);
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.get("/videogames/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const resp = await axios.get(
      `https://api.rawg.io/api/games?key=${API_KEY}`
    );
    const info = resp.data.results;

    const filterVideogames = info.map((game) => {
      return {
        id: game.id,
        name: game.name,
        description: game.description,
        platforms: game.platforms.map((p) => p.platform.name),
        image: game.background_image,
        date: game.released,
        rating: game.rating,
        genres: game.genres.map((g) => g.name),
      };
    });

    const findTheGame = filterVideogames.find((game) => game.id === id);

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
    const resp = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);
    const data = resp.data.results;
    const listGenres = new Set();

    if (data) {
      const vgGenres = data.map((game) => game.genres.map((g) => g.name));
      vgGenres.forEach((genre) => genre.forEach((g) => listGenres.add(g)));
      const listUnitGenres = Array.from(listGenres);

      await Promise.all(listUnitGenres.map(async (d) => {
        await Genres.findOrCreate({ where: { name: d } });
      }));
      res.status(200).json(listUnitGenres);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.post("/videogames", async (req, res) => {
  try {
    const body = req.body;
    const newGame = await Videogame.create({
      name: body.name,
      description: body.description,
      platform: body.platform,
      image: body.image,
      date: body.date,
      rating: body.rating,
    });
    
     const spreads = [...body.genres];
      console.log(spreads);
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
