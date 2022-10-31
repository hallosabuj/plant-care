import axios from 'axios'
import React, { Component } from 'react'
import PlantCard from './PlantCard'
import AddPlantModal from './AddPlantModal'

class Plants extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         plants:null
      }
    }
    async getPlants(){
        let plants=await axios.get("/plant").then((response)=>{
            console.log(response)
            this.setState({
                plants:response.data
            })
        }).catch(function(error) {
            console.log(error);
        });
        console.log(plants)
    }
    componentDidMount(){
        this.getPlants()
    }
    render() {
        return (
        <div>
            <div>
                <div className="relative flex h-16 items-center justify-between">
                    <div className='sm:ml-6 sm:block flex space-x-4'>
                        <AddPlantModal/>
                    </div>
                </div>
            </div>
            {/* Short Circuit to check null */}
            {this.state.plants && this.state.plants.map((plant,index)=>(
                <PlantCard key={index} plant={plant}/>    
            ))}
            
            {/* <PlantCard/>
            <PlantCard/> */}
        </div>
        )
    }
}

export default Plants