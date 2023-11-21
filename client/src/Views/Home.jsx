import { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getVideogames } from '../Redux/Actions';
import Cards from '../Components/Cards/Cards';
import { useState } from 'react';


const Home = () => {

    const catchGames = useSelector((state) => state.getVideogames)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getVideogames())
    }, [])   

    /* -------------------------------------------------------------------------- */
    
    /* ------------------------------- Paginación ------------------------------- */
  const maxedGamesDysplayed = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(catchGames.length / maxedGamesDysplayed);
  
  
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
  
  const VideogamesShowed = Array.from(catchGames).slice(startIndex, endIndex);
    
    /* -------------------------------------------------------------------------- */
  return (
    <div>
        <Cards catchGames={VideogamesShowed}/>
        <button onClick={prevPage} disabled={currentPage === 1}>
          Página Anterior
        </button>
        Página {currentPage} de {totalPages}
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          Página Siguiente
        </button>
    </div>
  )
}

export default Home