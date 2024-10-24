import axios from 'axios'
import React, { Component } from 'react'
import editIcon from '../../assets/edit.png';
import PesticideEditModal from './Modals/PesticideEditModal';
import { useNavigate } from 'react-router-dom';

const PesticideDetails = (props) =>{
  const navigate = useNavigate()
  return (<PesticideDetailsClass navigate={navigate}/>)
}

export class PesticideDetailsClass extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
        pesticideDetails:null,
        editModal:false,
        editValues:null
    }
  }
  async getDetails(){
    let pesticideId = window.location.href.split('/')[7]
    // Getting basic details
    const headers = {
      'Authorization': localStorage.getItem("token")
    };
    await axios.get("/api/user/pesticide/" + pesticideId, {headers}).then((response) => {
      this.setState({
        pesticideDetails: response.data
      })
      console.log(response.data)
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
    this.getDetails()
  }
  showEditModal=(displayName,fieldName,fieldValue)=>{
    console.log(fieldName)
    let textTypes="name composition details"

    let editValues={pesticideId:this.state.pesticideDetails.pesticideId,displayName:null,fieldName:null,fieldValue:null,fieldType:null,fieldValueOptionsIfAny:null}
    editValues.displayName=displayName
    editValues.fieldName=fieldName
    editValues.fieldValue=fieldValue

    if(fieldName==="available"){
      editValues.fieldType="radio"
      editValues.fieldValueOptionsIfAny={YES:"YES",NO:"NO"}
    }else if(textTypes.includes(fieldName)){
      editValues.fieldType="text"
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
  render() {
    let imageUrl=""
    if (this.state.pesticideDetails==null){
      imageUrl = "/api/user/pesticide/downloadImage/"
    }else{
      imageUrl = "/api/user/pesticide/downloadImage/" + this.state.pesticideDetails.profileImage
    }
    console.log(imageUrl)
    return !(this.state.pesticideDetails)?(<div>Details not found</div>):(
      <div className='grid gap-2 p-2'>
          {/* Row 1 */}
          <div className='bg-white bg-opacity-20 h-14 flex justify-center items-center text-4xl relative'>
            <h1 className='bg-gradient-to-r from-[#102a14] to-[#7d0b65] bg-clip-text text-transparent'>{this.state.pesticideDetails.name}</h1>
            <img src={editIcon} className="absolute top-1 right-4 h-6 w-6" onClick={()=>this.showEditModal("Name","name",this.state.pesticideDetails.name)} alt={"Edit"}/>
          </div>
          {/* Row 2 */}
          <div className='bg-white bg-opacity-20 flex justify-center items-center overflow-hidden'>
            <img src={imageUrl} className="max-h-[400px] max-w-[400px]" alt={this.state.pesticideDetails.name}/>
          </div>
          {/* Row 2 */}
          <div className='bg-white bg-opacity-20 flex justify-left items-center pl-10 min-h-8 h-auto relative'>
            <div>Available : {this.state.pesticideDetails.available}</div>
            <img src={editIcon} className="absolute top-1 right-4 h-6 w-6" onClick={()=>this.showEditModal("Availability","available",this.state.pesticideDetails.available)} alt={"Edit"}/>
          </div>
          
          {/* Row 3 */}
          <div className='bg-white bg-opacity-20 flex justify-left items-center pl-10 min-h-8 h-auto relative'> 
            Composition : {this.state.pesticideDetails.composition}
            <img src={editIcon} className="absolute top-1 right-4 h-6 w-6" onClick={()=>this.showEditModal("Composition","composition",this.state.pesticideDetails.composition)} alt={"Edit"}/>
          </div>
          {/* Row 4 */}
          <div className='bg-white bg-opacity-20 justify-left items-center pl-10 min-h-8 h-auto relative'>
            <h2>Details:</h2>
            {this.state.pesticideDetails.details}
            <img src={editIcon} className="absolute top-1 right-4 h-6 w-6" onClick={()=>this.showEditModal("Details","details",this.state.pesticideDetails.details)} alt={"Edit"}/>
          </div>
          <PesticideEditModal isOpen={this.state.editModal} editValues={this.state.editValues} closeModal={this.closeEditModal}/>
        </div>
    )
  }
}

export default PesticideDetails