import React, { Component } from 'react'
import axios from 'axios'
import fileDownload from 'js-file-download'
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
    updateProfileImage = async () => {
        console.log("Updating in the database")
        if (this.props.imageUrl === "") {
            alert("Unable to update try after sometime")
            return
        }
        let imageName = this.props.imageUrl.split("/")[5]
        let url = "/api/user/plant/update/profileimage/" + this.props.plantId + "/" + imageName
        const headers = {
            'Authorization': localStorage.getItem("token")
        };
        await axios.post(url, {}, {headers}).then((response) => {
            console.log("Profile image updated")
        }).catch((error) => {
            console.log(error)
            if(error.response.status === 401){
                localStorage.setItem("isSignedIn", false)
                localStorage.removeItem("token")
            }
        })
        console.log("Now update in database")
        // Now need to close the modal and clear values
    }
    downloadImage = () => {
        console.log("Downloading image", this.props.imageUrl)
        axios.get(this.props.imageUrl, {
            responseType: "blob"
        }).then((response) => {
            //////////////////////////////////////////////////////////////////////
            // One way to download image
            // const url=window.URL.createObjectURL(new Blob([response.data]));
            // const link = document.createElement('a');
            // link.href=url;
            // link.setAttribute("download","file.jpg");
            // document.body.appendChild(link);
            // link.click()
            //////////////////////////////////////////////////////////////////////
            fileDownload(response.data, this.props.plantName + ".jpg")
        })
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
            <div onClick={this.closeModal} id="imageModal" className='fixed inset-0 p-5 w-full h-full bg-black bg-opacity-30 backdrop-blur-sm flex justify-center z-[1001]'>
                <div className="bg-white p-2 flex justify-center items-center relative">
                    <img className=' max-h-1 max-w-1' src={this.props.imageUrl} alt="Plant"/>
                    <div className=' bottom-3 absolute'>
                        <button
                            className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 opacity-50 hover:opacity-100"
                            type="button"
                            onClick={this.updateProfileImage}
                        >
                            Set as profile Image
                        </button>
                        <button
                            className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 opacity-50 hover:opacity-100"
                            type="button"
                            onClick={this.downloadImage}
                        >
                            Download Image
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ShowImageModal