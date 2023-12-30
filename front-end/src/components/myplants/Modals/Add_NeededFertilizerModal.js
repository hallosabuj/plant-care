import axios from 'axios'
import React, { Component } from 'react'

class AddNeededFertilizerModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            listOfFertilizers:null,
            fertilizerId: "",
            applyInterval: "1",
            benefit: ""
        }
    }
    componentDidMount(){
        this.getFertilizers()
    }
    async getFertilizers(){
        let fertilizers=await axios.get("/api/fertilizer").then((response)=>{
            console.log(response)
            this.setState({
                listOfFertilizers:response.data
            })
        }).catch(function(error) {
            console.log(error);
        });
        console.log(fertilizers)
    }
    onApplyIntervalChangeHandler = (event) => {
        console.log(this.state.applyInterval)
        this.setState({
            applyInterval: event.target.value
        })
    }
    onBenefitChangeHandler = (event) => {
        this.setState({
            benefit: event.target.value
        })
    }
    onFertilizerIdChangeHandler = (event) => {
        console.log(event.target.value)
        this.setState({
            fertilizerId: event.target.value
        })
    }
    addNeededFertilizer=async ()=>{
        if (this.state.fertilizerId===""){
            alert("Fertilizer name field can't be empty")
        }
        
        let jsonBody={
            plantId:this.props.plantId,
            fertilizerId:this.state.fertilizerId,
            applyInterval:this.state.applyInterval,
            benefit:this.state.benefit
        }
        console.log(jsonBody)
        axios.post("/api/plant-fertilizer",jsonBody).then((response)=>{
            console.log("Needed fertilizer added")
        }).then((response)=>{
            this.props.closeModal()
        }).catch((error)=>{
            console.log(error)
        })
    }
    render() {
        if(this.props.isOpen===false){
            return <></>
        }
        return (
            <div className='fixed inset-0 w-full h-full bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
                <div className=' bg-white p-2 rounded w-96'>
                    <div className="relative p-6 flex-auto">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                Fertilizer Name
                            </label>
                            <input    type="text" placeholder="Fertilizer Name" />
                            <select onChange={this.onFertilizerIdChangeHandler} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                <option value={""}>Select Fertilizer</option>
                                {this.state.listOfFertilizers?this.state.listOfFertilizers.map((fertilizer,index)=>{
                                    return (
                                        <option value={fertilizer.fertilizerId} key={fertilizer.fertilizerId}>{fertilizer.name}</option>
                                    )
                                }):<></>}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                Apply Interval
                            </label>
                            <input value={this.state.applyInterval} min={1} onChange={this.onApplyIntervalChangeHandler} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" placeholder="Apply Interval" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                Benefit
                            </label>
                            <input value={this.state.benefit} onChange={this.onBenefitChangeHandler} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Benefit" />
                        </div>
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
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
                            onClick={this.addNeededFertilizer}
                        >
                            Add
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddNeededFertilizerModal