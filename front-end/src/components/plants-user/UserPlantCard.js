import React, { Component } from 'react'
import deleteIcon from '../../assets/delete.png';
import waterIcon from '../../assets/water.png';
import axios from 'axios';
import { Link } from 'react-router-dom'

class UserPlantCard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      plant: this.props.plant
    }
  }
  async deletePlant() {
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
  render() {
    let imageUrl = "/api/plant/downloadImage/medium/" + this.state.plant.profileImage
    return (
      <div className='pr-1 pl-1 pt-3 pb-3 hover:scale-105 transition-all duration-300'>
        <div className='h-[420px] rounded-lg shadow-lg '>
          <div className='h-[320px] flex justify-center items-center rounded-lg relative overflow-hidden bg-slate-500 border-2 border-slate-900 p-3' >
            <Link to={"/web/user/plants/" + this.state.plant.plantId}>
              <img src={imageUrl} className='w-[100%] h-[290px] object-cover rounded-md' alt={this.state.plant.name} />
            </Link>
            <img src={deleteIcon} onClick={() => this.deletePlant()} alt="delete" className='hover:opacity-100 opacity-60 top-3 right-3 absolute'/>
          </div>
          <div className=' h-[100px] rounded-lg flex justify-center items-center bg-slate-500 border-2 border-slate-900'>
            <div className='grid grid-cols-2 grid-rows-2 gap-2 w-full p-2'>
              {/* Row 1 */}
              <div className=' flex p-2 items-center col-span-2 text-stone-200 h-10'>
                {this.state.plant.numberId}: {this.state.plant.name}
              </div>
              {/* Row 2 */}
              <div className='flex justify-center items-center'>
                <img src={waterIcon} className="h-6 w-6" alt={"Water"}></img>
              </div>
              <div className='flex justify-center items-center'>
                <div className='bg-red-700 h-4 w-4 rounded-full'></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserPlantCard