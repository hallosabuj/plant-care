import axios from 'axios'
import React, { Component } from 'react'
import AddFertilizerModal from './Modals/AddFertilizerModal'
import FertilizerCard from './FertilizerCard'
import { useNavigate } from 'react-router-dom'

const Fertilizers = (props) =>{
    const navigate = useNavigate()
    return (<FertilizersClass navigate={navigate}/>)
}

class FertilizersClass extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         fertilizers:null
      }
      this.reRenderOnAddOrDelete = this.reRenderOnAddOrDelete.bind(this)
    }
    async getFertilizers(){
        const headers = {
            'Authorization': localStorage.getItem("token")
        };
        let fertilizers=await axios.get("/api/user/fertilizer", {headers}).then((response)=>{
            console.log(response)
            this.setState({
                fertilizers:response.data
            })
        }).catch(function(error) {
            console.log(error);
            if(error.response.status === 401){
                localStorage.setItem("isSignedIn", false)
                localStorage.removeItem("token")
            }
        });
        console.log(fertilizers)
    }
    componentDidMount(){
        // If it's not logged in then redirect to home page
        if(!localStorage.getItem("isSignedIn")){
            this.props.navigate('/');
        }
        this.getFertilizers()
    }
    reRenderOnAddOrDelete(){
        this.getFertilizers()
    }
    render() {
        return (
            <div className='lg:pl-14 lg:pr-14 md:pl-14 md:pr-14 pl-3 pr-3'>
                {(localStorage.getItem('isSignedIn') === 'true') && (<div className="relative flex pt-2 px-2 justify-end">
                    <div className='sm:ml-6 sm:block flex'>
                        <AddFertilizerModal reRenderOnAdd={this.reRenderOnAddOrDelete}/>
                    </div>
                </div>)}
                <div className='grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2 gap-x-3'>
                    {/* Short Circuit to check null */}
                    {this.state.fertilizers && this.state.fertilizers.map((fertilizer,index)=>(
                        <FertilizerCard key={fertilizer.fertilizerId} fertilizer={fertilizer} reRenderOnDelete={this.reRenderOnAddOrDelete}/>
                    ))}
                </div>
            </div>
        )
    }
}

export default Fertilizers