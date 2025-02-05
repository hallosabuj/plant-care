import React, { Component } from 'react'
import deleteIcon from '../../assets/delete.png';
import waterIcon from '../../assets/water.png';
import axios from 'axios';
import { Link } from 'react-router-dom'
import Confirm from '../common/modals/Confirm';

class UserPlantCard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      plant: this.props.plant,
      confirmPlantDeleteModal: false
    }
  }
  deletePlant = async (confirm) => {
    if(confirm === true){
      console.log("Deleting", this.state.plant.plantId)
      const headers = {
        'Authorization': localStorage.getItem("token")
      };
      await axios.delete("/api/user/plant/" + this.state.plant.plantId, {headers}).catch(function (error) {
        if(error.response.status === 401){
          localStorage.setItem("isSignedIn", false)
          localStorage.removeItem("token")
        }
        console.log(error);
      });
      this.props.reRenderOnDelete() 
    }
  }
  confirmPlantDelete = () => {
    this.setState({
      confirmPlantDeleteModal: true
    })
  }
  closePlantDeleteModal = () => {
    this.setState({
      confirmPlantDeleteModal: false
    })
  } 
  render() {
    let imageUrl = "/api/plant/downloadImage/medium/" + this.state.plant.profileImage
    return (
      <div>
        <div className='pr-1 pl-1 pt-3 pb-3 hover:scale-105 transition-all duration-300'>
          <div className='lg:h-[420px] md:h-[420px] h-[300px] rounded-lg shadow-md shadow-slate-600'>
            <div className='lg:h-[320px] md:h-[320px] h-[200px] flex justify-center items-center rounded-t-lg relative overflow-hidden bg-slate-500 bg-opacity-40 p-3' >
              <Link to={"/web/user/plants/" + this.state.plant.plantId}>
                <img src={imageUrl} className='w-[100%] lg:h-[290px] md:h-[290px] h-[170px] object-cover rounded-md shadow-[#3e4a5c] shadow-md' alt={this.state.plant.name} />
              </Link>
              <img src={deleteIcon} onClick={this.confirmPlantDelete} alt="delete" className='hover:opacity-100 opacity-80 top-3 right-3 absolute h-7 w-7 md:h-9 md:w-9'/>
            </div>
            <div className=' h-[100px] rounded-b-lg flex justify-center items-center bg-slate-500 bg-opacity-40'>
              <div className='grid grid-cols-2 grid-rows-2 gap-2 w-full p-2 overflow-scroll scrollbar-hide'>
                {/* Row 1 */}
                <div className='flex p-2 items-center col-span-2 text-stone-200 h-10'>
                  {this.state.plant.name}
                </div>
                {/* Row 2 */}
                <div className='flex p-2 items-center text-stone-200 h-10'>ID :</div>
                <div className='flex justify-center items-center bg-red-300 hover:bg-red-500 shadow-black shadow-sm h-8 w-8 rounded-full'>
                  <div>{this.state.plant.numberId}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {this.state.confirmPlantDeleteModal && <Confirm message="Are you sure you want to delete?" onClose={this.closePlantDeleteModal} onConfirm={this.deletePlant}/>}
      </div>
    );
  }
}

export default UserPlantCard