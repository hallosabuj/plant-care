import React, { Component } from 'react'
import axios  from 'axios'
import PesticideCard from './PesticideCard'
import AddPesticideModal from './Modals/AddPesticideModal'

class Pesticides extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       pesticides:null
    }
    this.reRenderOnAddOrDelete=this.reRenderOnAddOrDelete.bind(this)
  }
  async getPesticides(){
      let pesticides=await axios.get("/api/pesticide").then((response)=>{
          console.log(response)
          this.setState({
            pesticides:response.data
          })
      }).catch(function(error) {
          console.log(error);
      });
      console.log(pesticides)
  }
  componentDidMount(){
      this.getPesticides()
  }
  reRenderOnAddOrDelete(){
      this.getPesticides()
  }
  render() {
    return (
        <div>
            <div className="relative flex h-16 items-center justify-between">
                <div className='sm:ml-6 sm:block flex'>
                    <AddPesticideModal reRenderOnAdd={this.reRenderOnAddOrDelete}/>
                </div>
            </div>
            <div className='grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2'>
                {/* Short Circuit to check null */}
                {this.state.pesticides && this.state.pesticides.map((pesticide,index)=>(
                    <PesticideCard key={pesticide.pesticideId} pesticide={pesticide} reRenderOnDelete={this.reRenderOnAddOrDelete}/>
                ))}
            </div>
        </div>
      )
  }
}

export default Pesticides