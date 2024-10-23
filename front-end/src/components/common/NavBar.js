import logo from '../../assets/logo.png'
import { Bars3Icon, XMarkIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import { NavLink } from 'react-router-dom'

import React, { Component } from 'react'
import axios from 'axios'
import './NavBar.css';

class NavBar2 extends Component {
    constructor(props) {
        super(props)
        console.log(window.location.href.split('#')[1])
        this.state = {
            navigation: [
                { name: 'Home',             href: '/web' ,                      public: true},
                { name: 'Plants',           href: '/web/plants',                public: true },
                { name: 'My Plants',        href: '/web/user/plants',           public: false },
                { name: 'Fertilizers',      href: '/web/user/fertilizers',      public: false },
                { name: 'Apply Fertilizer', href: '/web/user/apply-fertilizer', public: false },
                { name: 'Pesticides',       href: '/web/user/pesticides',       public: false },
                { name: 'Apply Pesticide',  href: '/web/user/apply-pesticide',  public: false },
                { name: 'Disease',          href: '/web/disease',               public: true },
                { name: 'Blogs',            href: '/web/blogs',                 public: true },
                { name: 'Swagger-UI',       href: '/swagger-ui',                public: true },
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
        localStorage.setItem("isSignedIn", false)
        localStorage.removeItem("token")
        this.toggleProfileMenuIcon()
    };

    render() {
        return (
            <div as="nav" className="sticky -top-3 w-full z-[1000]">
                {/* Line 1 */}
                <div className='bg-gray-800 flex justify-between items-center mx-auto overflow-scroll scrollbar-hide shadow-md shadow-slate-600'>
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
                        <div className='bg-gray-700 md:h-11 w-auto flex items-center px-10 rounded-md'>
                            {this.state.navigation.map((item) => {
                                return (item.public || (localStorage.getItem("isSignedIn")==='true'))&&(
                                    <NavLink
                                        key={item.name}
                                        to={item.href}
                                        className={this.state.currentPage === item.href ?
                                            'bg-gray-500 h-full text-amber-200 px-3 whitespace-nowrap flex items-center transition-all delay-200 border-blue-50 border-b' :
                                            'hover:bg-gray-700 hover:flex hover:items-center h-full text-gray-400 hover:text-amber-100 px-3 whitespace-nowrap pt-1 transition-colors delay-150'
                                        }
                                        onClick={() => this.handleFunc(item.href)}
                                    > <div>{item.name}</div> </NavLink>
                                )
                            })}
                        </div>
                    </div>

                    {/* End */}
                    <div className="flex items-center gap-2 pr-5">
                        {(localStorage.getItem("isSignedIn")==='true') && (
                            <div className='lg:pr-10'>
                                <div className="profile-menu-icon p-[2px] rounded-[50%] flex justify-center items-center">
                                <button
                                    type="button"
                                    className="rounded-full bg-red-800 p-1 focus:outline-none"
                                    onClick={this.toggleProfileMenuIcon}
                                >
                                    <UserCircleIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                                </button>
                                </div>
                            </div>
                        )}
                        {!(localStorage.getItem("isSignedIn")==='true') && (
                            <NavLink
                                key="signin"
                                to="/web/signin"
                                className={this.state.currentPage === "/web/signin" ?
                                    'bg-gray-700 text-white px-3 py-1 rounded-t-full rounded-b-full whitespace-nowrap' :
                                    'hover:bg-gray-700 text-gray-400 hover:text-white px-3 py-1 rounded-t-full rounded-b-full text-sm font-medium whitespace-nowrap'
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
                <div className='flex justify-end absolute right-1'>
                    {(this.state.menuOpen) && (
                        <div className='bg-gray-800 min-w-[200px] top-[70px] flex flex-col px-5 pb-3 mr-4 lg:hidden rounded-b-md'>
                            {this.state.navigation.map((item) => {
                                return (item.public || (localStorage.getItem("isSignedIn")==='true'))&&(
                                    <NavLink
                                        key={item.name}
                                        to={item.href}
                                        className={this.state.currentPage === item.href ?
                                            'bg-gray-500 text-amber-200 px-3 py-1 border-b border-blue-50' :
                                            'hover:bg-gray-600 text-gray-300 hover:text-amber-100 px-5 hover:px-3 py-1'
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
                                            'bg-gray-500 w-fit text-amber-200 px-3 py-1 border-b border-blue-50' :
                                            'hover:bg-gray-600 w-fit text-gray-300 hover:text-amber-100 px-5 hover:px-3 py-1'
                                        }
                                        onClick={() => this.handleFunc(item.href)}
                                    > {item.name} </NavLink>
                                )
                            })}
                            <NavLink onClick={this.signOut} to={'/'} className='hover:bg-gray-700 w-fit text-gray-300 hover:text-amber-100 px-3 py-1'>Sign Out</NavLink>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default NavBar2