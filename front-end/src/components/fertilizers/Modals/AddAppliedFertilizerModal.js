import axios from 'axios'
import React, { Component } from 'react'

class AddAppliedFertilizerModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editValues: null,
            plantLists: null,
            fertilizerId: null
        }
    }
    componentDidMount = () => {
        this.getAllPlantsForAUser()
    }
    getAllPlantsForAUser = async () => {
        let fertilizerId = this.props.fertilizerId
        // Getting basic details
        const headers = {
            'Authorization': localStorage.getItem("token")
          };
        await axios.get("/api/user/plants/fertilizer-usage/" + fertilizerId, {headers}).then((response) => {
            this.setState({
                plantLists: response.data
            })
        }).catch(function (error) {
            console.log(error);
            if(error.response.status === 401){
                localStorage.setItem("isSignedIn", false)
                localStorage.removeItem("token")
            }
        });
    }
    handleChange = (event) => {
        let plantId = event.target.name
        let checked = event.target.checked
        if (plantId === "allSelect") {
            let tempPlants = this.state.plantLists.map(plant => { return { ...plant, using: checked } })
            this.setState({
                plantLists: tempPlants
            })
        } else {
            let tempPlants = this.state.plantLists.map(plant => plant.plantId === plantId ? { ...plant, using: checked } : plant)
            this.setState({
                plantLists: tempPlants
            })
        }
    }
    handleApplyIntervalChnage = (event) =>{
        let plantId = event.target.name.split("_")[1]
        let applyInterval = event.target.value
        let tempPlants = this.state.plantLists.map(plant => plant.plantId === plantId ? { ...plant, applyInterval: applyInterval } : plant)
        this.setState({
            plantLists: tempPlants
        })
    }
    handleUpdate = async () => {
        const headers = {
            'Authorization': localStorage.getItem("token")
          };
        axios.post("/api/user/plants-fertilizer/"+ this.props.fertilizerId, this.state.plantLists, {headers}).then((response) => {
            alert("Changes saved")
        }).catch((error) => {
            console.log(error)
            if(error.response.status === 401){
                localStorage.setItem("isSignedIn", false)
                localStorage.removeItem("token")
            }
        })
    }
    render() {
        if (this.props.isOpen === false) {
            return (<></>)
        }
        return (
            <div className='fixed inset-0 w-full h-full bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
                <div className=' bg-white p-2 rounded h-full'>
                    <div className='w-full'>
                        <table className="min-w-full">
                            <thead className="border-b text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th colSpan={6} className=' text-center text-2xl relative'>
                                        Plants
                                    </th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                    <div className="h-[85%] overflow-auto">
                        <table className="min-w-full text-gray-500">
                            <thead className="border-b text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="text-sm font-medium px-6 py-4 text-left">
                                        {/* <input type="checkbox" name='allSelect' onChange={this.handleChange} className="h-4 w-4 focus:ring-green-500 dark:focus:ring-green-600 focus:ring-2"></input> */}
                                        <input type="checkbox" name='allSelect' checked={this.state.plantLists.filter((plant) => plant?.using !== true).length < 1} onChange={this.handleChange} className="h-4 w-4 focus:ring-green-500 dark:focus:ring-green-600 focus:ring-2"></input>
                                    </th>
                                    <th scope="col" className="text-sm font-medium px-6 py-4 text-left whitespace-nowrap">
                                        Plant Name
                                    </th>
                                    <th scope="col" className="text-sm font-medium px-6 py-4 text-left whitespace-nowrap">
                                        Image
                                    </th>
                                    <th scope="col" className="text-sm font-medium px-6 py-4 text-left whitespace-nowrap">
                                        Apply Interval
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.plantLists.map((plant, index) => {
                                    return (
                                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-900">
                                            <td className='px-6 py-4'>
                                                <input type="checkbox" name={plant.plantId} checked={plant.using} onChange={this.handleChange} className="w-4 h-4 focus:ring-green-500 dark:focus:ring-green-600 focus:ring-2"></input>
                                            </td>
                                            <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {plant.numberId}: {plant.plantName}
                                            </td>
                                            <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                <img src={"/api/plant/downloadImage/small/" + plant.profileImage} className="h-30 w-auto" alt={plant.plantName} />
                                            </td>
                                            <td className="py-4 px-6">
                                                <input name={"plant_"+plant.plantId} type='number' defaultValue={plant.applyInterval} onChange={this.handleApplyIntervalChnage}></input>
                                            </td>
                                        </tr>
                                    )
                                })}

                            </tbody>
                        </table>
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b min-w-full bottom-0">
                        <button
                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={this.props.closeModal}
                        >
                            Close
                        </button>
                        <button
                            className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={this.handleUpdate}
                        >
                            Update
                        </button>
                    </div>
                </div>

            </div>
        )
    }
}

export default AddAppliedFertilizerModal