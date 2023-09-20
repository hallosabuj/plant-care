import axios from 'axios'
import React, { Component } from 'react'
import AddFertilizerModal from './Modals/AddFertilizerModal'
import FertilizerCard from './FertilizerCard'

class Fertilizers extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         fertilizers:null
      }
      this.reRenderOnAddOrDelete = this.reRenderOnAddOrDelete.bind(this)
    }
    async getFertilizers(){
        let fertilizers=await axios.get("/api/fertilizer").then((response)=>{
            console.log(response)
            this.setState({
                fertilizers:response.data
            })
        }).catch(function(error) {
            console.log(error);
        });
        console.log(fertilizers)
    }
    componentDidMount(){
        this.getFertilizers()
    }
    reRenderOnAddOrDelete(){
        this.getFertilizers()
    }
    render() {
        return (
            <div>
                <div className="relative flex h-16 items-center justify-between">
                    <div className='sm:ml-6 sm:block flex'>
                        <AddFertilizerModal reRenderOnAdd={this.reRenderOnAddOrDelete}/>
                    </div>
                </div>
                <div className='grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2'>
                    {/* Short Circuit to check null */}
                    {this.state.fertilizers && this.state.fertilizers.map((fertilizer,index)=>(
                        <FertilizerCard key={fertilizer.fertilizerId} fertilizer={fertilizer} reRenderOnDelete={this.reRenderOnAddOrDelete}/>
                    ))}
                </div>
            </div>
        )
    }
}

export default Fertilizers