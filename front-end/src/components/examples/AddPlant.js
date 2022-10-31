import React, { Component } from 'react'
import axios from 'axios'

class AddPlant extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       name:"",
       dob:"",
       image:null
    }
  }
  handleSubmit=async (event)=>{
    console.log(this.state)
    console.log("Handling form submit")
    const formData = new FormData()
    formData.append("name",this.state.name)
    formData.append("dob",this.state.dob)
    formData.append("image",this.state.image)
    let res = await axios.post("http://localhost:8080/plant", formData)
    console.log(res)
    event.preventDefault()
  }
  nameChangeHandler = (event) =>{
    this.setState({
      name:event.target.value
    },()=>{
      console.log(this.state)
    })
  }
  dobChangeHandler = (event) =>{
    this.setState({
      dob:event.target.value
    },()=>{
      console.log(this.state)
    })
  }
  imageOnChangeHandler = (event) =>{
    console.log(event.target.files)
    this.setState({
      image:event.target.files[0]
    })
  }
  render() {
    let image=this.state.image
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Plant Name:<input value={this.state.name} onChange={this.nameChangeHandler} type="text" name="name" />
        </label>
        <label>
          DOB:<input value={this.state.dob} onChange={this.dobChangeHandler} type="date" name="image" />
        </label>
        <label>
          Image:<input onChange={this.imageOnChangeHandler} type="file" name="image" />
        </label>
        {image && (<img src={URL.createObjectURL(image)} style={{height:'100px',width:'auto'}}/>)}
        <input type="submit" value="Submit" />
    </form>
    )
  }
}

export default AddPlant