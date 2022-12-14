import axios from 'axios'
import React, { Component } from 'react'

class FertilizerEditModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editValues: null
        }
    }
    onChangeHandler = (e) => {
        console.log("Value:",e.target.value)
        let newValues = this.state.editValues
        newValues.fieldValue = e.target.value
        this.setState({
            editValues: newValues
        })
    }
    componentDidUpdate(previousProps, previousState) {
        if (previousProps.editValues !== this.props.editValues) {
            this.setState({
                editValues: this.props.editValues,
            })
        }
    }
    handleUpdate=async ()=>{
        console.log("Updating in the database")
        if(this.state.editValues.fieldValue===""){
            alert("You are updating with empty value")
        }
        let url="/api/fertilizer/update/"+this.state.editValues.fieldName+"/"+this.state.editValues.fertilizerId+"/"+this.state.editValues.fieldValue
        console.log(url)
        await axios.put(url).then((response)=>{
            console.log(response)
        }).catch((error)=>{
            console.log(error)
        })
        console.log("Now update in database")
        // Now need to close the modal and clear values
        this.props.closeModal()
    }
    render() {
        if (this.props.isOpen === false) {
            return (<></>)
        }
        return this.state.editValues ? (
            <div className='fixed inset-0 w-full h-full bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
                <div className=' bg-white p-2 rounded'>
                    <div className="relative p-6 flex-auto">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                {this.state.editValues.displayName}
                            </label>
                            {this.state.editValues.fieldType==="radio"?(
                                <>
                                    {Object.keys(this.state.editValues.fieldValueOptionsIfAny).map((key,index)=>{
                                        return(
                                            <>
                                                <input onClick={this.onChangeHandler} type={this.state.editValues.fieldType} name={this.state.editValues.fieldName} value={this.state.editValues.fieldValueOptionsIfAny[key]}></input>
                                                <label htmlFor={this.state.editValues.fieldValueOptionsIfAny[key]}>{key}</label><br/>
                                            </>
                                        )
                                    })}
                                </>
                            ):(
                                <input value={this.state.editValues.fieldValue} onChange={this.onChangeHandler} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type={this.state.editValues.fieldType} placeholder={this.state.editValues.displayName} />
                            )}
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
                            onClick={this.handleUpdate}
                        >
                            Update
                        </button>
                    </div>
                </div>

            </div>
        ) : null
    }
}

export default FertilizerEditModal