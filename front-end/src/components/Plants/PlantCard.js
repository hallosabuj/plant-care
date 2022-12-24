import React, { Component } from 'react'
import Card from '@mui/material/Card';
import deleteIcon from '../../delete.png';
import waterIcon from '../../water.png';
import axios from 'axios';
import { Link } from 'react-router-dom'

class PlantCard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      plant: this.props.plant
    }
  }
  async deletePlant() {
    console.log("Deleting", this.state.plant.plantId)
    await axios.delete("/api/plant/" + this.state.plant.plantId).catch(function (error) {
      console.log(error);
    });
    this.props.reRenderOnDelete()
  }
  render() {
    let imageUrl = "/api/plant/downloadImage/" + this.state.plant.profileImage
    return (
      <div className='pr-1 pl-1 pt-3 pb-3 shadow-lg hover:scale-105'>
        <Card sx={{ border: 1, borderRadius: 2, height: "405px", backgroundColor: "cyan" }}>
          <Link to={"/web/plants/" + this.state.plant.plantId}>
            <div className='h-[300px] bg-lime-900 flex justify-center items-center p-2 rounded-md relative' >
              <img src={imageUrl} style={{ maxHeight: "100%", maxWidth: "100%" }} alt={this.state.plant.name} />
              <img src={deleteIcon} onClick={() => this.deletePlant()} alt="delete" className='hover:opacity-100 opacity-60 top-3 right-3 absolute'/>
            </div>
          </Link>
          <div className=' bg-orange-200 h-[100px] rounded-md flex justify-center items-center'>
            <div className='grid grid-cols-2 grid-rows-2 gap-2 w-full p-2'>
              {/* Row 1 */}
              <div className=' flex p-2 items-center col-span-2 bg-slate-600 h-10'>{this.state.plant.name}</div>
              {/* Row 2 */}
              <div className='flex justify-center items-center bg-orange-400'>
                <img src={waterIcon} className="h-6 w-6"></img>
              </div>
              <div className='flex justify-center items-center bg-orange-400'>
                <div className='bg-red-700 h-4 w-4 rounded-1/2'></div>
              </div>
          </div>
          </div>
        </Card>
      </div>
    );
  }
}

export default PlantCard