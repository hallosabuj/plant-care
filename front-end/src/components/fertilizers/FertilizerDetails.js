import axios from 'axios'
import React, { Component } from 'react'
import editIcon from '../../assets/edit.png';
import FertilizerEditModal from './Modals/FertilizerEditModal';
import { useNavigate } from 'react-router-dom';

const FertilizerDetails = (props) =>{
  const navigate = useNavigate()
  return (<FertilizerDetailsClass navigate={navigate} isSignedIn={props.isSignedIn}/>)
}

export class FertilizerDetailsClass extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
        fertilizerDetails:null,
        editModal:false,
        editValues:null
    }
  }
  async getDetails(){
    let fertilizerId = window.location.href.split('/')[7]
    // Getting basic details
    await axios.get("/api/user/fertilizer/" + fertilizerId).then((response) => {
      this.setState({
        fertilizerDetails: response.data
      })
      console.log(response.data)
    }).catch(function (error) {
      console.log(error);
    });
  }
  componentDidMount(){
    // If it's not logged in then redirect to home page
    if(!this.props.isSignedIn){
      this.props.navigate('/');
    }
    this.getDetails()
  }
  showEditModal=(displayName,fieldName,fieldValue)=>{
    console.log(fieldName)
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
    if (this.state.fertilizerDetails==null){
      imageUrl = "/api/user/fertilizer/downloadImage/"
    }else{
      imageUrl = "/api/user/fertilizer/downloadImage/" + this.state.fertilizerDetails.profileImage
    }
    console.log(imageUrl)
    return !(this.state.fertilizerDetails)?(<div>Details not found</div>):(
      <div className='grid gap-2 p-2'>
          {/* Row 1 */}
          <div className='bg-slate-500 h-14 flex justify-center items-center text-4xl relative'>
            <h1>{this.state.fertilizerDetails.name}</h1>
            <img src={editIcon} className="absolute top-1 right-4 h-6 w-6" onClick={()=>this.showEditModal("Name","name",this.state.fertilizerDetails.name)} alt={"Edit"}/>
          </div>
          {/* Row 2 */}
          <div className='bg-slate-400 flex justify-center items-center overflow-hidden'>
            <img src={imageUrl} className=" max-h-64" alt={this.state.fertilizerDetails.name}/>
          </div>
          {/* Row 2 */}
          <div className='bg-slate-400 flex justify-left items-center pl-10 h-8 relative'>
            <div>Available : {this.state.fertilizerDetails.available}</div>
            <img src={editIcon} className="absolute top-1 right-4 h-6 w-6" onClick={()=>this.showEditModal("Availability","available",this.state.fertilizerDetails.available)} alt={"Edit"}/>
          </div>
          
          {/* Row 3 */}
          <div className='bg-slate-500 flex justify-left items-center pl-10 h-8 relative'> 
            Composition : {this.state.fertilizerDetails.composition}
            <img src={editIcon} className="absolute top-1 right-4 h-6 w-6" onClick={()=>this.showEditModal("Composition","composition",this.state.fertilizerDetails.composition)} alt={"Edit"}/>
          </div>
          {/* Row 4 */}
          <div className='justify-left items-center bg-slate-500 pl-10 relative'>
            <h2>Details:</h2>
            {this.state.fertilizerDetails.details}
            <img src={editIcon} className="absolute top-1 right-4 h-6 w-6" onClick={()=>this.showEditModal("Details","details",this.state.fertilizerDetails.details)} alt={"Edit"}/>
          </div>
          <FertilizerEditModal isOpen={this.state.editModal} editValues={this.state.editValues} closeModal={this.closeEditModal}/>
        </div>
    )
  }
}

export default FertilizerDetails