import React, { Component } from 'react'
import first from '../assets/home/1.jpg'
import second from '../assets/home/2.jpg'
import third from '../assets/home/3.jpg'
import caring from '../assets/home/caring_plant4.jpg'
import BlogCard from './common/BlogCard'
import plant from '../assets/home/caring_plant2.jpg'
import { NavLink } from 'react-router-dom'

class Home extends Component {
  constructor(){
    super()
  }
  render() {
    return (
      <div>
        {/* Title for the website */}
        <div className=' bg-black bg-opacity-20 h-auto w-full md:px-16 px-8 flex flex-wrap justify-evenly items-center'>
          <div className='h-full md:w-2/5 mb-4 mt-4 hover:scale-105 transition-all duration-300 rounded-[3%] shadow-gray-600 shadow-md overflow-hidden'>
            <img src={caring} />
          </div>
          <div className='h-full md:w-2/5 italic text-lg'>
            At <span className='font-bold'>Plant Care</span>, we believe that anyone can become a plant parent! Whether you're a seasoned gardener or just starting your plant journey, we're here to help your indoor jungle thrive. Our comprehensive guides cover everything from choosing the right plants for your space to expert tips on watering, light, and soil needs. Join our community to discover the joy of plant care and watch your greenery flourish.
          </div>
        </div>
        {/* Div containing three images animation */}
        <div className='h-[400px] w-full md:px-16 px-8 pt-3 pb-8'>
          <div className='w-full mb-2 text-2xl font-bold font-serif italic'>Growing Happiness, One Plant at a Time</div>
          <div className='flex w-full h-[90%]'>
            <div className='h-full w-1/3 hover:w-3/5 transition-all duration-500 overflow-hidden flex justify-center items-center'>
              <img alt='first' src={first} className='w-[100%] h-96 object-cover'/>
            </div>
            <div className='h-full w-1/3 hover:w-3/5 transition-all duration-500 overflow-hidden flex justify-center items-center'>
              <img alt='second' src={second} className='w-[100%] h-96 object-cover'/>
            </div>
            <div className='h-full w-1/3 hover:w-3/5 transition-all duration-500 overflow-hidden flex justify-center items-center'>
              <img alt='third' src={third} className='w-[100%] h-96 object-cover'/>
            </div>
          </div>
        </div>

        {/* Div containing list of blogs */}
        <div className='bg-black bg-opacity-20 h-auto w-full md:px-16 px-8 pt-3 pb-8'>
          <div className=' font-serif font-bold italic text-emerald-950 text-2xl'>Checkout our blogs ...</div>
          <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:space-x-8 md:space-x-2'>
            <BlogCard imgsrc={plant}/> <BlogCard imgsrc={caring}/> <BlogCard imgsrc={plant}/>
          </div>
          <div className='flex justify-end mt-2 pr-2'>
            <NavLink to='/web/blogs' className='text-2xl font-bold text-black bg-blue-400 hover:bg-blue-900 hover:text-blue-50 w-auto inline-block p-2 pl-8 pr-8 rounded-lg border-b-cyan-300 border-b-4 hover:scale-105 transition-all duration-200'>Find out more &#8811; </NavLink>
          </div>
        </div>
      </div>
    )
  }
}

export default Home