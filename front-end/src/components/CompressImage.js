import React, { Component } from 'react';
import axios from 'axios';
import Compressor from 'compressorjs';

class CompressImage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      images: [],
      addButtonText:"",
      compressed:false,
      compressing:false
    }
  }
  imageOnChangeHandler = async (event) => {
    let originalImages=[...event.target.files]
    let compressedImages=[]
    this.setState({
      compressing:true
    })
    for(let i=0;i<originalImages.length;i++){
      let isCompressed=false
      console.log(i)
      new Compressor(originalImages[i],{
        quality:0.6,
        maxHeight:164,
        maxWidth:164,
        success(result){
          console.log("compressed")
          compressedImages=[...compressedImages,result]
          isCompressed=true
        }
      })
      while(true){
        if (isCompressed===true){
          break;
        }
        await new Promise(r => setTimeout(r, 1000));
      }
    }

    this.setState({
      images:compressedImages,
      compressed:true,
      compressing:false
    })
  }
  uploadImages = async () => {
    const formData = new FormData()
    console.log(this.state.images)
    this.state.images.forEach((image)=>formData.append("image",image,image.name))
    await axios.post("/api/plant/compressed",formData).then((response)=>{
      console.log(response)
    }).catch((error)=>{
      console.log(error)
    })
  }

  uploadForm = () =>{
    let images = this.state.images
    return (
      <div className='bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
        <div className=' bg-white p-2 rounded w-96'>
          <div className="relative p-6 flex-auto">
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Images
              </label>
              <input onChange={this.imageOnChangeHandler} type="file" accept='image/*' multiple className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" />
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

export default CompressImage