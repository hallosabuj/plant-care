import axios from 'axios'
import React, { Component } from 'react'

class AddPlantModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: "",
      dob: "",
      image: null,
      showModal: false
    }
  }
  handleSubmit = async (event) => {
    console.log(this.state)
    console.log("Handling form submit")
    const formData = new FormData()
    formData.append("name", this.state.name)
    formData.append("dob", this.state.dob)
    formData.append("image", this.state.image)
    await axios.post("/plant", formData).then(()=>{
      this.props.reRenderOnAdd()
    }).catch((error) => {
      console.log(error)
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
  imageOnChangeHandler = (event) => {
    this.setState({
      image: event.target.files[0]
    })
  }
  toggleShowModal = () => {
    this.setState({
      showModal: !this.state.showModal
    }, () => {
      console.log(this.state)
    })
  }
  form() {
    let image = this.state.image
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
            <input onChange={this.imageOnChangeHandler} className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="file" />
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
            <button
              className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={this.handleSubmit}
            >
              ADD
            </button>
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
          className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          onClick={this.toggleShowModal}
        >
          + Add Plant
        </button>
        {showModal ? (
          <>
            <div
              className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
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
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </>
    )
  }
}

export default AddPlantModal