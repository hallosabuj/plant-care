import axios from 'axios'
import React, { Component } from 'react'
import PlantCard from './PlantCard'
import AddPlantModal from './Modals/Add_PlantModal'

class Plants extends Component {
    constructor(props) {
        super(props)

        this.state = {
            plants: null
        }
        this.reRenderOnAddOrDelete = this.reRenderOnAddOrDelete.bind(this)
    }
    async getPlants() {
        let plants = await axios.get("/api/plant").then((response) => {
            console.log(response)
            this.setState({
                plants: response.data
            })
        }).catch(function (error) {
            console.log(error);
        });
        console.log(plants)
    }
    componentDidMount() {
        this.getPlants()
    }
    reRenderOnAddOrDelete() {
        this.getPlants()
    }
    render() {
        return (
            <div>
                <div className="relative flex h-16 items-center justify-between">
                    <div className='sm:ml-6 sm:block flex '>
                        <AddPlantModal reRenderOnAdd={this.reRenderOnAddOrDelete} />
                    </div>
                </div>
                <div className=' grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2'>
                    {/* Short Circuit to check null */}
                    {this.state.plants && this.state.plants.map((plant, index) => (
                        <PlantCard key={plant.plantId} plant={plant} reRenderOnDelete={this.reRenderOnAddOrDelete} />
                    ))}
                </div>
                
            </div>
        )
    }
}

export default Plants