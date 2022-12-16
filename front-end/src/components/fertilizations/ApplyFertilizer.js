import React, { Component } from 'react'
import axios from 'axios'

class ApplyFertilizer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      fertilizers: null,
      appliedFertilizerId:"",
      plants:null
    }
  }
  getFertilizers = async () => {
    let fertilizers = await axios.get("/api/fertilizer").then((response) => {
      console.log(response)
      this.setState({
        fertilizers: response.data
      })
    }).catch(function (error) {
      console.log(error);
    });
    console.log(fertilizers)
  }
  getPlantsForAFertilizer=(fertilizerId)=>{

  }
  componentDidMount() {
    this.getFertilizers()
  }
  onFertilizerChangeHandler=(event)=>{
    this.setState({
      appliedFertilizerId:event.target.value
    })
  }
  render() {
    return (
      <div>
        <div className='grid grid-cols-3 bg-cyan-400'>
          <div className='flex p-2 justify-center items-center'>
            <select onChange={this.onFertilizerChangeHandler} className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              <option>Select Fertilizer</option>
              {this.state.fertilizers && this.state.fertilizers.map((fertilizer, index) => {
                return (
                  <option value={fertilizer.fertilizerId} key={fertilizer.fertilizerId}>{fertilizer.name}</option>
                )
              })}
            </select>
          </div>
        </div>
        <div>
            
        </div>
      </div>
    )
  }
}

export default ApplyFertilizer