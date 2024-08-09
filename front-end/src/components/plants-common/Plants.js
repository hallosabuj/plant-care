import axios from 'axios'
import React, { Component } from 'react'
import PlantCard from './PlantCard'

class Plants extends Component {
    constructor(props) {
        super(props)

        this.state = {
            plants: null
        }
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
    render() {
        return (
            <div className='lg:pl-14 lg:pr-14 md:pl-14 md:pr-14 pl-3 pr-3'>
                <div className=' grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2 gap-x-3'>
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