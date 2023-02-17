import {HashRouter as Router,Route, Routes} from 'react-router-dom'
import Home from './components/Home';
import NavBar from './components/NavBar';
import Plants from './components/Plants/Plants';
import Fertilizers from './components/fertilizers/Fertilizers';
import Footer from './components/Footer';
import PlantDetails from './components/Plants/PlantDetails';
import FertilizerDetails from './components/fertilizers/FertilizerDetails';
import ApplyFertilizer from './components/apply/ApplyFertilizer';
import Pesticides from './components/pesticides/Pesticides';
import Disease from './components/disease/Disease';
import PesticideDetails from './components/pesticides/PesticideDetails';
import ApplyPesticide from './components/apply/ApplyPesticide';
import CompressImage from './components/CompressImage';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar/>
        <Routes>
          <Route exact path='/' element={<Home/>}></Route>
          <Route exact path='/web' element={<Home/>}></Route>
          <Route exact path='/web/plants' element={<Plants/>}></Route>
          <Route exact path='/web/plants/:plantId' element={<PlantDetails/>}></Route>
          <Route exact path='/web/fertilizers' element={<Fertilizers/>}></Route>
          <Route exact path='/web/fertilizers/:fertilizerId' element={<FertilizerDetails/>}></Route>
          <Route exact path='/web/apply-fertilizer' element={<ApplyFertilizer/>}></Route>
          <Route exact path='/web/pesticides' element={<Pesticides/>}></Route>
          <Route exact path='/web/apply-pesticide' element={<ApplyPesticide/>}></Route>
          <Route exact path='/web/pesticides/:pesticideId' element={<PesticideDetails/>}></Route>
          <Route exact path='/web/disease' element={<Disease/>}></Route>
          <Route exact path='/web/compress' element={<CompressImage/>}></Route>
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
