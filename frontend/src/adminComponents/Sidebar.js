import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import "../css/admin.css";

export default function Sidebar() {
    return (
        <aside id="logo-sidebar" className="AppSideBar w-64 h-screen pt-3 transition-transform -translate-x-full bg-gray-300 border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
            {/* <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar"> */}
            <div className="h-full px-3 pb-4 overflow-y-auto bg-transparent dark:bg-gray-800">
                <ul className="space-y-6 font-medium">
                    <li >
                        <Link to="/canteens" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <svg className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" viewBox="0 0 100 100" aria-hidden="true" fill="currentColor" xmlns="http://www.w3.org/2000/svg" id="users">
                                <path d="M78.2 58.2C81.1 55.8 83 52.1 83 48c0-6.9-5.6-13-12-13s-12 6.1-12 13c0 4.1 1.9 7.8 4.8 10.2-1.3.5-2.5 1-3.7 1.7-3.8-4.5-8.8-8-14.6-9.7C49.9 47.1 53 41.8 53 36c0-9.1-7.5-17-16-17s-16 7.9-16 17c0 5.8 3.1 11.1 7.5 14.2C16.1 53.9 7 65.4 7 79c0 1.1.9 2 2 2h82c1.1 0 2-.9 2-2 0-9.6-6.2-17.8-14.8-20.8zM63 48c0-4.2 3.5-9 8-9s8 4.8 8 9-3.5 9-8 9-8-4.8-8-9zM25 36c0-6.1 5.1-13 12-13s12 6.9 12 13-5.1 13-12 13-12-6.9-12-13zM11.1 77c1-13.4 12.3-24 25.9-24 13.7 0 24.9 10.6 25.9 24H11.1zm55.8 0c-.3-5-1.9-9.8-4.5-13.8C65 61.8 67.9 61 71 61c9.3 0 16.9 7 17.9 16h-22z"></path>
                                <path d="M1084-790V894H-700V-790h1784m8-8H-708V902h1800V-798z"></path>
                            </svg>
                            <span className="ml-3">Canteens</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/products" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">

                            <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" id="event-available">
                                <path fill="none" d="M0 0h24v24H0V0z"></path>
                                <path d="M16 10.53c-.29-.29-.77-.29-1.06 0l-4.35 4.35L9 13.29c-.29-.29-.77-.29-1.06 0-.29.29-.29.77 0 1.06l1.94 1.94c.39.39 1.02.39 1.41 0l4.7-4.7c.3-.29.3-.77.01-1.06zM19 3h-1V2c0-.55-.45-1-1-1s-1 .45-1 1v1H8V2c0-.55-.45-1-1-1s-1 .45-1 1v1H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 16H6c-.55 0-1-.45-1-1V8h14v10c0 .55-.45 1-1 1z"></path>
                            </svg>
                            <span className="flex-1 ml-3 whitespace-nowrap">Products</span>
                        </Link>
                    </li>
                   
                </ul>
            </div>
        </aside>)
}
