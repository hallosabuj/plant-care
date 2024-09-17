import React, { Component } from 'react'
import axios  from 'axios'
import PesticideCard from './PesticideCard'
import AddPesticideModal from './Modals/AddPesticideModal'
import { useNavigate } from 'react-router-dom'

const Pesticides = (props) =>{
    const navigate = useNavigate()
    return (<PesticidesClass navigate={navigate}/>)
}

class PesticidesClass extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       pesticides:null
    }
    this.reRenderOnAddOrDelete=this.reRenderOnAddOrDelete.bind(this)
  }
  async getPesticides(){
      const headers = {
        'Authorization': localStorage.getItem("token")
      };
      let pesticides=await axios.get("/api/user/pesticide", {headers}).then((response)=>{
          console.log(response)
          this.setState({
            pesticides:response.data
          })
      }).catch(function(error) {
          console.log(error);
          if(error.response.status === 401){
            localStorage.setItem("isSignedIn", false)
            localStorage.removeItem("token")
          }
      });
      console.log(pesticides)
  }
  componentDidMount(){
    // If it's not logged in then redirect to home page
    if(!localStorage.getItem("isSignedIn")){
        this.props.navigate('/');
    }
    this.getPesticides()
  }
  reRenderOnAddOrDelete(){
      this.getPesticides()
  }
  render() {
    return (
        <div className='lg:pl-14 lg:pr-14 md:pl-14 md:pr-14 pl-3 pr-3'>
            <div className="relative flex pt-2 px-2 justify-end">
                <div className='sm:ml-6 sm:block flex'>
                    <AddPesticideModal reRenderOnAdd={this.reRenderOnAddOrDelete}/>
                </div>
            </div>
            <div className='grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2 gap-x-3'>
                {/* Short Circuit to check null */}
                {this.state.pesticides && this.state.pesticides.map((pesticide,index)=>(
                    <PesticideCard key={pesticide.pesticideId} pesticide={pesticide} reRenderOnDelete={this.reRenderOnAddOrDelete}/>
                ))}
            </div>
        </div>
      )
  }
}

export default Pesticides