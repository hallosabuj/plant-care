import axios from 'axios';
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import deleteIcon from '../../assets/delete.png';
import Confirm from '../common/modals/Confirm';

export class PesticideCard extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       pesticide:this.props.pesticide,
       confirmDeletePesticideModal: false
    }
  }
  deletePesticide = async(confirm) => {
    if(confirm === true){
      const headers = {
        'Authorization': localStorage.getItem("token")
      };
      await axios.delete("/api/user/pesticide/"+this.state.pesticide.pesticideId, {headers}).then(()=>{
        alert("Pesticide deleted successfully")
      }).catch(function(error) {
        if(error.response.status === 401){
          localStorage.setItem("isSignedIn", false)
          localStorage.removeItem("token")
        }
      });
      this.props.reRenderOnDelete()
    }
  }
  confirmDeletePesticide = () => {
    this.setState({
      confirmDeletePesticideModal: true
    })
  }
  closeConfirmDeletePesticideModal = () => {
    this.setState({
      confirmDeletePesticideModal: false
    })
  }
  render() {
    let imageUrl = "/api/user/pesticide/downloadImage/" + this.state.pesticide.profileImage
    return (
      <div>
        <div className='pr-1 pl-1 pt-3 pb-3 hover:scale-105 transition-all duration-300'>
          <div className='h-[400px] shadow-lg shadow-slate-600 rounded-lg'>
            <div className='h-[300px] flex justify-center items-center bg-slate-500 bg-opacity-40 rounded-t-lg relative overflow-hidden p-3' >
              <Link to={"/web/user/pesticides/"+this.state.pesticide.pesticideId}>
                <img src={imageUrl} alt={this.state.pesticide.name} className='w-[100%] h-[280px] object-cover rounded-lg shadow-[#3e4a5c] shadow-md'/>
              </Link>
              <img src={deleteIcon} onClick={this.confirmDeletePesticide} alt="delete" className='hover:opacity-100 opacity-80 top-3 right-3 absolute h-7 w-7 md:h-9 md:w-9'/>
            </div>
            <div className='h-[100px] rounded-b-lg flex justify-center items-center bg-slate-500 bg-opacity-40'>
              <div className='grid grid-cols-1 gap-2 w-full p-2'>
                {/* Row 1 */}
                <div className='flex items-center w-full p-2'>{this.state.pesticide.name}</div>
                {/* Row 2 */}
                <div className='flex items-center w-full p-2'>Availability: {this.state.pesticide.available}</div>
              </div>
            </div>
          </div>
        </div>
        {this.state.confirmDeletePesticideModal && <Confirm message="Are you sure you want to delete?" onClose={this.closeConfirmDeletePesticideModal} onConfirm={this.deletePesticide}/>}
      </div>
    );
  }
}

export default PesticideCard