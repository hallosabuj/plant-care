import axios from 'axios';
import React, { Component } from 'react'
import ImageSlider from './ImageSlider';
import editIcon from '../../edit.png';
import addIcon from '../../add.png';
import addPhotoIcon from '../../add-photo.png';
import PlantEditModal from './Modals/PlantEditModal';
import AddNeededFertilizerModal from './Modals/Add_NeededFertilizerModal';
import AddAppliedFertilizerModal from './Modals/Add_AppliedFertilizerModal';
import AddImageModal from './Modals/Add_ImageModal';

class PlantDetails extends Component {
  constructor(props) {
    super(props)

    this.state = {
      plantDetails: null,
      neededFertilizers: null,
      appliedFertilizers: null,
      editModal:false,
      editValues:null,
      addNeededFertilizerModal:false,
      addappliedFertilizerModal:false,
      addImageModal:false
    }
  }
  async getDetails() {
    let plantId = window.location.href.split('/')[6]
    // Getting basic details
    await axios.get("/api/plant/" + plantId).then((response) => {
      this.setState({
        plantDetails: response.data
      })
      console.log(response)
    }).catch(function (error) {
      console.log(error);
    });
    // Getting needed fertilizers
    await axios.get("/api/plant-fertilizer/plantId/" + plantId).then((response) => {
      this.setState({
        neededFertilizers: response.data
      })
      console.log(this.state.neededFertilizers)
    }).catch(function (error) {
      console.log(error);
    });
    // Getting applied fertilizers
    await axios.get("/api/applied-fertilizer/plantId/" + plantId).then((response) => {
      this.setState({
        appliedFertilizers: response.data
      })
      console.log(this.state.appliedFertilizers)
    }).catch(function (error) {
      console.log(error);
    });
  }
  componentDidMount() {
    this.getDetails()
  }

  showEditModal=(displayName,fieldName,fieldValue)=>{
    console.log(fieldName)
    let textTypes="name soilType details"
    let dateTypes="dob"

    let editValues={plantId:this.state.plantDetails.plantId,displayName:null,fieldName:null,fieldValue:null,fieldType:null}
    editValues.displayName=displayName
    editValues.fieldName=fieldName
    editValues.fieldValue=fieldValue

    if(textTypes.includes(fieldName)){
      editValues.fieldType="text"
    }else if(dateTypes.includes(fieldName)){
      editValues.fieldType="date"
    }
    console.log(editValues)
    this.setState({
      editValues:editValues
    })
    this.setState({
      editModal:true
    })
  }
  closeEditModal=()=>{
    this.setState({
      editModal:false,
      editValues:null
    })
    this.getDetails()
  }

  showAddNeededFertilizersModal=()=>{
    this.setState({
      addNeededFertilizerModal:true
    })
  }
  closeAddNeededFertilizersModal=()=>{
    this.setState({
      addNeededFertilizerModal:false
    })
    this.getDetails()
  }

  showAddAppliedFertilizersModal=()=>{
    this.setState({
      addappliedFertilizerModal:true
    })
  }
  closeAddAppliedFertilizerModal=()=>{
    this.setState({
      addappliedFertilizerModal:false
    })
    this.getDetails()
  }

  showAddImageModal=()=>{
    this.setState({
      addImageModal:true
    })
  }
  closeAddImageModal=()=>{
    this.setState({
      addImageModal:false
    })
    this.getDetails()
  }

