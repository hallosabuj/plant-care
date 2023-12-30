import logo from '../../assets/logo.png'
import { Bars3Icon, BellIcon, XMarkIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import { NavLink } from 'react-router-dom'

import React, { Component } from 'react'
import axios from 'axios'

class NavBar2 extends Component {
    constructor(props) {
        super(props)
        console.log(window.location.href.split('#')[1])
        this.state = {
            navigation: [
                { name: 'Home', href: '/web' },
                { name: 'Plants', href: '/web/plants' },
                { name: 'My Plants', href: '/web/user/plants' },
                { name: 'Fertilizers', href: '/web/fertilizers' },
                { name: 'Apply Fertilizer', href: '/web/apply-fertilizer' },
                { name: 'Pesticides', href: '/web/pesticides' },
                { name: 'Apply Pesticide', href: '/web/apply-pesticide' },
                { name: 'Disease', href: '/web/disease' },
                { name: 'Swagger-UI', href: '/swagger-ui' },
            ],
            currentPage: (window.location.href.split('#')[1] === "" || window.location.href.split('#')[1] === undefined) ? "/web" : window.location.href.split('#')[1],
            menuOpen: false,

            profileNavigation: [
                { name: 'Profile Information', href: '/web/profile' },
            ],
            profileMenuOpen: false,
        }
    }
    handleFunc = (currentPage) => {
        this.setState({
            currentPage: currentPage
        })
    }

    toggleMenuIcon = () => {
        // Closing profileMenu if it is open
        if (this.state.profileMenuOpen === true) {
            this.setState({
                profileMenuOpen: false
            })
        }
        this.setState({
            menuOpen: !this.state.menuOpen
        })
    }

    toggleProfileMenuIcon = () => {
        // Closing normal menu if it is open
        if (this.state.menuOpen === true) {
            this.setState({
                menuOpen: false
            })
        }
        this.setState({
            profileMenuOpen: !this.state.profileMenuOpen
        })
    }

    signOut = () =>{
        axios.get("/api/signout")
        this.props.toggleSignedIn()
        this.toggleProfileMenuIcon()
    };

    render() {
        return (
            <div as="nav" className="">
                {/* Line 1 */}
                <div className='bg-gray-800 flex justify-between items-center mx-auto relative'>
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
                                return (item.href!="/web/user/plants" || this.props.isSignedIn)&&(
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
                        {this.props.isSignedIn && (
                            <div className='lg:pr-10'>
                                <button
                                    type="button"
                                    className="rounded-full bg-red-800 p-1 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-800"
                                    onClick={this.toggleProfileMenuIcon}
                                >
                                    <UserCircleIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                                </button>
                            </div>
                        )}
                        {!this.props.isSignedIn && (
                            <NavLink
                                key="signin"
                                to="/web/signin"
                                className={this.state.currentPage === "/web/signin" ?
                                    'bg-gray-700 text-white px-3 py-1 rounded-t-[5%] rounded-b-[5%] rounded-l-full rounded-r-full whitespace-nowrap' :
                                    'hover:bg-gray-700 text-gray-400 hover:text-white px-3 py-1 rounded-t-[5%] rounded-b-[5%] rounded-l-full rounded-r-full text-sm font-medium whitespace-nowrap'
                                }
                                onClick={() => this.handleFunc("/web/signin")}
                            > Sing In </NavLink>
                        )}
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
                <div className='flex justify-end'>
                    {(this.state.menuOpen) && (
                        <div className='bg-gray-800 min-w-[200px] top-[70px] flex flex-col gap-1 px-5 pb-3 mr-4 lg:hidden rounded-b-md'>
                            {this.state.navigation.map((item) => {
                                return (item.href!="/web/user/plants" || this.props.isSignedIn)&&(
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
                    )}
                    {this.state.profileMenuOpen && (
                        <div className='bg-gray-800 min-w-[200px] flex flex-col px-5 shadow-lg top-24 mr-6 pb-3 rounded-b-md'>
                            {this.state.profileNavigation.map((item) => {
                                return (
                                    <NavLink
                                        key={item.name}
                                        to={item.href}
                                        className={this.state.currentPage === item.href ?
                                            'bg-gray-700 w-fit text-white px-3 py-1 rounded-t-[5%] rounded-b-[5%] rounded-l-full rounded-r-full' :
                                            'hover:bg-gray-700 w-fit text-gray-300 hover:text-white px-3 py-1 rounded-t-[5%] rounded-b-[5%] rounded-l-full rounded-r-full text-sm font-medium'
                                        }
                                        onClick={() => this.handleFunc(item.href)}
                                    > {item.name} </NavLink>
                                )
                            })}
                            <NavLink onClick={this.signOut} to={'/'} className='hover:bg-gray-700 w-fit text-gray-300 hover:text-white px-3 py-1 rounded-t-[5%] rounded-b-[5%] rounded-l-full rounded-r-full text-sm font-medium'>Sign Out</NavLink>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default NavBar2