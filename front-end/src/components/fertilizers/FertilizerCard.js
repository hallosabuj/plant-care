import Card from '@mui/material/Card';
import axios from 'axios';
import React, { Component } from 'react'
import deleteIcon from '../../delete.png';

export class FertilizerCard extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       fertilizer:this.props.fertilizer
    }
  }
  openFertilizerDetails=()=>{
    window.location.pathname="/fertilizers/"+this.state.fertilizer.fertilizerId
  }
  async deleteFertilizer(){
    await axios.delete("/fertilizer/"+this.state.fertilizer.fertilizerId).then(()=>{
      alert("Fertilizer deleted successfully")
    }).catch(function(error) {
      alert(error.response.data)
    });
    this.props.reRenderOnDelete()
  }
  render() {
    let imageUrl = "http://localhost:8080/fertilizer/downloadImage/" + this.state.fertilizer.profileImage
    return (
      <div className='pr-1 pl-1 pt-3 pb-3 shadow-lg lg:w-1/6 md:w-1/3 hover:scale-105'>
        <Card sx={{ border: 1, borderRadius: 2, height: "500px", backgroundColor: "cyan" }}>
          <div className='h-[300px] bg-lime-900 flex justify-center items-center p-2 rounded-md' onClick={this.openFertilizerDetails}>
            <img src={imageUrl} style={{maxHeight:"100%",maxWidth:"100%"}} alt={this.state.fertilizer.name}/>
          </div>
          <div className=' bg-orange-200 h-[200px] rounded-md flex justify-center items-center'>
            <div className='grid grid-cols-3 grid-rows-3 gap-2'>
              {/* Row 1 */}
              <div className='bg-red-400 col-span-2 flex justify-center items-center'>Name: {this.state.fertilizer.name}</div>
              <div className='flex justify-center items-center bg-slate-600'>
                <img src={deleteIcon} onClick={()=>this.deleteFertilizer()} alt="delete" />
              </div>
              <div className='bg-green-600 col-span-3 flex justify-center items-center'>Availability: {this.state.fertilizer.available}</div>
            </div>
          </div>
        </Card>
      </div>
    );
  }
}

export default FertilizerCard