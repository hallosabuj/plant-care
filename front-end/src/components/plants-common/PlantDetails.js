import axios from 'axios';
import React, { Component } from 'react'
import ImageSlider from './ImageSlider';
import ShowImageModal from './Modals/Show_ImageModal';

class PlantDetails extends Component {
  constructor(props) {
    super(props)

    this.state = {
      plantDetails: null,
      neededFertilizers: null,
      appliedFertilizers: null,
      repottingList:null,
      showImageModal: false,
      imageUrlForShowModal:""
    }
  }
  async getDetails() {
    let plantId = window.location.href.split('/')[6]
    // Getting basic details
    await axios.get("/api/plant/" + plantId).then((response) => {
      this.setState({
        plantDetails: response.data
      })
      console.log(response)
    }).catch(function (error) {
      console.log(error);
    });
    // Getting needed fertilizers
    await axios.get("/api/plant-fertilizer/plantId/" + plantId).then((response) => {
      this.setState({
        neededFertilizers: response.data
      })
      console.log(this.state.neededFertilizers)
    }).catch(function (error) {
      console.log(error);
    });
    // Getting applied fertilizers
    await axios.get("/api/applied-fertilizer/plantId/" + plantId).then((response) => {
      this.setState({
        appliedFertilizers: response.data
      })
      console.log(this.state.appliedFertilizers)
    }).catch(function (error) {
      console.log(error);
    });
    // Getting repotting lists
    await axios.get("/api/repotting/" + plantId).then((response) => {
      this.setState({
        repottingList: response.data
      })
    }).catch(function (error) {
      console.log(error);
    });
  }
  componentDidMount() {
    this.getDetails()
  }

  openShowImageModal = (imageUrl) => {
    console.log("Opening",imageUrl)
    this.setState({
      showImageModal: true,
      imageUrlForShowModal: imageUrl
    })
  }
  closeShowImageModal = () => {
    console.log("Closing")
    this.setState({
      showImageModal: false,
      imageUrlForShowModal: ""
    })
  }

  render() {
    return !(this.state.plantDetails) ? (<div>Details Not Found</div>) : (
      <div>
        <div className='grid gap-2 p-2 w-full'>
          {/* Row 1 */}
          <div className='bg-white bg-opacity-20 h-14 flex justify-center items-center text-2xl md:text-4xl relative'>
            <h1 className='bg-gradient-to-r from-[#102a14] to-[#7d0b65] bg-clip-text text-transparent'>{this.state.plantDetails.numberId}: {this.state.plantDetails.name}</h1>
          </div>
          {/* Row 2 */}
          <div className='bg-white bg-opacity-20 flex justify-center items-center overflow-hidden relative'>
            {this.state.plantDetails && (<ImageSlider openShowImageModal={this.openShowImageModal} imageNames={this.state.plantDetails.imageNames} />)}
          </div>
          {/* Row 3 */}
          <div className='bg-white bg-opacity-20 flex justify-left items-center pl-10 min-h-8 h-auto relative'>
            <div>DOB: {this.state.plantDetails.dob} </div>
          </div>
          {/* Row 4 */}
          <div className='bg-white bg-opacity-20 flex justify-left items-center pl-10 min-h-8 h-auto relative'>
            Soil type : {this.state.plantDetails.soilType}
          </div>
          {/* Row 5 */}
          <div className='bg-white bg-opacity-20 flex justify-left items-center pl-10 min-h-[32px] relative'>
            <div>
              <h2>About the plant</h2>
              {this.state.plantDetails.details}
            </div>
          </div>
          {/* Row 6 */}
          <div className='overflow-scroll scrollbar-hide'>
            <table className="w-full">
              <thead className="text-xs text-gray-700 uppercase bg-white bg-opacity-50">
                <tr>
                  <th colSpan={3}>
                    <div className='pl-4 text-left text-xl md:text-2xl relative text-nowrap flex items-center'>
                      Fertilizers needed for this plant
                    </div>
                  </th>
                </tr>
                <tr>
                  <th scope="col" className="py-3 px-6 text-center text-nowrap">
                    Fertilizer Name
                  </th>
                  <th scope="col" className="py-3 px-6 text-center text-nowrap">
                    Apply Interval in days
                  </th>
                  <th scope="col" className="py-3 px-6 text-center text-nowrap">
                    Benefit
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.state.neededFertilizers && this.state.neededFertilizers.map((details, index) => {
                  console.log(details)
                  return (
                    <tr key={index} className="bg-white bg-opacity-30 border-b">
                      <th scope="row" className="py-4 px-6 font-medium text-center text-nowrap">
                        {details.fertilizerName}
                      </th>
                      <td className="py-4 px-6 text-center text-nowrap">
                        {details.applyInterval}
                      </td>
                      <td className="py-4 px-6 text-center text-nowrap">
                        {details.benefit}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          {/* Row 7 */}
          <div className='overflow-scroll scrollbar-hide'>
            <table className="w-full">
              <thead className="text-xs text-gray-700 uppercase bg-white bg-opacity-50">
                <tr>
                  <th colSpan={2} >
                    <div className='pl-4 text-left text-xl md:text-2xl text-nowrap relative flex items-center'>
                      Fertilizers applied
                    </div>
                  </th>
                </tr>
                <tr>
                  <th scope="col" className="py-3 px-6 text-center text-nowrap">
                    Fertilizer Name
                  </th>
                  <th scope="col" className="py-3 px-6 text-center text-nowrap">
                    Applied date
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.state.appliedFertilizers && this.state.appliedFertilizers.map((details, index) => {
                  console.log(details)
                  return (
                    <tr key={index} className="bg-white bg-opacity-30 border-b">
                      <th scope="row" className="py-4 px-6 font-medium text-center text-nowrap">
                        {details.fertilizerName}
                      </th>
                      <td className="py-4 px-6 text-center text-nowrap">
                        {details.appliedDate}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          {/* Row 8 */}
          <div className='overflow-scroll scrollbar-hide'>
            <table className="w-full">
              <thead className="text-xs text-gray-700 uppercase bg-white bg-opacity-50">
                <tr>
                  <th>
                    <div className='pl-4 text-center text-xl md:text-2xl text-nowrap relative flex items-center'>
                      Repotting Details
                    </div>
                  </th>
                </tr>
                <tr>
                  <th scope="col" className="py-3 px-6 text-center text-nowrap">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.state.repottingList && this.state.repottingList.map((repotting, index) => {
                  return (
                    <tr key={index} className="bg-white bg-opacity-30 border-b">
                      <td className="py-4 px-6 text-left text-nowrap">
                        {repotting.repottingDate}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
        <ShowImageModal isOpen={this.state.showImageModal} imageUrl={this.state.imageUrlForShowModal} plantId={this.state.plantDetails.plantId} plantName={this.state.plantDetails.name} closeModal={this.closeShowImageModal} />
      </div>
    )
  }
}

export default PlantDetails