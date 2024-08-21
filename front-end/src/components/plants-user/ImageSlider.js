import React, { Component } from 'react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import axios from 'axios'
import removeIcon from '../../assets/remove.png';
import Confirm from '../common/modals/Confirm';
class MyImageSlider extends Component {
    constructor(props) {
        super(props)

        this.state = {
            imageNames: this.props.imageNames,
            confirmImageDeleteModal: false,
            keyForImageToBeDeleted:"",
        }
    }
    slideLeft=()=>{
        var slider=document.getElementById("slider")
        slider.scrollLeft=slider.scrollLeft-500
    }
    slideRight=()=>{
        var slider=document.getElementById("slider")
        slider.scrollLeft=slider.scrollLeft+500
    }
    deleteImage = async(confirm) =>{
        if(confirm === true){
            const headers = {
                'Authorization': localStorage.getItem("token")
              };
            await axios.delete("/api/user/plant/deleteImage/"+this.state.imageNames[this.state.keyForImageToBeDeleted], {headers}).then((response)=>{
                // This part will execute after deletion
                let imageNames=this.state.imageNames
                delete imageNames[this.state.keyForImageToBeDeleted]
                this.setState({
                    imageNames:imageNames
                })
            }).catch((error)=>{
                if(error.response.status === 401){
                    localStorage.setItem("isSignedIn", false)
                    localStorage.removeItem("token")
                }
            })
        }
    }
    confirmDeleteImage= (key) =>{
        if (key===""){
            return
        }else{
            this.setState({
                keyForImageToBeDeleted:key
            })
        }
        this.setState({
            confirmImageDeleteModal:true
        })
    }
    sendImageUrlToParent=(imageUrl)=>{
        console.log("Need to send URL to parent")
        console.log(imageUrl)
        this.props.openShowImageModal(imageUrl)
    }
    closeConfirmModal = () => {
        this.setState({
            confirmImageDeleteModal:false
        })
    }
    render() {
        return (
            <div className='relative flex items-center'>
                <MdChevronLeft className='opacity-50 cursor-pointer hover:opacity-100' onClick={this.slideLeft} size={40} />
                <div id="slider" className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide'>
                    {Object.keys(this.state.imageNames).map((key,index)=>{
                        let imageUrlMedium = "/api/plant/downloadImage/medium/" + this.state.imageNames[key]
                        let imageUrlLarge = "/api/plant/downloadImage/large/" + this.state.imageNames[key]
                        return (
                            <div className='h-[220px] inline-block p-2 cursor-pointer hover:scale-105 ease-in-out duration-500 relative' key={key}>
                                <img onClick={()=>{this.sendImageUrlToParent(imageUrlLarge)}} className='h-full w-auto' src={imageUrlMedium} alt="Plant"/>
                                <img onClick={()=>{this.confirmDeleteImage(key)}} src={removeIcon} className="h-6 w-6 top-3 right-3 opacity-60 hover:opacity-100 absolute" alt='Delete'/>
                            </div>
                        )
                    })}
                </div>
                <MdChevronRight className='opacity-50 cursor-pointer hover:opacity-100' onClick={this.slideRight} size={40} />
                {this.state.confirmImageDeleteModal && <Confirm message="Are you sure you want to delete?" onClose={this.closeConfirmModal} onConfirm={this.deleteImage}/>}
            </div>
        )
    }
}

export default MyImageSlider