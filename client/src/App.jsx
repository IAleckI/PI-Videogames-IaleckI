import './App.css';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './Views/LandingPage';
import FormPage from './Views/FormPage';
import Home from './Views/Home';
import Detail from './Views/Detail/Detail';


function App() {



  return (
    <div className="App">
      <Routes>

        <Route path='/' element={<LandingPage/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/form' element={<FormPage/>} />
        <Route path='/home/:id' element={<Detail/>} />

      </Routes>
    </div>
  );
}

export default App;
