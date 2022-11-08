import React, { Component } from 'react'
import Card from '@mui/material/Card';
import deleteIcon from '../../delete.png';
import axios from 'axios';

class PlantCard extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       plant:this.props.plant
    }
  }
  async deletePlant(){
    console.log("Deleting",this.state.plant.plantId)
    this.props.reRenderOnDelete()
    await axios.delete("/plant/"+this.state.plant.plantId).catch(function(error) {
      console.log(error);
    });
    this.props.reRenderOnDelete()
  }
  render() {
  let imageUrl = "http://localhost:8080/plant/downloadImage/" + this.state.plant.imageName
    return (
      <div className='pr-1 pl-1 pt-3 pb-3 shadow-lg lg:w-1/6 md:w-1/3'>
        <Card sx={{ border: 1, borderRadius: 2, height: "500px", backgroundColor: "cyan" }}>
          <div className='h-[300px] bg-lime-900 flex justify-center items-center p-2 rounded-md'>
            <img src={imageUrl} style={{maxHeight:"100%",maxWidth:"100%"}} alt={this.state.plant.name}/>
          </div>
          <div className=' bg-orange-200 h-[200px] rounded-md flex justify-center items-center'>
            <div className='grid grid-cols-3 grid-rows-3 gap-2'>
              {/* Row 1 */}
              <div className=' flex justify-center items-center col-span-2 bg-slate-600'>{this.state.plant.name}</div>
              <div className='flex justify-center items-center bg-slate-600'>
                <img src={deleteIcon} onClick={()=>this.deletePlant()} alt="delete" />
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