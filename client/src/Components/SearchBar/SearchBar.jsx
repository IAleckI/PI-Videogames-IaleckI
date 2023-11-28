import { useState } from "react";
import Card from "../Card/Card";
import Style from "../SearchBar/SearchBar.module.css";
import imgNotFound from "../../imgs/notFound.jpg";

const SearchBar = ({ catchGames }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredGames, setFilteredGames] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [showNotFoundMessage, setShowNotFoundMessage] = useState(false);

  const handleSearch = () => {
    const filtered = catchGames.filter((game) =>
      game.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (searchTerm && filtered.length === 0) {
      setShowNotFoundMessage(true);
      setShowResults(false);
    }else if(searchTerm === "") {
      setShowResults(false);
      setShowNotFoundMessage(false);
    } 
    else {
      setShowNotFoundMessage(false);
      setFilteredGames(filtered);
      setShowResults(true);
    }
  };

  const handleButtonClick = () => {
    handleSearch();
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleButtonClick}>Search</button>

      {showResults && (
        <div className={Style.cardList}>
          {filteredGames.map((game) => (
            <Card
              key={game.id}
              id={game.id}
              name={game.name}
              image={game.image ? game.image : imgNotFound}
              genres={game.genres}
            />
          ))}
        </div>
      )}

      {showNotFoundMessage && !showResults && <p>there is no results for your searched game</p>}
    </div>
  );
};

export default SearchBar;
