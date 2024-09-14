import axios from 'axios';
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import deleteIcon from '../../assets/delete.png';
import Confirm from '../common/modals/Confirm';

export class FertilizerCard extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       fertilizer:this.props.fertilizer,
       confirmDeleteFertilizerModal: false
    }
  }
  deleteFertilizer = async(confirm) => {
    if(confirm === true){
      const headers = {
        'Authorization': localStorage.getItem("token")
      };
      await axios.delete("/api/user/fertilizer/"+this.state.fertilizer.fertilizerId, {headers}).then(()=>{
        alert("Fertilizer deleted successfully")
        this.props.reRenderOnDelete()
      }).catch(function(error) {
        if(error.response.status === 401){
          localStorage.setItem("isSignedIn", false)
          localStorage.removeItem("token")
        }
      });
    }
  }
  confirmDeleteFertilizer = () => {
    this.setState({
      confirmDeleteFertilizerModal: true
    })
  }
  closeConfirmDeleteFertilizerModal = () =>{
    this.setState({
      confirmDeleteFertilizerModal: false
    })
  }
  render() {
    let imageUrl = "/api/user/fertilizer/downloadImage/" + this.state.fertilizer.profileImage
    return (
      <div>
        <div className='pr-1 pl-1 pt-3 pb-3 hover:scale-105 transition-all duration-300'>
          <div className='h-[400px] shadow-md shadow-slate-600 rounded-lg'>
            <div className='h-[300px] flex justify-center items-center bg-slate-500 bg-opacity-40 rounded-t-lg relative overflow-hidden p-3'>
              <Link to={"/web/user/fertilizers/"+this.state.fertilizer.fertilizerId}>
                <img src={imageUrl} className='w-[100%] h-[280px] object-cover rounded-md shadow-[#3e4a5c] shadow-md' alt={this.state.fertilizer.name}/>
              </Link>
              <img src={deleteIcon} onClick={this.confirmDeleteFertilizer} alt="delete" className='hover:opacity-100 opacity-80 top-3 right-3 absolute h-7 w-7 md:h-9 md:w-9'/>
            </div>
            <div className='h-[100px] rounded-b-lg flex justify-center items-center bg-slate-500 bg-opacity-40'>
              <div className='grid grid-cols-1 gap-2 w-full p-2'>
                {/* Row 1 */}
                <div className='flex items-center w-full p-2'>{this.state.fertilizer.name}</div>
                {/* Row 2 */}
                <div className='flex items-center w-full p-2'>Availability: {this.state.fertilizer.available}</div>
              </div>
            </div>
          </div>
        </div>
        {this.state.confirmDeleteFertilizerModal && <Confirm message="Are you sure you want to delete?" onClose={this.closeConfirmDeleteFertilizerModal} onConfirm={this.deleteFertilizer}/>}
      </div>
    );
  }
}

export default FertilizerCard