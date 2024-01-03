import React, { Component } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const ApplyPesticide = (props) =>{
  const navigate = useNavigate()
  return (<ApplyPesticideClass navigate={navigate} isSignedIn={props.isSignedIn}/>)
}

class ApplyPesticideClass extends Component {
  constructor(props) {
    super(props)

    this.state = {
      pesticides: null,
      appliedPesticideId: "",
      plants: null
    }
  }
  getPesticides = async () => {
    await axios.get("/api/pesticide").then((response) => {
      this.setState({
        pesticides: response.data
      })
    }).catch(function (error) {
      console.log(error);
    });
  }
  getPlants = async () => {
    axios.get("/api/plants/pesticide/"+this.state.appliedPesticideId).then((response) => {
      console.log(response)
      let tempPlants = response.data.map(plant => { return { ...plant, isChecked: false } })
      this.setState({
        plants: tempPlants
      })
    })
  }
  componentDidMount() {
    // If it's not logged in then redirect to home page
    if(!this.props.isSignedIn){
      this.props.navigate('/');
    }
    this.getPesticides()
  }
  onPesticideChangeHandler = (event) => {
    if (event.target.value===""){
      this.setState({
        plants:null
      })
      return
    }
    this.setState({
      appliedPesticideId: event.target.value
    }, () => {
      this.getPlants()
    })
  }
  handleChange = (event) => {
    const { name, checked } = event.target
    if (name === "allSelect") {
      let tempPlants = this.state.plants.map(plant => { return { ...plant, isChecked: checked } })
      this.setState({
        plants: tempPlants
      })
    } else {
      let tempPlants = this.state.plants.map(plant => plant.plantId === name ? { ...plant, isChecked: checked } : plant)
      this.setState({
        plants: tempPlants
      })
    }
  }
  saveChanges = () => {
    let jsonBody = []
    let newDate = new Date()
    let date = newDate.getDate()
    let month = newDate.getMonth() + 1
    let year = newDate.getFullYear()
    let currentDate = `${year}-${month < 10 ? `0${month}` : `${month}`}-${date < 10 ? `0${date}` : `${date}`}`

    this.state.plants.map((plant) => {
      if (plant.isChecked === true) {
        let tempPlant = { pesticideId: this.state.appliedPesticideId, plantId: plant.plantId, appliedDate: currentDate }
        jsonBody = [...jsonBody, tempPlant]
      }
    })
    console.log("body::",jsonBody)
    if (jsonBody.length === 0) {
      alert("Select at least one plant to save")
    } else {
      axios.post("/api/applied-pesticide", jsonBody).then((response) => {
        alert("Changes saved")
        this.getPlants()
      }).catch((error) => {
        console.log(error)
      })
    }
  }
  render() {
    return (
      <div>
        {/* Section for pesticide selection */}
        <div className='grid grid-cols-3 bg-cyan-400'>
          <div className='flex p-2 justify-center items-center'>
            <select onChange={this.onPesticideChangeHandler} className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              <option value="">Select Pesticide</option>
              {this.state.pesticides && this.state.pesticides.map((pesticide, index) => {
                return (
                  <option value={pesticide.pesticideId} key={pesticide.pesticideId}>{pesticide.name}</option>
                )
              })}
            </select>
          </div>
          <div></div>
          <div className='flex justify-center items-center'>
            {this.state.plants && <button
              className="bg-emerald-700 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={this.saveChanges}
            >
              Save
            </button>}
          </div>
        </div>
        {/* Section for input */}
        {this.state.plants && <div>
          <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <div className="overflow-x-auto">
                  <table className="min-w-full text-gray-500">
                    <thead className="border-b text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th colSpan={6} className=' text-center text-2xl relative'>
                          Plants
                        </th>
                      </tr>
                      <tr>
                        <th scope="col" className="text-sm font-medium px-6 py-4 text-left">
                          <input type="checkbox" name='allSelect' checked={this.state.plants.filter((plant) => plant?.isChecked !== true).length < 1} onChange={this.handleChange} className="h-4 w-4 focus:ring-green-500 dark:focus:ring-green-600 focus:ring-2"></input>
                        </th>
                        <th scope="col" className="text-sm font-medium px-6 py-4 text-left whitespace-nowrap">
                          Plant Name
                        </th>
                        <th scope="col" className="text-sm font-medium px-6 py-4 text-left whitespace-nowrap">
                          Image
                        </th>
                        <th scope="col" className="text-sm font-medium px-6 py-4 text-left whitespace-nowrap">
                          Last Applied Date
                        </th>
                        <th scope="col" className="text-sm font-medium px-6 py-4 text-left whitespace-nowrap">
                          # Days from last fertilization
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.plants.map((plant, index) => {
                        return (
                          <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-900">
                            <td className='px-6 py-4'>
                              <input type="checkbox" name={plant.plantId} checked={plant.isChecked ? plant.isChecked : false} onChange={this.handleChange} className="w-4 h-4 focus:ring-green-500 dark:focus:ring-green-600 focus:ring-2"></input>
                            </td>
                            <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              {plant.numberId}: {plant.name}
                            </td>
                            <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              <img src={"/api/plant/downloadImage/small/" + plant.profileImage} className="h-16 w-auto" alt={plant.plantName}/>
                            </td>
                            <td className="py-4 px-6">
                              {plant.lastAppliedDate}
                            </td>
                            <td className="py-4 px-6">
                              {plant.numberOfDaysElapsed}
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>}
      </div>
    )
  }
}

export default ApplyPesticide