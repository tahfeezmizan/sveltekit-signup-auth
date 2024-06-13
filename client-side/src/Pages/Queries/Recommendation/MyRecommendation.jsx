import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';
import { RxCross2 } from 'react-icons/rx';
import { API_URL } from '../../../constant';
import UseAuth from '../../../Hook/UseAuth';
import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../Hook/useAxiosSecure';

const MyRecommendation = () => {
    const { user } = UseAuth();
    const AxiosSecure = useAxiosSecure();
    const [recommendation, setRecommendation] = useState([]);

    useEffect(() => {
        if (user?.email) {
            AxiosSecure.get(`/recommendation/${user?.email}`)
                .then(res => {
                    setRecommendation(res.data);
                })
        }
    }, [user?.email]);

    const handleDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${API_URL}/recommendation/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your Recommendations has been deleted.",
                                icon: "success"
                            });
                            const remaining = recommendation.filter(recom => recom._id !== id);
                            setRecommendation(remaining)
                        }
                    })
            }
        });
    }

    return (
        <div className="w-full md:w-8/12 mx-auto rounded-3xl py-20">
            <Helmet>
                <title>My Recommendation - Gadgets Stock React Template</title>
            </Helmet>
            <h1 className="text-2xl pb-5 font-bold">My Recommendation <span className='bg-[#ff8717] text-white  text-base px-4 rounded-3xl'>{recommendation.length}</span> </h1>

            <div className="overflow-x-auto">
                {recommendation?.length > 0 ? (
                    <table className="table">
                        <thead>
                            <tr>
                                <th className='border p-3 text-lg font-bold '>Query Image</th>
                                <th className='border p-3 text-lg font-bold '>Query Title</th>
                                <th className='border p-3 text-lg font-bold '>Product Name</th>
                                <th className='border p-3 text-lg font-bold '>Recommendation Product</th>
                                <th className='border p-3 text-lg font-bold '>Recommendation Reason</th>
                                <th className='border p-3 text-lg font-bold '>Delete</th>
                            </tr>
                        </thead>
                        {
                            recommendation?.map(data => (
                                <tbody key={data._id}>
                                    <tr>
                                        <td className='border'><img className="w-16" src={data.imageUrl} alt="" /></td>
                                        <td className='border'>{data.queryTitle}</td>
                                        <td className='border'>{data.productName}</td>
                                        <td className='border'>{data.recommendedProductName}</td>
                                        <td className='border'>{data.recommendationReason.substring(0, 130)}</td>
                                        <th className='border'>
                                            <button className="btn rounded-full" onClick={() => handleDelete(data._id)}><RxCross2 /></button>
                                        </th>
                                    </tr>
                                </tbody>
                            ))
                        }
                    </table>
                )
                    : (
                        <h2 className="text-center text-4xl font-bold font-Jost ">You have no Recommendation</h2>
                    )
                }
            </div>
        </div >
    );
};

export default MyRecommendation;