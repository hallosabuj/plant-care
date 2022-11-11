import axios from 'axios'
import React, { Component } from 'react'

export default class AddFertilizer extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       name:"",
       details:"",
       composition:""
    }
  }
  nameOnChange=(event)=>{
    this.setState({
      name:event.target.value
    })
  }
  detailsOnChange=(event)=>{
    this.setState({
      details:event.target.value
    })
  }
  compositionOnChange=(event)=>{
    this.setState({
      composition:event.target.value
    })
  }
  handleSubmit =async (event)=>{
    let formData = new FormData()
    formData.append("name",this.state.name)
    formData.append("details",this.state.details)
    formData.append("composition",this.state.composition)
    console.log(this.state)
    let res=await axios.post("http://localhost:8080/fertilizer",formData)
    console.log(res)
    event.preventDefault()
  }
  render() {
    return (
      <div>
        <label>Fertilizer</label>
        <input name="fertilizerName" value={this.state.name} onChange={this.nameOnChange} type="text"/>
        <label>Details</label>
        <input name="details" value={this.state.details} onChange={this.detailsOnChange} type="textarea"/>
        <label>Composition</label>
        <input name="composition" value={this.state.composition} onChange={this.compositionOnChange} type="text"/>
        <button onClick={this.handleSubmit}>Submit</button>
      </div>
    )
  }
}
