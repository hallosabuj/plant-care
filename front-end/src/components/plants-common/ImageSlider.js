import React, { Component } from 'react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
class ImageSlider extends Component {
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
                            </div>
                        )
                    })}
                </div>
                <MdChevronRight className='opacity-50 cursor-pointer hover:opacity-100' onClick={this.slideRight} size={40} />
            </div>
        )
    }
}

export default ImageSlider