  render() {
    return !(this.state.plantDetails) ? (<div>Details Not Found</div>) : (
      <div>
        <div className='grid gap-2 p-2'>
          {/* Row 1 */}
          <div className=' bg-slate-500 h-14 flex justify-center items-center text-4xl relative'>
            <h1>{this.state.plantDetails.name}</h1>
            <img src={editIcon} className="absolute top-1 right-4 h-6 w-6" onClick={()=>this.showEditModal("Name","name",this.state.plantDetails.name)} alt={"Edit"}/>
          </div>
          {/* Row 2 */}
          <div className=' bg-slate-400 flex justify-center items-center overflow-hidden relative'>
            {this.state.plantDetails && (<ImageSlider imageNames={this.state.plantDetails.imageNames} />)}
            <img src={addPhotoIcon} className="w-6 h-6 top-1 right-4 absolute" onClick={this.showAddImageModal} alt="PlantImage"/>
          </div>
          {/* Row 3 */}
          <div className=' bg-slate-400 flex justify-left items-center pl-10 h-8'>
            Watering : true/false
          </div>
          {/* Row 3 */}
          <div className='flex justify-left items-center bg-slate-500 pl-10 h-8 relative'> 
            <div>DOB: {this.state.plantDetails.dob} </div>
            <img src={editIcon} className="absolute top-1 right-4 h-6 w-6" onClick={()=>this.showEditModal("Date of birth","dob",this.state.plantDetails.dob)} alt={"Edit"}/>
          </div>
          {/* Row 4 */}
          <div className=' bg-slate-400 flex justify-left items-center pl-10 h-8 relative'>
            Soil type : {this.state.plantDetails.soilType}
            <img src={editIcon} className="absolute top-1 right-4 h-6 w-6" onClick={()=>this.showEditModal("Soil type","soiltype",this.state.plantDetails.soilType)} alt={"Edit"}/>
          </div>
          {/* Row 5 */}
          <div className='flex justify-left items-center pl-10 bg-slate-500 min-h-[32px] relative'>
            <div>
              <h2>About the plant</h2>
              {this.state.plantDetails.details}
            </div>
            <img src={editIcon} className="absolute top-1 right-4 h-6 w-6" onClick={()=>this.showEditModal("About the plant","details",this.state.plantDetails.details)} alt={"Edit"}/>
          </div>
          {/* Row 6 */}
          <div className=''>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th colSpan={3} className=' text-center text-2xl relative'>
                    Fertilizers needed for this plant
                    <img src={addIcon} className="h-6 w-6 absolute top-1 right-4" alt={"Add"} onClick={this.showAddNeededFertilizersModal}/>
                  </th>
                </tr>
                <tr>
                  <th scope="col" className="py-3 px-6 text-center">
                    Fertilizer Name
                  </th>
                  <th scope="col" className="py-3 px-6 text-center">
                    Apply Interval in days
                  </th>
                  <th scope="col" className="py-3 px-6 text-center">
                    Benefit
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.state.neededFertilizers && this.state.neededFertilizers.map((details, index) => {
                  console.log(details)
                  return (
                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-600">
                      <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                        {details.fertilizerName}
                      </th>
                      <td className="py-4 px-6 text-center">
                        {details.applyInterval}
                      </td>
                      <td className="py-4 px-6 text-center">
                        {details.benefit}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          {/* Row 7 */}
          <div className=''>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th colSpan={2} className=' text-center text-2xl relative'>
                    Fertilizers applied
                    <img src={addIcon} className="h-6 w-6 absolute top-1 right-4" alt="Add" onClick={this.showAddAppliedFertilizersModal}/>
                  </th>
                </tr>
                <tr>
                  <th scope="col" className="py-3 px-6 text-center">
                    Fertilizer Name
                  </th>
                  <th scope="col" className="py-3 px-6 text-center">
                    Applied date
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.state.appliedFertilizers && this.state.appliedFertilizers.map((details, index) => {
                  console.log(details)
                  return (
                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-600">
                      <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                        {details.fertilizerName}
                      </th>
                      <td className="py-4 px-6 text-center">
                        {details.appliedDate}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
        <PlantEditModal isOpen={this.state.editModal} editValues={this.state.editValues} closeModal={this.closeEditModal}/>
        <AddNeededFertilizerModal isOpen={this.state.addNeededFertilizerModal} plantId={this.state.plantDetails.plantId} closeModal={this.closeAddNeededFertilizersModal}/>
        <AddAppliedFertilizerModal isOpen={this.state.addappliedFertilizerModal} plantId={this.state.plantDetails.plantId} closeModal={this.closeAddAppliedFertilizerModal}/>
        <AddImageModal isOpen={this.state.addImageModal} plantId={this.state.plantDetails.plantId} closeModal={this.closeAddImageModal}/>
      </div>
    )
  }
}

export default PlantDetails