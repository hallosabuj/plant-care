import React, { Component } from 'react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import axios from 'axios'
import removeIcon from '../../assets/remove.png';
class MyImageSlider extends Component {
    constructor(props) {
        super(props)

        this.state = {
            imageNames: this.props.imageNames
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
    deleteImage=async(key)=>{
        console.log(key)
        if (key===""){
            return
        }
        const headers = {
            'Authorization': localStorage.getItem("token")
          };
        await axios.delete("/api/user/plant/deleteImage/"+this.state.imageNames[key], {headers}).then((response)=>{
            console.log("Deleted")
            let imageNames=this.state.imageNames
            delete imageNames[key]
            this.setState({
                imageNames:imageNames
            })
        }).catch((error)=>{
            console.log(error)
            if(error.response.status === 401){
                localStorage.setItem("isSignedIn", false)
                localStorage.removeItem("token")
            }
        })
    }
    sendImageUrlToParent=(imageUrl)=>{
        console.log("Need to send URL to parent")
        console.log(imageUrl)
        this.props.openShowImageModal(imageUrl)
    }
    render() {
        return (
            <div className='relative flex items-center'>
                <MdChevronLeft className='opacity-50 cursor-pointer hover:opacity-100' onClick={this.slideLeft} size={40} />
                <div id="slider" className='w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide'>
                    {Object.keys(this.state.imageNames).map((key,index)=>{
                        let imageUrlMedium = "/api/plant/downloadImage/medium/" + this.state.imageNames[key]
                        let imageUrlLarge = "/api/plant/downloadImage/large/" + this.state.imageNames[key]
                        return (
                            <div className='h-[220px] inline-block p-2 cursor-pointer hover:scale-105 ease-in-out duration-300 relative' key={key}>
                                <img onClick={()=>{this.sendImageUrlToParent(imageUrlLarge)}} className='h-full w-auto' src={imageUrlMedium} alt="Plant"/>
                                <img onClick={()=>{this.deleteImage(key)}} src={removeIcon} className="h-6 w-6 top-3 right-3 opacity-60 hover:opacity-100 absolute" alt='Delete'/>
                            </div>
                        )
                    })}
                </div>
                <MdChevronRight className='opacity-50 cursor-pointer hover:opacity-100' onClick={this.slideRight} size={40} />
            </div>
        )
    }
}

export default MyImageSlider