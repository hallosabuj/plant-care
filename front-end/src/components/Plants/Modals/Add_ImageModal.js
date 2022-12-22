import axios from 'axios'
import React, { Component } from 'react'
import Compressor from 'compressorjs'

class AddImageModal extends Component {
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
    // this.setState({
    //   images: [...event.target.files]
    // })
    let originalImages=[...event.target.files]
    let compressedImages=[]
    this.setState({
      compressing:true
    })
    originalImages.map((image,index)=>{
      new Compressor(image,{
        quality:0.6,
        success(result){
          console.log("compressed")
          compressedImages=[...compressedImages,result]
        }
      })
    })
    while(true){
      if (originalImages.length===compressedImages.length){
        this.setState({
          images:compressedImages,
          compressed:true,
          compressing:false
        })
        console.log("All compresses")
        break
      }
      await new Promise(r => setTimeout(r, 1000));
    }
  }
  uploadImages = async () => {
    const formData = new FormData()
    formData.append("id",this.props.plantId)
    this.state.images.forEach((image)=>formData.append("image",image,image.name))
    await axios.post("/api/plant/uploadImages",formData).then((response)=>{
      console.log(response)
      this.props.closeModal()
    }).catch((error)=>{
      console.log(error)
      this.props.closeModal()
    })
  }

  uploadForm = () =>{
    let images = this.state.images
    return (
      <div className='fixed inset-0 w-full h-full bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
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
              onClick={this.props.closeModal}
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