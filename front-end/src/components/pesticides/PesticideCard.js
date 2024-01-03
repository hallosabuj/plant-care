import axios from 'axios';
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import deleteIcon from '../../assets/delete.png';

export class PesticideCard extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       pesticide:this.props.pesticide
    }
  }
  async deletePesticide(){
    await axios.delete("/api/pesticide/"+this.state.pesticide.pesticideId).then(()=>{
      alert("Pesticide deleted successfully")
    }).catch(function(error) {
      alert(error.response.data)
    });
    this.props.reRenderOnDelete()
  }
  render() {
    let imageUrl = "/api/pesticide/downloadImage/" + this.state.pesticide.profileImage
    return (
      <div className='pr-1 pl-1 pt-3 pb-3 hover:scale-105'>
        <div className='h-[400px] shadow-lg'>
          <div className='h-[300px] flex justify-center items-center border-2 bg-slate-500 border-slate-900 rounded-md relative overflow-hidden p-3' >
            <Link to={"/web/user/pesticides/"+this.state.pesticide.pesticideId}>
              <img src={imageUrl} style={{maxHeight:"100%",maxWidth:"100%"}} alt={this.state.pesticide.name} className='rounded-lg'/>
            </Link>
            <img src={deleteIcon} onClick={()=>this.deletePesticide()} alt="delete" className='hover:opacity-100 opacity-60 top-3 right-3 absolute'/>
          </div>
          <div className='h-[100px] rounded-md flex justify-center items-center bg-slate-500 border-2 border-slate-900'>
            <div className='grid grid-cols-1 gap-2 w-full p-2'>
              {/* Row 1 */}
              <div className='bg-red-400 flex items-center w-full p-2'>{this.state.pesticide.name}</div>
              {/* Row 2 */}
              <div className='bg-green-600 flex items-center w-full p-2'>Availability: {this.state.pesticide.available}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PesticideCard