import logo from '../logo.png'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { NavLink } from 'react-router-dom'

import React, { Component } from 'react'

class NavBar2 extends Component {
    constructor(props) {
        super(props)
        console.log(window.location.href.split('#')[1])
        this.state = {
            navigation: [
                { name: 'Home', href: '/web' },
                { name: 'Plants', href: '/web/plants' },
                { name: 'Fertilizers', href: '/web/fertilizers' },
                { name: 'Apply Fertilizer', href: '/web/apply-fertilizer' },
                { name: 'Pesticides', href: '/web/pesticides' },
                { name: 'Apply Pesticide', href: '/web/apply-pesticide' },
                { name: 'Disease', href: '/web/disease' },
                { name: 'Swagger-UI', href: '/swagger-ui' },
            ],
            currentPage: (window.location.href.split('#')[1] === "" || window.location.href.split('#')[1] === undefined) ? "/web" : window.location.href.split('#')[1],
            menuOpen: false
        }
    }
    handleFunc = (currentPage) => {
        this.setState({
            currentPage: currentPage
        })
    }

    toggleMenuIcon = () => {
        this.setState({
            menuOpen: !this.state.menuOpen
        })
    }

    render() {
        return (
            <div as="nav" className="bg-gray-800">
                {/* Line 1 */}
                <div className='flex justify-between items-center mx-auto relative'>
                    {/* Start */}
                    <div className="flex flex-shrink-0 items-center h-[70px] pl-5">
                        <img
                            className="h-8 w-auto lg:block"
                            src={logo}
                            alt="Your Company"
                        />
                    </div>

                    {/* Middle  */}
                    <div className='hidden lg:inline'>
                        <div className='bg-gray-800 w-auto flex items-center gap[4vh] gap-1 px-10'>
                            {this.state.navigation.map((item) => {
                                return (
                                    <NavLink
                                        key={item.name}
                                        to={item.href}
                                        className={this.state.currentPage === item.href ?
                                            'bg-gray-700 text-white px-3 py-1 rounded-t-[5%] rounded-b-[5%] rounded-l-full rounded-r-full whitespace-nowrap' :
                                            'hover:bg-gray-700 text-gray-400 hover:text-white px-3 py-1 rounded-t-[5%] rounded-b-[5%] rounded-l-full rounded-r-full text-sm font-medium whitespace-nowrap'
                                        }
                                        onClick={() => this.handleFunc(item.href)}
                                    > {item.name} </NavLink>
                                )
                            })}
                        </div>
                    </div>

                    {/* End */}
                    <div className="flex items-center gap-2 pr-5">
                        <button
                            type="button"
                            className="rounded-full bg-red-800 p-1 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-800"
                        >
                            <BellIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                        </button>
                        <div className='lg:hidden px-5'>
                            {this.state.menuOpen ? (
                                <XMarkIcon onClick={this.toggleMenuIcon} className="block h-6 w-6 text-gray-400" aria-hidden="true" />
                            ) : (
                                <Bars3Icon onClick={this.toggleMenuIcon} className="block h-6 w-6 text-gray-400" aria-hidden="true" />
                            )}
                        </div>
                    </div>
                </div>

                {/* Line 2 */}
                {(this.state.menuOpen) && (<div className='lg:hidden'>
                    <div className='bg-gray-800 top-[70px] w-full flex flex-col gap-1 px-5 pb-3'>
                        {this.state.navigation.map((item) => {
                            return (
                                <NavLink
                                    key={item.name}
                                    to={item.href}
                                    className={this.state.currentPage === item.href ?
                                        'bg-gray-700 text-white px-3 py-1 rounded-t-[5%] rounded-b-[5%] rounded-l-full rounded-r-full' :
                                        'hover:bg-gray-700 text-gray-300 hover:text-white px-3 py-1 rounded-t-[5%] rounded-b-[5%] rounded-l-full rounded-r-full text-sm font-medium'
                                    }
                                    onClick={() => this.handleFunc(item.href)}
                                > {item.name} </NavLink>
                            )
                        })}
                    </div>
                </div>)}
            </div>
        )
    }
}

export default NavBar2