import axios from 'axios';
import React, { Component } from 'react'

class PlantDetails extends Component {
  constructor(props) {
    super(props)

    this.state = {
      plantDetails: null
    }
  }
  async getDetails(){
    let plantId = window.location.href.split('/')[4]
    await axios.get("/plant/" + plantId).then((response) => {
      console.log(response.data)
      this.setState({
        plantDetails: response.data
      })
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
          <div className=' col-span-3 bg-slate-500 h-14'><h1>{this.state.plantDetails.name}</h1></div>
          {/* Row 2 */}
          <div className=' bg-slate-400'>Applied On 12/12/22</div>
          <div className=' col-span-2 row-span-3 bg-slate-400 flex float-left overflow-hidden'>
            {this.state.plantDetails.imageNames.map((imageName)=>{
              let imageUrl="http://localhost:8080/plant/downloadImage/" + imageName;
              return (<img alt="plant Image" key={imageName} src={imageUrl} style={{ height: "200px" }} className="p-1"/>)
            })}
          </div>
          {/* Row 3 */}
          <div className=' bg-slate-500'> DOB: {this.state.plantDetails.dob}</div>
          {/* Row 4 */}
          <div className=' bg-slate-400'>Apply Interval: 10</div>
          {/* Row 5 */}
          <div className=' col-span-3 bg-slate-500 h-16'>Plant details</div>
        </div>
      </div>
    )
  }
}

export default PlantDetails