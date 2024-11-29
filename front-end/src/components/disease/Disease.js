import React, { Component } from 'react'
import './Disease.css';

class Disease extends Component {
  render() {
    return (
      <div>
        <div className='flex justify-center items-center relative p-10'>
          <div id="hello" className='h-24 w-24 rounded-[50%] text-2xl flex justify-center items-center' style={{background: 'conic-gradient(#00ff00 var(--fill), transparent var(--fill))', transition:'--fill 0.6s ease-in-out'}}>Hello</div>
        </div>
      </div>
    )
  }
}

export default Disease