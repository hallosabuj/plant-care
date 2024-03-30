import axios from 'axios';
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import deleteIcon from '../../assets/delete.png';

export class FertilizerCard extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       fertilizer:this.props.fertilizer
    }
  }
  async deleteFertilizer(){
    const headers = {
      'Authorization': localStorage.getItem("token")
    };
    await axios.delete("/api/user/fertilizer/"+this.state.fertilizer.fertilizerId, {headers}).then(()=>{
      alert("Fertilizer deleted successfully")
      this.props.reRenderOnDelete()
    }).catch(function(error) {
      alert(error.response.data)
      if(error.response.status === 401){
        localStorage.setItem("isSignedIn", false)
        localStorage.removeItem("token")
      }
    });
  }
  render() {
    let imageUrl = "/api/user/fertilizer/downloadImage/" + this.state.fertilizer.profileImage
    return (
      <div className='pr-1 pl-1 pt-3 pb-3 hover:scale-105'>
        <div className='h-[400px] shadow-lg'>
          <div className='h-[300px] flex justify-center items-center bg-slate-500 border-2 border-slate-900 rounded-md relative overflow-hidden p-3'>
            <Link to={"/web/user/fertilizers/"+this.state.fertilizer.fertilizerId}>
              <img src={imageUrl} style={{maxHeight:"100%",maxWidth:"100%"}} className='rounded-md' alt={this.state.fertilizer.name}/>
            </Link>
            <img src={deleteIcon} onClick={()=>this.deleteFertilizer()} alt="delete" className='hover:opacity-100 opacity-60 top-3 right-3 absolute'/>
          </div>
          <div className='h-[100px] rounded-md flex justify-center items-center bg-slate-500 border-2 border-slate-900'>
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