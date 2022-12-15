import React, { Component } from 'react'
import Card from '@mui/material/Card';
import deleteIcon from '../../delete.png';
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
        <Card sx={{ border: 1, borderRadius: 2, height: "500px", backgroundColor: "cyan" }}>
          <Link to={"/web/plants/" + this.state.plant.plantId}>
            <div className='h-[300px] bg-lime-900 flex justify-center items-center p-2 rounded-md' >
              <img src={imageUrl} style={{ maxHeight: "100%", maxWidth: "100%" }} alt={this.state.plant.name} />
            </div>
          </Link>
          <div className=' bg-orange-200 h-[200px] rounded-md flex justify-center items-center'>
            <div className='grid grid-cols-3 grid-rows-3 gap-2'>
              {/* Row 1 */}
              <div className=' flex justify-center items-center col-span-2 bg-slate-600'>{this.state.plant.name}</div>
              <div className='flex justify-center items-center bg-slate-600'>
                <img src={deleteIcon} onClick={() => this.deletePlant()} alt="delete" />
              </div>
              {/* Row 2 */}
              <div className='flex justify-center items-center bg-orange-400'>01</div>
              <div className='flex justify-center items-center bg-orange-400'>02</div>
              <div className='flex justify-center items-center bg-orange-400'>03</div>
              {/* Row 3 */}
              <div className='flex justify-center items-center text-xs bg-green-600'>22/11/22</div>
              <div className='flex justify-center items-center col-span-2 text-xs bg-green-600'>22/11/22-22/11/22</div>
            </div>
          </div>
        </Card>
      </div>
    );
  }
}

export default PlantCard