import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { productValidator } from "../validator/authValidator"
import userService from '../services/userService';


export const productTemplate = {
    _id: '',
    name: " ",
    salesRate: 0.00,
    description: '',
    unit: 'nos',
    quantity: 0,
    threshold: 0,
    rawItem: false,
};
export default function AddProduct() {

    const SystemVariables = useSelector((state) => state.SystemVariables);
    const currentUser = useSelector((state) => state.CurrentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [productDetails, setProductDetails] = useState(productTemplate);

    const { id } = useParams();

    useEffect(() => {
        console.log("id : ", id);
        if (id != undefined) {
            userService.getProductDetails(id).then((res) => {
                const product = res.product;
                console.log("product : ", product);
                setProductDetails(product);
            }).catch((error) => {
                console.log("error : ", error);
            })
        }
    }, [id]);



    const handelProductUpload = () => {
        console.log('Form Data:', productDetails);
        const { error } = productValidator.validate(productDetails);
        if (error) {
            toast.error(error.toString());
            return;
        }

        const updateProductPromise = userService.updateProductDetails(productDetails);

        updateProductPromise.then((res) => {
            if (id == undefined) {
                setProductDetails(productTemplate);  
            }
        }).then((err) => {
            console.log(err);
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

    };
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        // console.log("handleInputChange name : ", name)
        setProductDetails((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setProductDetails({
            ...productDetails,
            [name]: checked,
        });
    };


    return (
        <div className=" flex flex-col shadow-md sm:rounded-lg">
            <h1 className='text-3xl mx-auto font-medium text-gray-900 dark:text-white'>Product Entry </h1>
            <hr className='mt-2' />
            <div className='m-1 p-5 flex flex-col'>

                <div className='flex flex-col'>
                    <h3 className='mt-4 my-3 mx-auto text-2xl font-medium text-gray-900 dark:text-white'>Product Details</h3>
                    <hr className='w-48 h-1 my-3 mx-auto bg-gray-300 border-0 rounded md:mt-2 md:mb-4 dark:bg-gray-700' />
                    <div className="my-3 grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-6 group">
                            <input onChange={handleInputChange} value={productDetails.name} type="text" name="name" id="name" className="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required />
                            <label htmlFor="name" className="peer-focus:font-medium absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-100 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Product Name</label>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <input onChange={handleInputChange} value={productDetails.salesRate} type="text" name="salesRate" id="salesRate" className="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required />
                            <label htmlFor="salesRate" className="peer-focus:font-medium absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-100 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">salesRate</label>
                        </div>
                    </div>
                    <div className="my-3 grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-6 group">
                            <textarea onChange={handleInputChange} value={String(productDetails.description)} name="description" id="description" className="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required ></textarea>
                            <label htmlFor="description" className="peer-focus:font-medium absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-100 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Description</label>
                        </div>
                        <div className="mt-4 mb-6 px-5 flex items-center">
                            <input
                                type="checkbox"
                                name="rawItem"
                                id="rawItem"
                                checked={productDetails.rawItem}
                                onChange={handleCheckboxChange}
                                className="mr-2 text-blue-700 dark:text-blue-500 focus:outline-none"
                            />
                            <label
                                htmlFor="rawItem"
                                className="text-sm text-gray-900 dark:text-white cursor-pointer"
                            >
                                Raw item ?
                            </label>
                        </div>
                    </div>
                    <div className="my-3 grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-6 group">
                            <input onChange={handleInputChange} value={productDetails.threshold} type="text" name="threshold" id="threshold" className="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required />
                            <label htmlFor="threshold" className="peer-focus:font-medium absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-100 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">threshold</label>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            {/* <input onChange={handleInputChange} value={productDetails.unit} type="text" name="unit" id="unit" className="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required /> */}

                            <select onChange={handleInputChange} defaultValue={"-"} name='unit' id="unit" className="bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                {Object.values(SystemVariables.UNITS).map((unit, index) => (
                                    <option key={index} value={unit.toString()}>
                                        {unit}
                                    </option>
                                ))}
                            </select>
                            {/* <label htmlFor="unit" className="peer-focus:font-medium absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-100 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">unit</label> */}

                        </div>
                    </div>
                </div>

                <div className='flex flex-row justify-center'>
                    <button type="button" onClick={handelProductUpload} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xl w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
                </div>
            </div>
        </div>
    )
}
