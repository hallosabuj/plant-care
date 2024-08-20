import axios from 'axios'
import React, { Component } from 'react'

class AddAppliedFertilizerModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            listOfNeededFertilizers:null,
            fertilizerId: "",
            appliedDate:""
        }
    }
    componentDidMount(){
        this.getNeededFertilizers()
    }
    async getNeededFertilizers(){
        const headers = {
            'Authorization': localStorage.getItem("token")
        };
        let fertilizers=await axios.get("/api/plant-fertilizer/plantId/"+this.props.plantId, {headers}).then((response)=>{
            this.setState({
                listOfNeededFertilizers:response.data
            })
        }).catch(function(error) {
            console.log(error);
            if(error.response.status === 401){
                localStorage.setItem("isSignedIn", false)
                localStorage.removeItem("token")
            }
        });
        console.log(fertilizers)
    }
    onAppliedDateChangeHandler = (event) => {
        this.setState({
            appliedDate: event.target.value
        })
    }
    onFertilizerIdChangeHandler = (event) => {
        this.setState({
            fertilizerId: event.target.value
        })
    }
    addAppliedFertilizer=async ()=>{
        if (this.state.fertilizerId===""){
            alert("Fertilizer name field can't be empty")
            return
        }
        
        let jsonBody=[{
            plantId:this.props.plantId,
            fertilizerId:this.state.fertilizerId,
            appliedDate:this.state.appliedDate
        }]
        const headers = {
            'Authorization': localStorage.getItem("token")
        };
        axios.post("/api/user/applied-fertilizer",jsonBody, {headers}).then((response)=>{
            console.log("Applied fertilizer added")
        }).catch((error)=>{
            console.log(error)
            if(error.response.status === 401){
                localStorage.setItem("isSignedIn", false)
                localStorage.removeItem("token")
            }
        })
        this.props.closeModal()
    }
    closeForm = (event) =>{
        if (event.target.id === "appliedFertilizerModal") {
            this.props.closeModal()
        }
    }
    render() {
        if(this.props.isOpen===false){
            return <></>
        }
        return (
            <div onClick={this.closeForm} id='appliedFertilizerModal' className='fixed inset-0 w-full h-full bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
                <div className=' bg-white p-2 rounded w-96'>
                    <div className="relative p-6 flex-auto">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                Fertilizer Name
                            </label>
                            <input    type="text" placeholder="Fertilizer Name" />
                            <select onChange={this.onFertilizerIdChangeHandler} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                <option value={""}>Select Fertilizer</option>
                                {this.state.listOfNeededFertilizers?this.state.listOfNeededFertilizers.map((fertilizer,index)=>{
                                    return (
                                        <option value={fertilizer.fertilizerId} key={fertilizer.fertilizerId}>{fertilizer.fertilizerName}</option>
                                    )
                                }):<></>}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                Applied date
                            </label>
                            <input value={this.state.appliedDate} onChange={this.onAppliedDateChangeHandler} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="date"/>
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
                            onClick={this.addAppliedFertilizer}
                        >
                            Add
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddAppliedFertilizerModal