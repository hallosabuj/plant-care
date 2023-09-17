import axios from 'axios';
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import deleteIcon from '../../delete.png';

export class FertilizerCard extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       fertilizer:this.props.fertilizer
    }
  }
  async deleteFertilizer(){
    await axios.delete("/api/fertilizer/"+this.state.fertilizer.fertilizerId).then(()=>{
      alert("Fertilizer deleted successfully")
      this.props.reRenderOnDelete()
    }).catch(function(error) {
      alert(error.response.data)
    });
  }
  render() {
    let imageUrl = "/api/fertilizer/downloadImage/" + this.state.fertilizer.profileImage
    return (
      <div className='pr-1 pl-1 pt-3 pb-3 shadow-lg hover:scale-105'>
        <div className='h-[400px]'>
          <div className='h-[300px] flex justify-center items-center border-[6px] border-black rounded-md relative overflow-hidden'>
            <Link to={"/web/fertilizers/"+this.state.fertilizer.fertilizerId}>
              <img src={imageUrl} style={{maxHeight:"100%",maxWidth:"100%"}} alt={this.state.fertilizer.name}/>
            </Link>
            <img src={deleteIcon} onClick={()=>this.deleteFertilizer()} alt="delete" className='hover:opacity-100 opacity-60 top-3 right-3 absolute'/>
          </div>
          <div className=' bg-orange-200 h-[100px] rounded-md flex justify-center items-center'>
            <div className='grid grid-cols-1 gap-2 w-full p-2'>
              {/* Row 1 */}
              <div className='bg-red-400 flex items-center w-full p-2'>{this.state.fertilizer.name}</div>
              {/* Row 2 */}
              <div className='bg-green-600 flex items-center w-full p-2'>Availability: {this.state.fertilizer.available}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FertilizerCard