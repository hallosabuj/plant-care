import axios from 'axios'
import React, { Component } from 'react'
import Compressor from 'compressorjs'
import '../Plant.css';

class AddPlantModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: "",
      dob: "",
      imageSmall: null,
      imageMedium: null,
      imageLarge: null,
      showModal: false,
      compressed: false,
      compressing: false
    }
  }
  handleSubmit = async (event) => {
    console.log(this.state)
    console.log("Handling form submit")
    const formData = new FormData()
    formData.append("name", this.state.name)
    formData.append("dob", this.state.dob)
    formData.append("imageSmall", this.state.imageSmall,this.state.imageSmall.name)
    formData.append("imageMedium", this.state.imageMedium,this.state.imageMedium.name)
    formData.append("imageLarge", this.state.imageLarge,this.state.imageLarge.name)
    const headers = {
      'Authorization': localStorage.getItem("token")
    };
    await axios.post("/api/user/plant", formData, {headers}).then(() => {
      this.props.reRenderOnAdd()
    }).catch((error) => {
      console.log(error)
      if(error.response.status === 401){
        localStorage.setItem("isSignedIn", false)
        localStorage.removeItem("token")
      }
    })
    this.toggleShowModal()
    // event.preventDefault()
  }
  nameChangeHandler = (event) => {
    this.setState({
      name: event.target.value
    }, () => {
      console.log(this.state)
    })
  }
  dobChangeHandler = (event) => {
    this.setState({
      dob: event.target.value
    }, () => {
      console.log(this.state)
    })
  }
  imageOnChangeHandler = async (event) => {
    this.setState({
      compressing: true
    })
    let originalImage = event.target.files[0]
    let compressedImageLarge = null
    let compressedImageMedium = null
    let compressedImageSmall = null
    new Compressor(originalImage, {
      quality: 0.6,
      maxHeight:1280,
      maxWidth:1280,
      success(result) {
        compressedImageLarge = result
        console.log("Com")
      }
    })
    new Compressor(originalImage, {
      quality: 0.6,
      maxHeight:512,
      maxWidth:512,
      success(result) {
        compressedImageMedium = result
        console.log("Com")
      }
    })
    new Compressor(originalImage, {
      quality: 0.6,
      maxHeight:164,
      maxWidth:164,
      success(result) {
        compressedImageSmall = result
        console.log("Com")
      }
    })
    while (true) {
      if (compressedImageSmall !== null && compressedImageMedium !== null && compressedImageLarge !== null) {
        this.setState({
          imageSmall: compressedImageSmall,
          imageMedium: compressedImageMedium,
          imageLarge: compressedImageLarge,
          compressed: true,
          compressing: false
        })
        console.log("Image compressed")
        break
      }
      await new Promise(r => setTimeout(r, 1000));
    }
  }
  toggleShowModal = () => {
    this.setState({
      showModal: !this.state.showModal
    }, () => {
      if (this.state.showModal === false) {
        this.setState({
          name: "",
          dob: "",
          image: null,
          compressed: false,
          compressing: false
        })
      }
    })
  }
  closeForm = (event) =>{
    if (event.target.id === "addPlantForm") {
      this.toggleShowModal()
    }
  }
  form() {
    let image = this.state.imageLarge
    return (
      <div className="w-full max-w-xs">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Plant Name
            </label>
            <input value={this.state.name} onChange={this.nameChangeHandler} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Plant Name" />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              DOB
            </label>
            <input value={this.state.dob} onChange={this.dobChangeHandler} className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="date" />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Image
            </label>
            <input onChange={this.imageOnChangeHandler} accept="image/*" className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="file" />
            {image && (<img src={URL.createObjectURL(image)} style={{ height: '100px', width: 'auto' }} alt={this.state.name} />)}
          </div>
          {/*footer*/}
          <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
            <button
              className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={this.toggleShowModal}
            >
              Close
            </button>

            {this.state.compressed && (
              <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={this.handleSubmit}
              >
                ADD
              </button>
            )}

            {this.state.compressing && (
              <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
              >
                Compressing
              </button>
            )}
          </div>
        </form>
      </div>
    )
  }
  render() {
    let showModal = this.state.showModal
    return (
      <>
        <button
          className="btn-grad m-[10px] py-[15px] px-[45px] text-center uppercase transition-all duration-500 text-white rounded-[10px] block"
          type="button"
          onClick={this.toggleShowModal}
        >
          + Add Plant
        </button>
        {showModal ? (
          <>
            <div onClick={this.closeForm} id='addPlantForm' className="justify-center flex fixed inset-0 z-50 outline-none focus:outline-none bg-black bg-opacity-30 w-full backdrop-blur-sm">
              <div className="relative w-auto my-6 mx-auto max-w-3xl top-16">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-3xl font-semibold">
                      Add Plant
                    </h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={this.toggleShowModal}
                    >
                      <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <div className="relative p-6 flex-auto">
                    {this.form()}
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="opacity-25 fixed inset-0 z-40 bg-black"></div> */}
          </>
        ) : null}
      </>
    )
  }
}

export default AddPlantModal