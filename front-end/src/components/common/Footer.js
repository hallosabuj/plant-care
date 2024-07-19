import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

class Footer extends Component {
  render() {
    return (
      <div className="p-4 rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 bg-gray-800">
        <div className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2022 <a href="#" className="hover:underline">Plant Care™</a>. All Rights Reserved.
        </div>
        <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <NavLink to="/web/about" className="mr-4 hover:underline md:mr-6 ">About</NavLink>
          </li>
          <li>
            <NavLink to="/web/privacy-policy" className="mr-4 hover:underline md:mr-6">Privacy Policy</NavLink>
          </li>
          <li>
            <NavLink to="/web/contact" className="hover:underline">Contact</NavLink>
          </li>
        </ul>
      </div>
    )
  }
}

export default Footer