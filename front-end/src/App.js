import {HashRouter as Router,Route, Routes} from 'react-router-dom'
import Home from './components/Home';
import NavBar from './components/NavBar';
import Plants from './components/Plants/Plants';
import Fertilizers from './components/fertilizers/Fertilizers';
import Footer from './components/Footer';
import PlantDetails from './components/Plants/PlantDetails';
import FertilizerDetails from './components/fertilizers/FertilizerDetails';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar/>
        <Routes>
          <Route exact path='/' element={<Home/>}></Route>
          <Route exact path='/web/plants' element={<Plants/>}></Route>
          <Route exact path='/web/plants/:plantId' element={<PlantDetails/>}></Route>
          <Route exact path='/web/fertilizers' element={<Fertilizers/>}></Route>
          <Route exact path='/web/fertilizers/:fertilizerId' element={<FertilizerDetails/>}></Route>
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
