import axios from 'axios'
import React, { Component } from 'react'
import UserPlantCard from './UserPlantCard'
import AddPlantModal from './Modals/Add_PlantModal'
import { useNavigate } from 'react-router-dom'

const UserPlants = (props) => {
    const navigate = useNavigate();
    return (<UserPlantsClass navigate={navigate} />)
}

class UserPlantsClass extends Component {
    constructor(props) {
        super(props)

        this.state = {
            plants: null
        }
        this.reRenderOnAddOrDelete = this.reRenderOnAddOrDelete.bind(this)
    }
    async getPlants() {
        const headers = {
            'Authorization': localStorage.getItem("token")
        };
        let plants = await axios.get("/api/user/plant",{headers}).then((response) => {
            console.log(response.status)
            this.setState({
                plants: response.data
            })
        }).catch(function (error) {
            console.log(error);
            if(error.response.status === 401){
                localStorage.setItem("isSignedIn", false)
                localStorage.removeItem("token")
            }
        });
        console.log(plants)
    }
    componentDidMount() {
        // If it's not logged in then redirect to home page
        if(!localStorage.getItem("isSignedIn")){
            this.props.navigate('/');
        }
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
                        <UserPlantCard key={plant.plantId} plant={plant} reRenderOnDelete={this.reRenderOnAddOrDelete} />
                    ))}
                </div>
                
            </div>
        )
    }
}

export default UserPlants