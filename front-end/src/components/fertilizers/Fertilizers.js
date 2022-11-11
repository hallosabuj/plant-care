import axios from 'axios'
import React, { Component } from 'react'
import AddFertilizerModal from './AddFertilizerModal'
import FertilizerCard from './FertilizerCard'

class Fertilizers extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         fertilizers:null
      }
    }
    async getPlants(){
        let fertilizers=await axios.get("/fertilizer").then((response)=>{
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
        this.getPlants()
    }
    render() {
        return (
        <div>
            <div className=' bg-blue-500'>
                <div className="relative flex h-16 items-center justify-between">
                    <div className='sm:ml-6 sm:block flex space-x-4'>
                        <AddFertilizerModal/>
                    </div>
                </div>
            </div>
            <div className='flex bg-blue-400'>
                {/* Short Circuit to check null */}
                {this.state.fertilizers && this.state.fertilizers.map((fertilizer,index)=>(
                    <FertilizerCard key={index} fertilizer={fertilizer}/>
                ))}
            </div>
        </div>
        )
    }
}

export default Fertilizers