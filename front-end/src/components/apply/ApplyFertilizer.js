import React, { Component } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const ApplyFertilizer = (props) => {
  const navigate = useNavigate()
  return (<ApplyFertilizerClass navigate={navigate}/>)
}

class ApplyFertilizerClass extends Component {
  constructor(props) {
    let newDate = new Date()
    let date = newDate.getDate()
    let month = newDate.getMonth() + 1
    let year = newDate.getFullYear()
    let currentDate = `${year}-${month < 10 ? `0${month}` : `${month}`}-${date < 10 ? `0${date}` : `${date}`}`

    super(props)

    this.state = {
      fertilizers: null,
      appliedFertilizerId: "",
      plants: null,
      applieddate: currentDate
    }
  }
  getFertilizers = async () => {
    const headers = {
      'Authorization': localStorage.getItem("token")
    };
    await axios.get("/api/user/fertilizer", {headers}).then((response) => {
      this.setState({
        fertilizers: response.data
      })
    }).catch(function (error) {
      if(error.response.status === 401){
        localStorage.setItem("isSignedIn", false)
        localStorage.removeItem("token")
      }
      console.log(error);
    });
  }
  getPlantsForAFertilizer = async () => {
    if (this.state.appliedFertilizerId !== "") {
      const headers = {
        'Authorization': localStorage.getItem("token")
      };
      axios.get("/api/user/plants/fertilizer/" + this.state.appliedFertilizerId, {headers}).then((response) => {
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
    } else {
      this.setState({
        plants: null
      })
    }
  }
  componentDidMount() {
    // If it's not logged in then redirect to home page
    if (!(localStorage.getItem("isSignedIn")==='true')) {
      this.props.navigate('/');
    }
    this.getFertilizers()
  }
  onFertilizerChangeHandler = (event) => {
    if (event.target.value === "") {
      this.setState({
        plants: null
      })
      return
    }
    this.setState({
      appliedFertilizerId: event.target.value
    }, () => {
      this.getPlantsForAFertilizer()
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
    console.log("prev:", this.state.applieddate)
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
        let tempPlant = { fertilizerId: this.state.appliedFertilizerId, plantId: plant.plantId, appliedDate: this.state.applieddate }
        jsonBody = [...jsonBody, tempPlant]
      }
    })
    console.log(jsonBody)
    if (jsonBody.length === 0) {
      alert("Select at least one plant to save")
    } else {
      const headers = {
        'Authorization': localStorage.getItem("token")
      };
      axios.post("/api/user/applied-fertilizer", jsonBody, {headers}).then((response) => {
        alert("Changes saved")
        this.getPlantsForAFertilizer()
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
        {/* Section for fertilizer selection */}
        <div className='grid grid-cols-3 bg-cyan-400'>
          <div className='flex p-2 justify-center items-center'>
            <select onChange={this.onFertilizerChangeHandler} className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              <option value="">Select Fertilizer</option>
              {this.state.fertilizers && this.state.fertilizers.map((fertilizer, index) => {
                return (
                  <option value={fertilizer.fertilizerId} key={fertilizer.fertilizerId}>{fertilizer.name}</option>
                )
              })}
            </select>
          </div>
          <div className='flex justify-center items-center'>

          </div>
          <div className='flex justify-center items-center'>
            {this.state.plants &&
              <input value={this.state.applieddate} onChange={this.applieddateChangeHandler}
                className="shadow appearance-none border border-red-500 rounded w-40 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mx-2"
                type="date" />
            }

            {this.state.plants && <button
              className="bg-emerald-700 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 mx-2"
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
                          Apply Interval
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
                              <img src={"/api/plant/downloadImage/small/" + plant.profileImage} className="h-16 w-auto" alt={plant.plantName} />
                            </td>
                            <td className="py-4 px-6">
                              {plant.lastAppliedDate}
                            </td>
                            <td className="py-4 px-6">
                              {plant.applyInterval}
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

export default ApplyFertilizer