import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/Home';
import NavBar from './components/common/NavBar';
import Plants from './components/plants-common/Plants';
import Fertilizers from './components/fertilizers/Fertilizers';
import Footer from './components/common/Footer';
import PlantDetails from './components/plants-common/PlantDetails';
import FertilizerDetails from './components/fertilizers/FertilizerDetails';
import ApplyFertilizer from './components/apply/ApplyFertilizer';
import Pesticides from './components/pesticides/Pesticides';
import Disease from './components/disease/Disease';
import PesticideDetails from './components/pesticides/PesticideDetails';
import ApplyPesticide from './components/apply/ApplyPesticide';
import CompressImage from './components/CompressImage';
import SwaggerUIPage from './components/swagger/SwaggerUIPage';
import SingIn from './components/user/SignIn';
import { Component } from 'react';
import UserPlants from './components/plants-user/UserPlants';
import UserPlantDetails from './components/plants-user/UserPlantDetails';
import axios from 'axios';

class App extends Component {
  constructor(props){
    super(props)
    console.log("HHHH", localStorage.getItem('isSignedIn'))
    if(!(localStorage.getItem('isSignedIn') === 'true')){
      localStorage.setItem('isSignedIn', false);
    }
  }
  render() {
      return (
        <div className="App">
          <div className='bg-slate-300 min-h-screen flex flex-col'>
            <div className='w-full h-auto'>
              <Router>
                <NavBar/>
                <Routes>
                  <Route exact path='/' element={<Home />}></Route>
                  <Route exact path='/web' element={<Home />}></Route>
                  <Route exact path='/web/plants' element={<Plants />}></Route>
                  <Route exact path='/web/plants/:plantId' element={<PlantDetails />}></Route>
                  <Route exact path='/web/disease' element={<Disease />}></Route>
                  <Route exact path='/web/compress' element={<CompressImage />}></Route>
                  <Route exact path='/swagger-ui' element={<SwaggerUIPage />}></Route>

                  <Route exact path='/web/user/plants' element={<UserPlants/>}></Route>
                  <Route exact path='/web/user/plants/:plantId' element={<UserPlantDetails/>}></Route>
                  <Route exact path='/web/user/fertilizers' element={<Fertilizers/>}></Route>
                  <Route exact path='/web/user/fertilizers/:fertilizerId' element={<FertilizerDetails/>}></Route>
                  <Route exact path='/web/user/apply-fertilizer' element={<ApplyFertilizer/>}></Route>
                  <Route exact path='/web/user/pesticides' element={<Pesticides/>}></Route>
                  <Route exact path='/web/user/pesticides/:pesticideId' element={<PesticideDetails/>}></Route>
                  <Route exact path='/web/user/apply-pesticide' element={<ApplyPesticide/>}></Route>

                  <Route exact path='/web/signin' element={<SingIn/>}></Route>
                  {/* <Route exact path='/web/signin' element={<SingIn toggleSignedIn={this.toggleSignedIn}/>}></Route> */}
                </Routes>
              </Router>
            </div>
            <div className='w-full mt-auto'>
              <Footer />
            </div>
          </div>
        </div>
      );
    }
}

export default App;
