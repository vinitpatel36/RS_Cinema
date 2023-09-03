import React from 'react'
import { useNavigate } from 'react-router-dom'
import authService from '../services/auth.service';
import logo from "../logo192.png"


export default function Navbar() {

    const navigate = useNavigate();

    function logout() {
        authService.logout();
        navigate("/");
        window.location.reload();
    }

    function openCommonSettingPage() {
        navigate("/settings");
    }

    function openUserProfile() {
        navigate("/profile");
    }

    return (
        <nav className="MyNavbar py-2 z-50 w-full bg-gray-500 border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <div className="px-3 lg:px-5 lg:pl-3">
                <div className="flex items-center justify-between">
                    <div className=" flex items-center justify-start">
                        <a href="/" className="flex ml-2 md:mr-24">
                            <img src={logo} className="h-8 mr-3" alt="Raj Cinema" />
                            <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">Raj Cinema</span>
                        </a>
                    </div>
                    <div className="flex items-center">
                        <div className="flex items-center ml-3">
                            <div className='mx-3' >
                                <button type="button" title="Settings" onClick={() => { openCommonSettingPage(); }} className="px-2 flex text-sm text-dark dark:text-white rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" >
                                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                                        <path className="fill-current text-black dark:text-sky-800" d="M47.16,21.221l-5.91-0.966c-0.346-1.186-0.819-2.326-1.411-3.405l3.45-4.917c0.279-0.397,0.231-0.938-0.112-1.282 l-3.889-3.887c-0.347-0.346-0.893-0.391-1.291-0.104l-4.843,3.481c-1.089-0.602-2.239-1.08-3.432-1.427l-1.031-5.886 C28.607,2.35,28.192,2,27.706,2h-5.5c-0.49,0-0.908,0.355-0.987,0.839l-0.956,5.854c-1.2,0.345-2.352,0.818-3.437,1.412l-4.83-3.45 c-0.399-0.285-0.942-0.239-1.289,0.106L6.82,10.648c-0.343,0.343-0.391,0.883-0.112,1.28l3.399,4.863 c-0.605,1.095-1.087,2.254-1.438,3.46l-5.831,0.971c-0.482,0.08-0.836,0.498-0.836,0.986v5.5c0,0.485,0.348,0.9,0.825,0.985 l5.831,1.034c0.349,1.203,0.831,2.362,1.438,3.46l-3.441,4.813c-0.284,0.397-0.239,0.942,0.106,1.289l3.888,3.891 c0.343,0.343,0.884,0.391,1.281,0.112l4.87-3.411c1.093,0.601,2.248,1.078,3.445,1.424l0.976,5.861C21.3,47.647,21.717,48,22.206,48 h5.5c0.485,0,0.9-0.348,0.984-0.825l1.045-5.89c1.199-0.353,2.348-0.833,3.43-1.435l4.905,3.441 c0.398,0.281,0.938,0.232,1.282-0.111l3.888-3.891c0.346-0.347,0.391-0.894,0.104-1.292l-3.498-4.857 c0.593-1.08,1.064-2.222,1.407-3.408l5.918-1.039c0.479-0.084,0.827-0.5,0.827-0.985v-5.5C47.999,21.718,47.644,21.3,47.16,21.221z M25,32c-3.866,0-7-3.134-7-7c0-3.866,3.134-7,7-7s7,3.134,7,7C32,28.866,28.866,32,25,32z"></path>
                                    </svg>
                                </button>
                            </div>
                            <div className='mx-3'>
                                <button title="Profile" type="button" onClick={() => { openUserProfile(); }} className="px-2 flex text-sm bg-transparent rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" >
                                    {/* <img className="w-8 h-8 rounded-full" src="https://massengeruserprofileimage.s3.ap-south-1.amazonaws.com/general-contact-icon.jpg" alt={userDetail.name} /> */}
                                    <svg className="w-8 h-8 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" id="user" viewBox='0 0 512 512'>
                                        <path className="fill-current text-black dark:text-sky-800" d="M256 256c52.805 0 96-43.201 96-96s-43.195-96-96-96-96 43.201-96 96 43.195 96 96 96zm0 48c-63.598 0-192 32.402-192 96v48h384v-48c0-63.598-128.402-96-192-96z"></path>
                                    </svg>

                                </button>
                            </div>
                            <div className='mx-3'>
                                <button title="Logout" type='button' onClick={() => { logout(); }} className="px-2 flex text-sm text-dark dark:text-white rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600">
                                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                        <path className="fill-current text-black dark:text-sky-800" d="m366.863 323.883 22.627 22.627L480 256l-90.51-90.51-22.628 22.628L418.745 240H192v32h226.745z"></path>
                                        <path className="fill-current text-black dark:text-sky-800" d="M391.491 391.766C355.229 428.029 307.018 448 255.736 448c-51.287 0-99.506-19.971-135.772-56.235C83.697 355.501 64 307.285 64 256c0-51.281 19.697-99.495 55.965-135.761C156.232 83.973 204.45 64 255.736 64c51.279 0 99.491 19.973 135.755 56.238a196.044 196.044 0 0 1 7.333 7.762h40.731c-40.474-58.028-107.709-96-183.819-96C132.021 32 32 132.298 32 256c0 123.715 100.021 224 223.736 224 76.112 0 143.35-37.97 183.822-96h-40.73a194.792 194.792 0 0 1-7.337 7.766z"></path></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}
