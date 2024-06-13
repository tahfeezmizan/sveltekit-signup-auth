import React from 'react';
import { CiCalendarDate } from 'react-icons/ci';
import { Link } from 'react-router-dom';

const MyQueriesCard = ({ data, handleDelete }) => {
    const { _id, userName, userPhoto, productName, imageUrl, brandName, queryTitle, date, boycottingReason } = data;

    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure className="bg-gray-100">
                <div className="h-64 overflow-hidden border-red-600">
                    <img className="w-full p-3 h-full object-contain transition-transform transform hover:scale-105 duration-500 ease-in-out" src={imageUrl} alt="" />
                </div>
            </figure>
            <div className="card-body">
                <p className="text-gray-500 flex items-center gap-2 font-Jost "><span className="text-lg"><CiCalendarDate /></span> {date}</p>
                <h2 className="text-xl card-title font-Jost pb-2 capitalize font-medium">{queryTitle}</h2>

                <p className="pb-2" title={boycottingReason}>{boycottingReason.substring(0, 75)}...</p>

                <div className="flex items-center gap-6 pb-4 border-b">
                    <p className="">Brand Name: <span className="font-semibold"> <br /> {brandName}</span></p>
                    <p className="">Product Name: <span className="font-semibold"> <br /> {productName}</span></p>
                </div>
                <div className="flex items-center justify-between gap-3 pt-4 pb-2">
                    <button onClick={() => handleDelete(_id)} className='btn btn-outline rounded-none btn-error btn-sm hover:text-white'>Delete</button>
                    <Link to={`/updatequeries/${_id}`}>
                        <button className='btn btn-outline rounded-none btn-sm btn-info'>Update</button>
                    </Link>
                    <Link to={`/queriesDetails/${_id}`}>
                        <button className='btn btn-outline rounded-none btn-sm btn-primary'>View Details</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MyQueriesCard;