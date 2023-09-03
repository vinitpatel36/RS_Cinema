import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import userService from '../services/userService'
import toast from 'react-hot-toast';

export default function Product() {

    const [products, setProducts] = useState([]);

    const navigate = useNavigate();
    useEffect(() => {

        const productPromise = userService.getAllProducts();

        productPromise.then((res) => {
            console.log("products response : ", res);
            if (res.products) {
                setProducts(res.products);
            }
        }).catch((err) => {
            console.log("error : ", err);
        })


    }, [])


    const navigateToBack = () => {
        navigate("/product")
    }

    function handleActualProductRemove(id) {

        console.log("you said yes");
        // return;
        const updateProductPromise = userService.removeProductDetails(id);
        updateProductPromise.then((res) => {
            const updatedProducts = products.filter(product => product._id !== id)  ;
            setProducts(updatedProducts);
        })
        toast.promise(
            updateProductPromise,
            {
                loading: 'please wait while we updating Product',
                success: (data) => data.message,
                error: (err) => err,
            },
            {
                style: {
                    minWidth: '250px',
                },
                success: {
                    duration: 5000,
                    icon: '🔥',
                },
                error: {
                    duration: 5000,
                    icon: '🔥',
                },
            }
        );
    }

    function handelProductDelete(id) {
        console.log('handelProductDelete start:');
        toast.custom((t) => (
            <div
                className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
                <div className="flex-1 w-0 p-4">
                    <div className="flex items-start">
                        <div className="ml-3 flex-1">
                            <p className="text-sm text-red-900 font-medium text-gray-900">
                                are you sure to remove this product
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row border-l p-2 border-gray-200">
                    <button
                        onClick={() => {
                            handleActualProductRemove(id);
                            toast.dismiss(t.id);
                        }}
                        className="w-full mx-1 border border-transparent rounded-none rounded-r-lg  text-sm font-medium text-red-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        Yes
                    </button>
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="w-full mx-1 border border-transparent rounded-none rounded-r-lg text-sm font-medium text-green-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        No
                    </button>
                </div>
            </div>
        ));

    };


    return (
        <div >
            <nav className="bg-gray-500 border-gray-200 dark:bg-gray-900">
                <div className="flex  bg-gray-300 dark:bg-gray-900 flex-wrap items-center justify-between mx-auto px-3 py-1">
                    <div className='flex flex-row justify-start'>
                        <div className="flex md:order-2 mx-2">
                            <div className='bg-gray-300 dark:bg-gray-900'>
                                <Link to={"/addProduct"} className="block py-2 pl-3 pr-4 bg-gray-300 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Add</Link>
                            </div>
                        </div>
                        {/* <div className="flex md:order-2 mx-2">
                            <div className='bg-gray-300 dark:bg-gray-900'>
                                <Link to={"/addEvent"} className="block py-2 pl-3 pr-4 bg-gray-300 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Add</Link>
                            </div>
                        </div> */}
                    </div>
                    <div className="flex md:order-2">
                        <button type="button" data-collapse-toggle="navbar-search" aria-controls="navbar-search" aria-expanded="false" className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1" >
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                            <span className="sr-only">Search</span>
                        </button>
                        <div className="relative hidden md:block">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                                <span className="sr-only">Search icon</span>
                            </div>
                            <input type="text" id="search-navbar" className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." />
                        </div>
                    </div>

                </div>
            </nav>

            <div className='flex flex-col pt-4 px-3 '>
                <h1 className='mx-auto uppercase text-2xl font-medium text-gray-900 dark:text-white' >Products details</h1>
                {products != undefined ?
                    <div className="mt-4 relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-xl text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xl text-gray-700 uppercase  dark:text-gray-400">
                                <tr className='mb-2 border-b border-gray-200 dark:border-gray-600'>
                                    <th scope="col" className="px-6 py-3 bg-gray-100 dark:bg-gray-800">
                                        Product name
                                    </th>
                                    <th scope="col" className="px-6 py-3 dark:text-white dark:bg-gray-700">
                                        salesRate
                                    </th>
                                    <th scope="col" className="px-6 py-3 dark:text-white dark:bg-gray-700">
                                        Row Item
                                    </th>
                                    <th scope="col" className="px-6 py-3 bg-gray-100 dark:bg-gray-800">
                                        quantity
                                    </th>
                                    <th scope="col" className="px-6 py-3 dark:text-white dark:bg-gray-700">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                    <th scope="col" className="px-6 py-3 dark:text-white dark:bg-gray-700">
                                        <span className="sr-only">Remove</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="">
                                {products.map((product) => {
                                    return (
                                        <tr key={product._id} className="border-b border-gray-200 dark:border-gray-600">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                                {product.name}
                                            </th>
                                            <td className="px-6 py-4 dark:text-white dark:bg-gray-700">
                                                {product.salesRate}
                                            </td>
                                            
                                            <td className="px-6 py-4 dark:text-white dark:bg-gray-700">
                                                {product.rawItem ? "yes" : "no"}
                                            </td>
                                            <td className="px-6 py-4 bg-gray-100 dark:bg-gray-800">
                                                {product.quantity}
                                            </td>
                                            <td className="px-6 py-4 text-right dark:text-white dark:bg-gray-700">
                                                <div onClick={() => { navigate("/addProduct/" + product._id); }} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</div>
                                            </td>
                                            <td className="px-6 py-4 text-right dark:text-white dark:bg-gray-700">
                                                <div onClick={() => { handelProductDelete(product._id) }} className="font-medium text-red-600 dark:text-red-500 hover:underline">remove</div>
                                            </td>
                                        </tr>)
                                })
                                }

                            </tbody>
                        </table>
                    </div>
                    : <div> there is no product</div>}
            </div>
        </div>
    )
}
