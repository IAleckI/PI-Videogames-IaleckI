import { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getVideogames } from '../Redux/Actions';
import Cards from '../Components/Cards/Cards';


const Home = () => {
    const catchGames = useSelector((state) => state.getVideogames)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getVideogames())
    }, [])   

  return (
    <div>
        <Cards catchGames={catchGames}/>
        
    </div>
  )
}

export default Home