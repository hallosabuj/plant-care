import axios from 'axios'
import React, { Component } from 'react'
import Compressor from 'compressorjs'

class AddImageModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      imagesSmall: [],
      imagesMedium: [],
      imagesLarge: [],
      addButtonText:"",
      compressed:false,
      compressing:false
    }
  }
  resetState =()=>{
    this.setState({
      imagesSmall: [],
      imagesMedium: [],
      imagesLarge: [],
      addButtonText:"",
      compressed:false,
      compressing:false
    })
  }
  closingModal = ()=>{
    this.resetState()
    this.props.closeModal()
  }
  imageOnChangeHandler = async (event) => {
    // this.setState({
    //   images: [...event.target.files]
    // })
    let originalImages=[...event.target.files]
    let compressedImagesSmall=[]
    let compressedImagesMedium=[]
    let compressedImagesLarge=[]
    // Generating array
    for (let i = 0; i < originalImages.length; i++) {
      compressedImagesSmall=[...compressedImagesSmall,i]
      compressedImagesMedium=[...compressedImagesMedium,i]
      compressedImagesLarge=[...compressedImagesLarge,i]
    }
    await new Promise(r => setTimeout(r, 1000));
    this.setState({
      compressing:true
    })
    
    // Generating images
    for (let i = 0; i < originalImages.length; i++) {
      let isCompressed=false;
      // for large image
      new Compressor(originalImages[i],{
        quality:0.6,
        maxHeight:1280,
        maxWidth:1280,
        success(result){
          compressedImagesLarge[i]=result
          isCompressed=true
        }
      })
      while(true){
        // console.log("While-1")
        if(isCompressed===true){
          break;
        }
        await new Promise(r => setTimeout(r, 100));
      }

      isCompressed = false;
      // for medium image
      new Compressor(originalImages[i],{
        quality:0.6,
        maxHeight:512,
        maxWidth:512,
        success(result){
          compressedImagesMedium[i]=result
          isCompressed=true
        }
      })
      while(true){
        // console.log("While-2")
        if(isCompressed===true){
          break;
        }
        await new Promise(r => setTimeout(r, 100));
      }

      isCompressed=false;
      // for small image
      new Compressor(originalImages[i],{
        quality:0.6,
        maxHeight:164,
        maxWidth:164,
        success(result){
          compressedImagesSmall[i]=result
          isCompressed=true
        }
      })
      while(true){
        // console.log("While-3")
        if(isCompressed===true){
          break;
        }
        await new Promise(r => setTimeout(r, 100));
      }   
    }

    this.setState({
      imagesSmall:compressedImagesSmall,
      imagesMedium:compressedImagesMedium,
      imagesLarge:compressedImagesLarge,
      compressed:true,
      compressing:false
    })
  }
  uploadImages = async () => {
    const formData = new FormData()
    formData.append("id",this.props.plantId)
    this.state.imagesSmall.forEach((image)=>formData.append("imageSmall",image,image.name))
    this.state.imagesMedium.forEach((image)=>formData.append("imageMedium",image,image.name))
    this.state.imagesLarge.forEach((image)=>formData.append("imageLarge",image,image.name))
    await axios.post("/api/plant/uploadImages",formData).then((response)=>{
      console.log(response)
      this.props.closeModal()
    }).catch((error)=>{
      console.log(error)
      this.props.closeModal()
    })
  }

  uploadForm = () =>{
    let images = this.state.imagesLarge
    return (
      <div className='fixed inset-0 w-full h-full bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
        <div className=' bg-white p-2 rounded w-96'>
          <div className="relative p-6 flex-auto">
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Images
              </label>
              <input onChange={this.imageOnChangeHandler} onClick={this.resetState} type="file" accept='image/*' multiple className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" />
              <div className='grid grid-cols-3'>
                  {images && images.map((image,index)=>{
                    console.log(index)
                    return (
                      <div key={image.lastModified}>
                        <img src={URL.createObjectURL(image)} className="max-h-28 max-w-[90px]" alt={image.name}/>
                      </div>
                    )})}
              </div>
            </div>
          </div>
          {/*footer*/}
          <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
            <button
              className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={this.closingModal}
            >
              Close
            </button>

            {this.state.compressed && (
            <button
              className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={this.uploadImages}
            >
              Upload
            </button>)}
            {this.state.compressing && (
              <button
              className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
            >
              Compressing
            </button>
            )}
          </div>
        </div>
      </div>
    )
  }
  render() {
    if (this.props.isOpen === false) {
      return <></>
    }
    return (
      this.uploadForm()
    )
  }
}

export default AddImageModal