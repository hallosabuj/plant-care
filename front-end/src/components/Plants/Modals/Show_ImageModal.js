import React, { Component } from 'react'
import axios from 'axios'

class ShowImageModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            imageUrl: ""
        }
    }
    componentDidUpdate(previousProps, previousState) {
        if (previousProps.imageUrl !== this.props.imageUrl) {
            this.setState({
                imageUrl: this.props.imageUrl,
            })
        }
    }
    updateProfileImage=async () =>{
        console.log("Updating in the database")
        if(this.props.imageUrl===""){
            alert("Unable to update try after sometime")
            return
        }
        let imageName=this.props.imageUrl.split("/")[4]
        let url="/api/plant/update/profileimage/"+this.props.plantId+"/"+imageName
        await axios.put(url).then((response)=>{
            console.log("Profile image updated")
        }).catch((error)=>{
            console.log(error)
        })
        console.log("Now update in database")
        // Now need to close the modal and clear values
    }
    closeModal = (event) => {
        if (event.target.id === "imageModal") {
            this.props.closeModal()
        }
    }
    render() {
        if (this.props.isOpen === false) {
            return (<></>)
        }
        return (
            <div onClick={this.closeModal} id="imageModal" className='fixed inset-0 p-5 w-full h-full bg-black bg-opacity-30 backdrop-blur-sm flex justify-center'>
                <div className="bg-white p-2 flex justify-center items-center relative">
                    <img className='h-full' src={this.props.imageUrl} />
                    <button
                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 absolute top-3 right-3 opacity-50 hover:opacity-100"
                        type="button"
                        onClick={this.updateProfileImage}
                    >
                        Set as profile Image
                    </button>
                </div>
            </div>
        )
    }
}

export default ShowImageModal