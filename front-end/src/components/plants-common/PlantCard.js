import React, { Component } from 'react'
import waterIcon from '../../assets/water.png';
import { Link } from 'react-router-dom'

class PlantCard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      plant: this.props.plant
    }
  }
  render() {
    let imageUrl = "/api/plant/downloadImage/medium/" + this.state.plant.profileImage
    return (
      <div className='pr-1 pl-1 pt-3 pb-3 hover:scale-105 transition-all duration-300'>
        <div className='lg:h-[370px] md:h-[370px] h-[250px] rounded-lg shadow-md shadow-slate-600'>
          <div className='lg:h-[320px] md:h-[320px] h-[200px] flex justify-center items-center rounded-t-lg relative overflow-hidden bg-slate-500 bg-opacity-40 p-3' >
            <Link to={"/web/plants/" + this.state.plant.plantId}>
              <img src={imageUrl} className=' w-[100%] lg:h-[290px] md:h-[290px] h-[170px] object-cover rounded-md shadow-[#3e4a5c] shadow-md' alt={this.state.plant.name} />
            </Link>
          </div>
          <div className=' h-[50px] rounded-b-lg flex justify-center items-center bg-slate-500 bg-opacity-40'>
            <div className='grid gap-2 w-full p-2 overflow-scroll scrollbar-hide'>
              {/* Row 1 */}
              <div className=' flex p-2 items-center text-stone-200 h-10'>
                {this.state.plant.name}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PlantCard