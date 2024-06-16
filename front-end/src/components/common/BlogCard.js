import React, { Component } from 'react'

export class BlogCard extends Component {
  render() {
    return (
      <div className='relative max-w-1 overflow-hidden rounded-2xl shadow-lg group mt-4'>
        <img alt='Blog Image' className=' transition-transform group-hover:scale-110 duration-200 w-[100%] h-96 object-cover' src={this.props.imgsrc} />
        <div className=' absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent'>
            <div className='p-4 text-white'>
                <h1 className=' text-xl font-bold m-2'>Hibiscus</h1>
                Hibiscus is a genus of flowering plants in the mallow family, Malvaceae. 
            </div>
        </div>
      </div>
    )
  }
}

export default BlogCard