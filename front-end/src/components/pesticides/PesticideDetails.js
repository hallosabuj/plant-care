import axios from 'axios'
import React, { Component } from 'react'
import editIcon from '../../assets/edit.png';
import PesticideEditModal from './Modals/PesticideEditModal';

export class PesticideDetails extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
        pesticideDetails:null,
        editModal:false,
        editValues:null
    }
  }
  async getDetails(){
    let pesticideId = window.location.href.split('/')[6]
    // Getting basic details
    await axios.get("/api/pesticide/" + pesticideId).then((response) => {
      this.setState({
        pesticideDetails: response.data
      })
      console.log(response.data)
    }).catch(function (error) {
      console.log(error);
    });
  }
  componentDidMount(){
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
      imageUrl = "/api/pesticide/downloadImage/"
    }else{
      imageUrl = "/api/pesticide/downloadImage/" + this.state.pesticideDetails.profileImage
    }
    console.log(imageUrl)
    return !(this.state.pesticideDetails)?(<div>Details not found</div>):(
      <div className='grid gap-2 p-2'>
          {/* Row 1 */}
          <div className='bg-slate-500 h-14 flex justify-center items-center text-4xl relative'>
            <h1>{this.state.pesticideDetails.name}</h1>
            <img src={editIcon} className="absolute top-1 right-4 h-6 w-6" onClick={()=>this.showEditModal("Name","name",this.state.pesticideDetails.name)} alt={"Edit"}/>
          </div>
          {/* Row 2 */}
          <div className='bg-slate-400 flex justify-center items-center overflow-hidden'>
            <img src={imageUrl} className=" max-h-64" alt={this.state.pesticideDetails.name}/>
          </div>
          {/* Row 2 */}
          <div className='bg-slate-400 flex justify-left items-center pl-10 h-8 relative'>
            <div>Available : {this.state.pesticideDetails.available}</div>
            <img src={editIcon} className="absolute top-1 right-4 h-6 w-6" onClick={()=>this.showEditModal("Availability","available",this.state.pesticideDetails.available)} alt={"Edit"}/>
          </div>
          
          {/* Row 3 */}
          <div className='bg-slate-500 flex justify-left items-center pl-10 h-8 relative'> 
            Composition : {this.state.pesticideDetails.composition}
            <img src={editIcon} className="absolute top-1 right-4 h-6 w-6" onClick={()=>this.showEditModal("Composition","composition",this.state.pesticideDetails.composition)} alt={"Edit"}/>
          </div>
          {/* Row 4 */}
          <div className='justify-left items-center bg-slate-500 pl-10 relative'>
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