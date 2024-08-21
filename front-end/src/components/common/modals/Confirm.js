import React, { Component } from 'react'

// Takes three compulsory props
// 1. message       => For the message to be displayed
// 2. onClose       => A function that will execute after closing this modal
// 2. onConfirm     => A function that will excute after confirming
export class Confirm extends Component {
    constructor(props) {
        super(props)
    }
    sendTrue = () => {
        this.props.onConfirm(true)
        this.props.onClose()
    }
    sendFalse = () => {
        this.props.onConfirm(false)
        this.props.onClose()
    }
    closeConfirmModal = (event) => {
        if(event.target.id === "confirmModal"){
            this.props.onConfirm(false)
            this.props.onClose()
        }
    }
    render() {
        return (
            <div onClick={this.closeConfirmModal} id='confirmModal' className='fixed inset-0 p-5 w-full h-full bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50'>
                <div className='bg-white top-24'>
                    {/* Header */}
                    <div className='px-6 py-2 text-xl border-b'>
                        Confirm
                    </div>
                    {/* Message */}
                    <div className='p-6'>
                        {this.props.message}
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b gap-4">
                        <button
                            className="bg-emerald-500 text-white active:bg-emerald-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 w-1/2"
                            type="button"
                            onClick={this.sendTrue}
                        >
                            OK
                        </button>
                        <button
                            className="text-white bg-red-500 active:bg-red-700 font-bold uppercase px-6 py-3 rounded text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 w-1/2"
                            type="button"
                            onClick={this.sendFalse}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Confirm