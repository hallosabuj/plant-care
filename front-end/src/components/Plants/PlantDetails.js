import axios from 'axios';
import React, { Component } from 'react'
import ImageSlider from './ImageSlider';

class PlantDetails extends Component {
  constructor(props) {
    super(props)

    this.state = {
      plantDetails: null,
      neededFertilizers: null,
      appliedFertilizers: null
    }
  }
  async getDetails() {
    let plantId = window.location.href.split('/')[4]
    // Getting basic details
    await axios.get("/plant/" + plantId).then((response) => {
      this.setState({
        plantDetails: response.data
      })
    }).catch(function (error) {
      console.log(error);
    });
    // Getting needed fertilizers
    await axios.get("/plant-fertilizer/plantId/" + plantId).then((response) => {
      this.setState({
        neededFertilizers: response.data
      })
      console.log(this.state.neededFertilizers)
    }).catch(function (error) {
      console.log(error);
    });
    // Getting applied fertilizers
    await axios.get("/applied-fertilizer/plantId/" + plantId).then((response) => {
      this.setState({
        appliedFertilizers: response.data
      })
      console.log(this.state.appliedFertilizers)
    }).catch(function (error) {
      console.log(error);
    });
  }
  componentDidMount() {
    this.getDetails()
  }
  render() {
    let plantId = window.location.href.split('/')[4]
    return !(this.state.plantDetails) ? (<div>Details Not Found</div>) : (
      <div>
        <div className='grid grid-cols-3 gap-2 p-2'>
          {/* Row 1 */}
          <div className=' col-span-3 bg-slate-500 h-14 flex justify-center items-center text-4xl'><h1>{this.state.plantDetails.name}</h1></div>
          {/* Row 2 */}
          <div className=' bg-slate-400 flex justify-left items-center pl-2'>Watering : true/false</div>
          <div className=' col-span-2 row-span-3 bg-slate-400 flex float-left overflow-hidden'>
            {this.state.plantDetails && (<ImageSlider imageNames={this.state.plantDetails.imageNames} />)}
          </div>
          {/* Row 3 */}
          <div className=' bg-slate-500 flex justify-left items-center pl-2'> DOB: {this.state.plantDetails.dob}</div>
          {/* Row 4 */}
          <div className=' bg-slate-400 flex justify-left items-center pl-2'>Soil type : {this.state.plantDetails.soilType}</div>
          {/* Row 5 */}
          <div className='justify-left items-center pl-2 col-span-3 bg-slate-500 h-16'>
            <h2>About the plant</h2>
            {this.state.plantDetails.details}
          </div>
          {/* Row 6 */}
          <div className=' col-span-3'>
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th colspan="3" className=' text-center text-2xl'>Fertilizers needed for this plant</th>
                </tr>
                <tr>
                  <th scope="col" class="py-3 px-6">
                    Fertilizer Name
                  </th>
                  <th scope="col" class="py-3 px-6">
                    Apply Interval in days
                  </th>
                  <th scope="col" class="py-3 px-6">
                    Benefit
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.state.neededFertilizers && this.state.neededFertilizers.map((details, index) => {
                  console.log(details)
                  return (
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-600">
                      <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {details.fertilizerName}
                      </th>
                      <td class="py-4 px-6">
                        {details.benefit}
                      </td>
                      <td class="py-4 px-6">
                        {details.applyInterval}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          {/* Row 7 */}
          <div className=' col-span-3'>
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th colspan="2" className=' text-center text-2xl'>Fertilizers applied</th>
                </tr>
                <tr>
                  <th scope="col" class="py-3 px-6">
                    Fertilizer Name
                  </th>
                  <th scope="col" class="py-3 px-6">
                    Applied date
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.state.appliedFertilizers && this.state.appliedFertilizers.map((details, index) => {
                  console.log(details)
                  return (
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-600">
                      <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {details.fertilizerName}
                      </th>
                      <td class="py-4 px-6">
                        {details.appliedDate}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

export default PlantDetails