import axios from 'axios'
import React, { Component } from 'react'
import editIcon from '../../assets/edit.png';
import FertilizerEditModal from './Modals/FertilizerEditModal';
import { useNavigate } from 'react-router-dom';
import addIcon from '../../assets/add.png';
import AddAppliedFertilizerModal from './Modals/AddAppliedFertilizerModal';

const FertilizerDetails = (props) =>{
  const navigate = useNavigate()
  return (<FertilizerDetailsClass navigate={navigate}/>)
}

export class FertilizerDetailsClass extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
        fertilizerDetails:null,
        fertilizerId: null,
        editModal:false,
        editValues:null,
        plantLists: null,
        showPlantList:true,
        addAppliedFertilizerModal: false
    }
  }
  async getPlantsUsingThisFertilizer(){
    let fertilizerId = window.location.href.split('/')[7] 
    // Getting basic details
    const headers = {
      'Authorization': localStorage.getItem("token")
    };
    await axios.get("/api/user/plants/fertilizer/" + fertilizerId, {headers}).then((response) => {
      this.setState({
        plantLists: response.data
      })
    }).catch(function (error) {
      console.log(error);
      if(error.response.status === 401){
        localStorage.setItem("isSignedIn", false)
        localStorage.removeItem("token")
      }
    });
  }
  toggleShowPlantList = () =>{
    this.setState({showPlantList:!this.state.showPlantList})
  }
  async getDetails(){
    let fertilizerId = window.location.href.split('/')[7]
    // Getting basic details
    const headers = {
      'Authorization': localStorage.getItem("token")
    };
    await axios.get("/api/user/fertilizer/" + fertilizerId, {headers}).then((response) => {
      this.setState({
        fertilizerDetails: response.data
      })
      this.setState({
        fertilizerId: response.data.fertilizerId
      })
    }).catch(function (error) {
      console.log(error);
      if(error.response.status === 401){
        localStorage.setItem("isSignedIn", false)
        localStorage.removeItem("token")
      }
    });
  }
  componentDidMount(){
    // If it's not logged in then redirect to home page
    if(!localStorage.getItem("isSignedIn")){
      this.props.navigate('/');
    }
    this.getPlantsUsingThisFertilizer()
    this.getDetails()
  }
  showEditModal=(displayName,fieldName,fieldValue)=>{
    let textTypes="name composition details"

    let editValues={fertilizerId:this.state.fertilizerDetails.fertilizerId,displayName:null,fieldName:null,fieldValue:null,fieldType:null,fieldValueOptionsIfAny:null}
    editValues.displayName=displayName
    editValues.fieldName=fieldName
    editValues.fieldValue=fieldValue

    if(fieldName==="available"){
      editValues.fieldType="radio"
      editValues.fieldValueOptionsIfAny={YES:"YES",NO:"NO"}
    }else if(textTypes.includes(fieldName)){
      editValues.fieldType="text"
    }
    this.setState({
      editValues:editValues
    })
    this.setState({
      editModal:true
    })
  }
  showAddAppliedFertilizersModal=()=>{
    this.setState({
      addAppliedFertilizerModal:true
    })
  }
  closeEditModal=()=>{
    this.setState({
      editModal:false,
      editValues:null
    })
    this.getDetails()
  }
  closeAddAppliedFertilizerModal=()=>{
    this.setState({
      addAppliedFertilizerModal: false,
    })
  }
  render() {
    let imageUrl=""
    if (this.state.fertilizerDetails==null){
      imageUrl = "/api/user/fertilizer/downloadImage/"
    }else{
      imageUrl = "/api/user/fertilizer/downloadImage/" + this.state.fertilizerDetails.profileImage
    }
    return !(this.state.fertilizerDetails)?(<div>Details not found</div>):(
      <div className='grid gap-2 p-2 w-full'>
          {/* Row 1 */}
          <div className='bg-slate-500 h-14 flex justify-center items-center text-2xl md:text-4xl relative'>
            <h1 className='bg-gradient-to-r from-[#102a14] to-[#7d0b65] bg-clip-text text-transparent'>{this.state.fertilizerDetails.name}</h1>
            <img src={editIcon} className="absolute top-1 right-4 h-6 w-6" onClick={()=>this.showEditModal("Name","name",this.state.fertilizerDetails.name)} alt={"Edit"}/>
          </div>
          {/* Row 2 */}
          <div className='bg-slate-400 flex justify-center items-center overflow-hidden'>
            <img src={imageUrl} className="max-h-[400px] max-w-[400px]" alt={this.state.fertilizerDetails.name}/>
          </div>
          {/* Row 3 */}
          <div className='bg-slate-500 flex justify-left items-center pl-10 h-8 relative'>
            <div>Available : {this.state.fertilizerDetails.available}</div>
            <img src={editIcon} className="absolute top-1 right-4 h-6 w-6" onClick={()=>this.showEditModal("Availability","available",this.state.fertilizerDetails.available)} alt={"Edit"}/>
          </div>
          
          {/* Row 4 */}
          <div className='bg-slate-400 flex justify-left items-center pl-10 h-8 relative'> 
            Composition : {this.state.fertilizerDetails.composition}
            <img src={editIcon} className="absolute top-1 right-4 h-6 w-6" onClick={()=>this.showEditModal("Composition","composition",this.state.fertilizerDetails.composition)} alt={"Edit"}/>
          </div>
          {/* Row 5 */}
          <div className='justify-left items-center bg-slate-500 pl-10 h-auto relative'>
            <h2>Details:</h2>
            {this.state.fertilizerDetails.details}
            <img src={editIcon} className="absolute top-1 right-4 h-6 w-6" onClick={()=>this.showEditModal("Details","details",this.state.fertilizerDetails.details)} alt={"Edit"}/>
          </div>
          {/* Row 6 */}
          {/* <div className='' onClick={this.toggleShowPlantList}> */}
          <div className='overflow-scroll scrollbar-hide'>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th colSpan={3}>
                    <div className='pl-4 text-left text-xl md:text-2xl relative text-nowrap flex items-center'>
                      Plant List
                      <img src={addIcon} className="h-6 w-6 absolute right-4" alt="Add" onClick={this.showAddAppliedFertilizersModal} />
                    </div>
                  </th>
                </tr>
                <tr>
                  <th scope="col" className="py-3 px-6 text-center text-nowrap">
                    Plant ID
                  </th>
                  <th scope="col" className="py-3 px-6 text-center text-nowrap">
                    Plant Name
                  </th>
                  <th scope="col" className="py-3 px-6 text-center text-nowrap">
                    Image
                  </th>
                </tr>
              </thead>
              {this.state.showPlantList && (<tbody>
                {this.state.plantLists && this.state.plantLists.map((plant, index) => {
                  return (
                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-600">
                      <td className="py-4 px-6 text-center">
                        {plant.numberId}
                      </td>
                      <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white text-left">
                        {plant.plantName}
                      </th>
                      <td className="py-4 px-6 text-center">
                      <img src={"/api/plant/downloadImage/small/" + plant.profileImage} className="h-16 w-auto" alt={plant.plantName}/>
                      </td>
                    </tr>
                  )
                })}
              </tbody>)}
            </table>
          </div>
          <FertilizerEditModal isOpen={this.state.editModal} editValues={this.state.editValues} closeModal={this.closeEditModal}/>
          <AddAppliedFertilizerModal isOpen={this.state.addAppliedFertilizerModal} closeModal={this.closeAddAppliedFertilizerModal} fertilizerId={this.state.fertilizerId}/>
        </div>
    )
  }
}

export default FertilizerDetails