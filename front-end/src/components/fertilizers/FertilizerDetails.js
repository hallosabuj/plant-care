import axios from 'axios'
import React, { Component } from 'react'

export class FertilizerDetails extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       fertilizerDetails:null
    }
  }
  async getDetails(){
    let fertilizerId = window.location.href.split('/')[4]
    // Getting basic details
    await axios.get("/fertilizer/" + fertilizerId).then((response) => {
      this.setState({
        fertilizerDetails: response.data
      })
      console.log(response.data)
    }).catch(function (error) {
      console.log(error);
    });
  }
  componentDidMount(){
    this.getDetails()
  }
  render() {
    let imageUrl=""
    if (this.state.fertilizerDetails==null){
      imageUrl = "http://localhost:8080/fertilizer/downloadImage/"
    }else{
      imageUrl = "http://localhost:8080/fertilizer/downloadImage/" + this.state.fertilizerDetails.profileImage
    }
    console.log(imageUrl)
    return !(this.state.fertilizerDetails)?(<div>Details not found</div>):(
      <div className='grid grid-cols-3 gap-2 p-2'>
          {/* Row 1 */}
          <div className=' col-span-3 bg-slate-500 h-14 flex justify-center items-center text-4xl'><h1>{this.state.fertilizerDetails.name}</h1></div>
          {/* Row 2 */}
          <div className='col-span-2  bg-slate-400 flex justify-left items-center pl-2'>Available : {this.state.fertilizerDetails.available}</div>
          <div className=' row-span-3 bg-slate-400 flex justify-center items-center overflow-hidden'>
            <img src={imageUrl} className=" max-h-64"/>
          </div>
          {/* Row 3 */}
          <div className='col-span-2  bg-slate-500 flex justify-left items-center pl-2'> Composition : {this.state.fertilizerDetails.composition}</div>
          {/* Row 4 */}
          <div className='col-span-2  bg-slate-400 flex justify-left items-center pl-2'> </div>
          {/* Row 5 */}
          <div className='justify-left items-center pl-2 col-span-3 bg-slate-500 h-16'>
            <h2>Details:</h2>
            {this.state.fertilizerDetails.details}
          </div>
        </div>
    )
  }
}

export default FertilizerDetails