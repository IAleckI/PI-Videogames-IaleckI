import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getVideogames,
  getSortedNameGames,
  getSortedByRating,
  getDBVideogames,
  getAPIVideogames,
  getGenres,
  filterByGenres,
} from "../Redux/Actions";
import Select from "react-select";
import Cards from "../Components/Cards/Cards";
import SearchBar from "../Components/SearchBar/SearchBar";

const Home = () => {
  /* --------------------------------- states --------------------------------- */
  const [API, setAPI] = useState(false);
  const [DB, setDB] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const catchGames = useSelector((state) => state.getVideogames);
  const catchGenres = useSelector((state) => state.getGenres);
  const sortOrder = useSelector((state) => state.sortedGamesOrder);
  const ratingOrder = useSelector((state) => state.sortedRatingOrder);
  const catchDBGames = useSelector((state) => state.getDBVideogames);
  const catchAPIGames = useSelector((state) => state.getAPIVideogames);


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVideogames());
    dispatch(getGenres());
  }, []);

  /* --------------------------- handlers db and api and all-------------------------- */

  const handlerGetAll = () => {
    setDB(false);
    setAPI(false);
    setCurrentPage(1);
  };
  const handlerGetDBGames = () => {
    setDB(true);
    setAPI(false);
    setCurrentPage(1);
  };

  const handlerGetAPIGames = () => {
    setAPI(true);
    setDB(false);
    setCurrentPage(1);
  };

  /* ------------------------------ handlerArrayFilterByGenres ------------------------------ */
  const handlerArray = async (selectedOptions) => {
    let selectedGenres = selectedOptions.map((option) => option.value);
    setSelectedGenres(selectedGenres);

    dispatch(filterByGenres(selectedGenres));
    
    if (selectedGenres.length === 0) {
      dispatch(getVideogames());
    }
    setCurrentPage(1);
  };

    /* ------------------------------ useEffects as DB/API/CATCHGAMES ------------------------------ */
    useEffect(() => {
      if (DB) {
        dispatch(getDBVideogames());
      }
      if (API) {
        dispatch(getAPIVideogames());
      }
      if (!DB && !API) {
        dispatch(getVideogames());
      }
    }, [DB, API]);
  /* -----------------------------OrderAscDesNameRaiting---------------------------------- */
  const handleSortByName = () => {
    dispatch(getSortedNameGames(sortOrder === "asc" ? "desc" : "asc"));
  };

  const handleSortByRating = () => {
    dispatch(getSortedByRating(ratingOrder === "asc" ? "desc" : "asc"));
  };
  /* ------------------------------- Pagination ------------------------------- */

  const maxedGamesDysplayed = 15;
  const [currentPage, setCurrentPage] = useState(1);

  const totalCatchGames = catchGames.length;
  const totalAPIGames = catchAPIGames.length;
  const totalDBGames = catchDBGames.length;

  let totalDisplayedGames;
  if (API) {
    totalDisplayedGames = totalAPIGames;
  } else if (DB) {
    totalDisplayedGames = totalDBGames;
  } else {
    totalDisplayedGames = totalCatchGames;
  }

  const totalPages = Math.ceil(totalDisplayedGames / maxedGamesDysplayed);

  const startIndex = (currentPage - 1) * maxedGamesDysplayed;
  const endIndex = startIndex + maxedGamesDysplayed;

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const prevPage = () => {
    goToPage(currentPage - 1);
  };

  const nextPage = () => {
    goToPage(currentPage + 1);
  };

  let displayedGames = API ? catchAPIGames : DB ? catchDBGames : catchGames;

  let VideogamesShowed = displayedGames.slice(startIndex, endIndex);

  /* --------------------------------Return------------------------------------------ */
  return (
    <div>
      <SearchBar catchGames={catchGames} />
      <hr />
      <button onClick={handleSortByName}>
        Order Name {sortOrder === "asc" ? "Desc" : "Asc"}
      </button>
      <button onClick={handleSortByRating}>
        Order Rating {ratingOrder === "asc" ? "Desc" : "Asc"}
      </button>
      <button onClick={handlerGetDBGames}>Get DB Games</button>
      <button onClick={handlerGetAPIGames}>Get API Games</button>
      <button onClick={handlerGetAll}>Get All Games</button>
      <button onClick={() => (window.location.href = "/form")}>
        Create a Videogame
      </button>
      <hr />
      <Select
        isMulti
        name="genres"
        options={
          catchGenres && catchGenres.length > 0
            ? catchGenres.map((genre) => ({
                value: genre,
                label: genre,
              }))
            : []
        }
        value={selectedGenres.map(genre => ({ value: genre, label: genre }))}
        onChange={handlerArray}
      />
      <hr />
      <button onClick={prevPage} disabled={currentPage === 1}>
        Page Before
      </button>
      Page {currentPage} of {totalPages}
      <button
        onClick={nextPage}
        style={{ marginLeft: "10px" }}
        disabled={currentPage === totalPages}
      >
        Next Page
      </button>
      <hr />
      {VideogamesShowed.length === 0 && (
        <div>
          <h3>No games found</h3>
        </div>
      )}
      <Cards catchGames={VideogamesShowed} />
      <button onClick={prevPage} disabled={currentPage === 1}>
        Page Before
      </button>
      Page {currentPage} of {totalPages}
      <button
        onClick={nextPage}
        style={{ marginLeft: "10px" }}
        disabled={currentPage === totalPages}
      >
        Next Page
      </button>
    </div>
  );
};

export default Home;
