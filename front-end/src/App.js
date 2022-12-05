import logo from './logo.png';
import AddPlantForm from './components/examples/AddPlant';
import ShowImage from './components/examples/ShowImage';
import {BrowserRouter as Router,Route,Link, Routes} from 'react-router-dom'
import Home from './components/Home';
import AddFertilizer from './components/examples/AddFertilizerModal';
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
          <Route exact path='/plants' element={<Plants/>}></Route>
          <Route exact path='/plants/:plantId' element={<PlantDetails/>}></Route>
          <Route exact path='/fertilizers' element={<Fertilizers/>}></Route>
          <Route exact path='/fertilizers/:fertilizerId' element={<FertilizerDetails/>}></Route>
          <Route exact path='/addplant' element={<AddPlantForm/>}></Route>
          <Route exact path="/showImage" element={<ShowImage/>}></Route>
          <Route exact path="/add-fertilizer" element={<AddFertilizer/>}></Route>
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
