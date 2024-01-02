import axios from 'axios'
import React, { Component } from 'react'

class AddRepotting extends Component {
    constructor(props) {
        super(props)

        this.state = {
            repottingDate: ""
        }
    }
    onRepottingDateChangeHandler = (event) => {
        this.setState({
            repottingDate: event.target.value
        })
    }
    addRepottingDate = async () => {
        if (this.state.repottingDate === "") {
            alert("Repotting date can't be empty")
        }else{
            let jsonBody = {
                plantId: this.props.plantId,
                repottingDate: this.state.repottingDate
            }
            console.log(jsonBody)
            axios.post("/api/repotting", jsonBody).then((response) => {
                console.log("Repotting date added")
            }).catch((error) => {
                console.log(error)
            })
        }
        this.props.closeModal()
    }
    render() {
        if (this.props.isOpen === false) {
            return <></>
        }
        return (
            <div className='fixed inset-0 w-full h-full bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
                <div className=' bg-white p-2 rounded w-96'>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Repotting date
                        </label>
                        <input value={this.state.repottingDate} onChange={this.onRepottingDateChangeHandler} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="date" />
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
                            onClick={this.addRepottingDate}
                        >
                            Add
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddRepotting