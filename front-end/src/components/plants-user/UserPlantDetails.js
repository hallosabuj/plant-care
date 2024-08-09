import axios from 'axios';
import React, { Component } from 'react'
import ImageSlider from './ImageSlider';
import editIcon from '../../assets/edit.png';
import addIcon from '../../assets/add.png';
import addPhotoIcon from '../../assets/add-photo.png';
import PlantEditModal from './Modals/PlantEditModal';
import AddNeededFertilizerModal from './Modals/Add_NeededFertilizerModal';
import AddAppliedFertilizerModal from './Modals/Add_AppliedFertilizerModal';
import AddImageModal from './Modals/Add_ImageModal';
import ShowImageModal from './Modals/Show_ImageModal';
import AddRepotting from './Modals/Add_Repotting';
import { useNavigate } from 'react-router-dom';

const MyPlantDetails = (props) =>{
  const navigate = useNavigate()
  return(<MyPlantDetailsClass navigate={navigate}/>)
}
class MyPlantDetailsClass extends Component {
  constructor(props) {
    super(props)

    this.state = {
      plantDetails: null,
      isPublic:null,
      neededFertilizers: null,
      appliedFertilizers: null,
      repottingList:null,
      editModal: false,
      editValues: null,
      addNeededFertilizerModal: false,
      addappliedFertilizerModal: false,
      addImageModal: false,
      showImageModal: false,
      imageUrlForShowModal:"",
      addRepottingModal:false
    }
  }
  async getDetails() {
    let plantId = window.location.href.split('/')[7]
    // Getting basic details
    const headers = {
      'Authorization': localStorage.getItem("token")
    };
    await axios.get("/api/user/plant/" + plantId, {headers}).then((response) => {
      this.setState({
        plantDetails: response.data
      })
      if (response.data !== null){
        if (response.data.public === 'true'){
          this.setState({
            isPublic: true
          })
        }else{
          this.setState({
            isPublic: false
          })
        }
      }else{
        this.setState({
          isPublic: false
        })
      }
    }).catch(function (error) {
      console.log(error);
      if(error.response.status === 401){
        localStorage.setItem("isSignedIn", false)
        localStorage.removeItem("token")
      }
    });
    // Getting needed fertilizers
    await axios.get("/api/plant-fertilizer/plantId/" + plantId, {headers}).then((response) => {
      this.setState({
        neededFertilizers: response.data
      })
      console.log(this.state.neededFertilizers)
    }).catch(function (error) {
      console.log(error);
    });
    // Getting applied fertilizers
    await axios.get("/api/applied-fertilizer/plantId/" + plantId, {headers}).then((response) => {
      this.setState({
        appliedFertilizers: response.data
      })
      console.log(this.state.appliedFertilizers)
    }).catch(function (error) {
      console.log(error);
    });
    // Getting repotting lists
    await axios.get("/api/repotting/" + plantId, {headers}).then((response) => {
      this.setState({
        repottingList: response.data
      })
    }).catch(function (error) {
      console.log(error);
    });
  }
  componentDidMount() {
    // If it's not logged in then redirect to home page
    if(!localStorage.getItem("isSignedIn")){
      this.props.navigate('/');
    }
    this.getDetails()
  }

  showEditModal = (displayName, fieldName, fieldValue) => {
    console.log(fieldName)
    let textTypes = "name soilType details"
    let dateTypes = "dob"

    let editValues = { plantId: this.state.plantDetails.plantId, displayName: null, fieldName: null, fieldValue: null, fieldType: null }
    editValues.displayName = displayName
    editValues.fieldName = fieldName
    editValues.fieldValue = fieldValue

    if (textTypes.includes(fieldName)) {
      editValues.fieldType = "text"
    } else if (dateTypes.includes(fieldName)) {
      editValues.fieldType = "date"
    }
    console.log(editValues)
    this.setState({
      editValues: editValues
    })
    this.setState({
      editModal: true
    })
  }
  closeEditModal = () => {
    this.setState({
      editModal: false,
      editValues: null
    })
    this.getDetails()
  }

  showAddNeededFertilizersModal = () => {
    this.setState({
      addNeededFertilizerModal: true
    })
  }
  closeAddNeededFertilizersModal = () => {
    this.setState({
      addNeededFertilizerModal: false
    })
    this.getDetails()
  }

  showAddAppliedFertilizersModal = () => {
    this.setState({
      addappliedFertilizerModal: true
    })
  }
  closeAddAppliedFertilizerModal = () => {
    this.setState({
      addappliedFertilizerModal: false
    })
    this.getDetails()
  }

  showAddImageModal = () => {
    this.setState({
      addImageModal: true
    })
  }
  closeAddImageModal = () => {
    this.setState({
      addImageModal: false
    })
    this.getDetails()
  }

  openShowImageModal = (imageUrl) => {
    console.log("Opening",imageUrl)
    this.setState({
      showImageModal: true,
      imageUrlForShowModal: imageUrl
    })
  }
  closeShowImageModal = () => {
    console.log("Closing")
    this.setState({
      showImageModal: false,
      imageUrlForShowModal: ""
    })
  }

  openAddRepottingModal = (imageUrl) => {
    console.log("Opening",imageUrl)
    this.setState({
      addRepottingModal: true
    })
  }
  closeAddRepottingModal = () => {
    console.log("Closing")
    this.setState({
      addRepottingModal: false
    })
    this.getDetails()
  }

  updatePublic = async () => {
    let url="/api/user/plant/update/public/"+this.state.plantDetails.plantId+"/"+!this.state.isPublic
    console.log(url)
    const headers = {
      'Authorization': localStorage.getItem("token")
    };
    await axios.post(url, {}, {headers}).then((response)=>{
      this.setState({
        isPublic: !this.state.isPublic
      })
    }).catch((error)=>{
        console.log(error)
        if(error.response.status === 401){
          localStorage.setItem("isSignedIn", false)
          localStorage.removeItem("token")
        }
    })
  }

  render() {
    return !(this.state.plantDetails) ? (<div>Details Not Found</div>) : (
      <div>
        <div className='grid gap-2 p-2 w-full'>
          {/* Row 1 */}
          <div className=' bg-slate-500 h-14 flex justify-center items-center text-2xl md:text-4xl relative'>
            <input type='checkbox' checked={this.state.isPublic} onChange={this.updatePublic} className='absolute left-4 top-auto h-4 w-4'/>
            <h1>{this.state.plantDetails.numberId}: {this.state.plantDetails.name}</h1>
            <img src={editIcon} className="absolute top-auto right-4 h-6 w-6" onClick={() => this.showEditModal("Name", "name", this.state.plantDetails.name)} alt={"Edit"} />
          </div>
          {/* Row 2 */}
          <div className=' bg-slate-400 flex justify-center items-center overflow-hidden relative'>
            {this.state.plantDetails && (<ImageSlider openShowImageModal={this.openShowImageModal} imageNames={this.state.plantDetails.imageNames} />)}
            <img src={addPhotoIcon} className="w-6 h-6 top-1 right-1 md:right-2 absolute" onClick={this.showAddImageModal} alt="PlantImage" />
          </div>
          {/* Row 3 */}
          <div className='flex justify-left items-center bg-slate-500 pl-10 h-8 relative'>
            <div>DOB: {this.state.plantDetails.dob} </div>
            <img src={editIcon} className="absolute top-auto right-4 h-6 w-6" onClick={() => this.showEditModal("Date of birth", "dob", this.state.plantDetails.dob)} alt={"Edit"} />
          </div>
          {/* Row 4 */}
          <div className=' bg-slate-400 flex justify-left items-center pl-10 h-8 relative'>
            Soil type : {this.state.plantDetails.soilType}
            <img src={editIcon} className="absolute top-auto right-4 h-6 w-6" onClick={() => this.showEditModal("Soil type", "soiltype", this.state.plantDetails.soilType)} alt={"Edit"} />
          </div>
          {/* Row 5 */}
          <div className='flex justify-left items-center pl-10 bg-slate-500 min-h-[32px] relative'>
            <div>
              <h2>About the plant</h2>
              {this.state.plantDetails.details}
            </div>
            <img src={editIcon} className="absolute top-auto right-4 h-6 w-6" onClick={() => this.showEditModal("About the plant", "details", this.state.plantDetails.details)} alt={"Edit"} />
          </div>
          {/* Row 6 */}
          <div className='overflow-scroll scrollbar-hide'>
            <table className="w-full text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th colSpan={3}>
                    <div className='pl-4 text-left text-xl md:text-2xl relative text-nowrap flex items-center'>
                      <div>Fertilizers needed for this plant</div>
                      <img src={addIcon} className="h-6 w-6 absolute right-4" alt={"Add"} onClick={this.showAddNeededFertilizersModal} />
                    </div>
                  </th>
                </tr>
                <tr>
                  <th scope="col" className="py-3 px-6 text-center text-nowrap">
                    Fertilizer Name
                  </th>
                  <th scope="col" className="py-3 px-6 text-center text-nowrap">
                    Apply Interval in days
                  </th>
                  <th scope="col" className="py-3 px-6 text-center text-nowrap">
                    Benefit
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.state.neededFertilizers && this.state.neededFertilizers.map((details, index) => {
                  console.log(details)
                  return (
                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-600">
                      <th scope="row" className="py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-left pl-4">
                        {details.fertilizerName}
                      </th>
                      <td className="py-4 px-6 text-left">
                        {details.applyInterval}
                      </td>
                      <td className="py-4 px-6 text-left">
                        {details.benefit}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          {/* Row 7 */}
          <div className='overflow-scroll scrollbar-hide'>
            <table className="w-full text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th colSpan={2} >
                    <div className='pl-4 text-left text-xl md:text-2xl relative text-nowrap flex items-center'>
                      Fertilizers applied
                      <img src={addIcon} className="h-6 w-6 absolute right-4" alt="Add" onClick={this.showAddAppliedFertilizersModal} />
                    </div>
                  </th>
                </tr>
                <tr>
                  <th scope="col" className="py-3 px-6 text-center text-nowrap">
                    Fertilizer Name
                  </th>
                  <th scope="col" className="py-3 px-6 text-center text-nowrap">
                    Applied date
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.state.appliedFertilizers && this.state.appliedFertilizers.map((details, index) => {
                  console.log(details)
                  return (
                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-600">
                      <th scope="row" className="py-4 pl-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-left">
                        {details.fertilizerName}
                      </th>
                      <td className="py-4 pl-4 text-left">
                        {details.appliedDate}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          {/* Row 8 */}
          <div className='overflow-scroll scrollbar-hide'>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th>
                    <div className='pl-4 text-left text-xl md:text-2xl relative text-nowrap flex items-center'>
                      Repotting Details
                      <img src={addIcon} className="h-6 w-6 absolute right-4" alt="Add" onClick={this.openAddRepottingModal} />
                    </div>
                  </th>
                </tr>
                <tr>
                  <th scope="col" className="py-3 px-6 text-center text-nowrap">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.state.repottingList && this.state.repottingList.map((repotting, index) => {
                  return (
                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-600">
                      <td className="py-4 pl-4 text-left">
                        {repotting.repottingDate}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
        <PlantEditModal isOpen={this.state.editModal} editValues={this.state.editValues} closeModal={this.closeEditModal} />
        <AddNeededFertilizerModal isOpen={this.state.addNeededFertilizerModal} plantId={this.state.plantDetails.plantId} closeModal={this.closeAddNeededFertilizersModal} />
        <AddAppliedFertilizerModal isOpen={this.state.addappliedFertilizerModal} plantId={this.state.plantDetails.plantId} closeModal={this.closeAddAppliedFertilizerModal} />
        <AddImageModal isOpen={this.state.addImageModal} plantId={this.state.plantDetails.plantId} closeModal={this.closeAddImageModal} />
        <ShowImageModal isOpen={this.state.showImageModal} imageUrl={this.state.imageUrlForShowModal} plantId={this.state.plantDetails.plantId} plantName={this.state.plantDetails.name} closeModal={this.closeShowImageModal} />
        <AddRepotting isOpen={this.state.addRepottingModal} plantId={this.state.plantDetails.plantId} closeModal={this.closeAddRepottingModal} />
      </div>
    )
  }
}

export default MyPlantDetails