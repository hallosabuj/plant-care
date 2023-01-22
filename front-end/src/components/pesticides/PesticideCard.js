import Card from '@mui/material/Card';
import axios from 'axios';
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import deleteIcon from '../../delete.png';

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
      <div className='pr-1 pl-1 pt-3 pb-3 shadow-lg hover:scale-105'>
        <Card sx={{ border: 1, borderRadius: 2, height: "500px", backgroundColor: "cyan" }}>
          <Link to={"/web/pesticides/"+this.state.pesticide.pesticideId}>
          <div className='h-[300px] bg-lime-900 flex justify-center items-center p-2 rounded-md' >
            <img src={imageUrl} style={{maxHeight:"100%",maxWidth:"100%"}} alt={this.state.pesticide.name}/>
          </div>
          </Link>
          <div className=' bg-orange-200 h-[200px] rounded-md flex justify-center items-center'>
            <div className='grid grid-cols-3 grid-rows-3 gap-2 w-full p-2'>
              {/* Row 1 */}
              <div className='bg-red-400 col-span-2 flex items-center p-2'>Name: {this.state.pesticide.name}</div>
              <div className='flex justify-center items-center bg-slate-600'>
                <img src={deleteIcon} onClick={()=>this.deletePesticide()} alt="delete" />
              </div>
              {/* Row 2 */}
              <div className='bg-green-600 col-span-3 flex items-center p-2'>Availability: {this.state.pesticide.available}</div>
            </div>
          </div>
        </Card>
      </div>
    );
  }
}

export default PesticideCard