import axios from 'axios'
import React, { Component } from 'react'

class AddImageModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      images: []
    }
  }
  imageOnChangeHandler = (event) => {
    this.setState({
      images: [...event.target.files]
    })
  }
  uploadImages = async () => {
    const formData = new FormData()
    formData.append("id",this.props.plantId)
    this.state.images.forEach((image)=>formData.append("image",image))
    await axios.post("/api/plant/uploadImages",formData).then((response)=>{
      console.log(response)
      this.props.closeModal()
    }).catch((error)=>{
      console.log(error)
      this.props.closeModal()
    })
  }
  render() {
    let images = this.state.images

    console.log(images)
    if (this.props.isOpen === false) {
      return <></>
    }
    return (
      <div className='fixed inset-0 w-full h-full bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
        <div className=' bg-white p-2 rounded w-96'>
          <div className="relative p-6 flex-auto">
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Images
              </label>
              <input onChange={this.imageOnChangeHandler} type="file" accept='image/*' multiple className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" />
              {images && images.map((image,index)=>{
                console.log(index)
                return (<img key={image.lastModified} src={URL.createObjectURL(image)} style={{ height: '100px', width: 'auto' }} alt={image.name}/>)
              })}
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
              onClick={this.uploadImages}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default AddImageModal