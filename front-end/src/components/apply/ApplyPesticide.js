import React, { Component } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const ApplyPesticide = (props) =>{
  const navigate = useNavigate()
  return (<ApplyPesticideClass navigate={navigate}/>)
}

class ApplyPesticideClass extends Component {
  constructor(props) {
    super(props)

    let newDate = new Date()
    let date = newDate.getDate()
    let month = newDate.getMonth() + 1
    let year = newDate.getFullYear()
    let currentDate = `${year}-${month < 10 ? `0${month}` : `${month}`}-${date < 10 ? `0${date}` : `${date}`}`

    this.state = {
      pesticides: null,
      appliedPesticideId: "",
      plants: null,
      applieddate: currentDate
    }
  }
  getPesticides = async () => {
    const headers = {
      'Authorization': localStorage.getItem("token")
    };
    await axios.get("/api/user/pesticide", {headers}).then((response) => {
      this.setState({
        pesticides: response.data
      })
    }).catch(function (error) {
      console.log(error);
      if(error.response.status === 401){
        localStorage.setItem("isSignedIn", false)
        localStorage.removeItem("token")
      }
    });
  }
  getPlants = async () => {
    const headers = {
      'Authorization': localStorage.getItem("token")
    };
    axios.get("/api/user/plants/pesticide/"+this.state.appliedPesticideId, {headers}).then((response) => {
      console.log(response)
      let tempPlants = response.data.map(plant => { return { ...plant, isChecked: false } })
      this.setState({
        plants: tempPlants
      })
    }).catch(function (error){
      if(error.response.status === 401){
        localStorage.setItem("isSignedIn", false)
        localStorage.removeItem("token")
      }
    })
  }
  componentDidMount() {
    // If it's not logged in then redirect to home page
    if(!(localStorage.getItem("isSignedIn")==='true')){
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
  applieddateChangeHandler = (event) => {
    this.setState({
      applieddate: event.target.value
    }, () => {
      console.log(this.state)
    })
  }
  saveChanges = () => {
    let jsonBody = []

    this.state.plants.map((plant) => {
      if (plant.isChecked === true) {
        let tempPlant = { pesticideId: this.state.appliedPesticideId, plantId: plant.plantId, appliedDate: this.state.applieddate }
        jsonBody = [...jsonBody, tempPlant]
      }
    })
    console.log("body::",jsonBody)
    if (jsonBody.length === 0) {
      alert("Select at least one plant to save")
    } else {
      const headers = {
        'Authorization': localStorage.getItem("token")
      };
      axios.post("/api/user/applied-pesticide", jsonBody, {headers}).then((response) => {
        alert("Changes saved")
        this.getPlants()
      }).catch((error) => {
        console.log(error)
        if(error.response.status === 401){
          localStorage.setItem("isSignedIn", false)
          localStorage.removeItem("token")
        }
      })
    }
  }
  render() {
    return (
      <div>
        {/* Section for pesticide selection */}
        <div className='grid md:grid-cols-2 grid-cols-1 mt-2'>
          <div className='flex md:pl-20 pl-8 justify-start items-center'>
            <select onChange={this.onPesticideChangeHandler} className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              <option value="">Select Pesticide</option>
              {this.state.pesticides && this.state.pesticides.map((pesticide, index) => {
                return (
                  <option value={pesticide.pesticideId} key={pesticide.pesticideId}>{pesticide.name}</option>
                )
              })}
            </select>
          </div>
          <div className='flex md:pr-20 pl-6 md:justify-end justify-start items-center'>
            {this.state.plants &&
              <input value={this.state.applieddate} onChange={this.applieddateChangeHandler}
                className="shadow appearance-none border border-red-500 rounded w-40 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mx-2"
                type="date" />
            }

            {this.state.plants && <button
              className="btn-grad m-[10px] py-[10px] px-[45px] text-center uppercase transition-all duration-500 text-white rounded-[10px] block"
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
                              {plant.numberId}: {plant.plantName}
                            </td>
                            <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              <img src={"/api/plant/downloadImage/small/" + plant.profileImage} className="h-30 w-auto" alt={plant.plantName}/>
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