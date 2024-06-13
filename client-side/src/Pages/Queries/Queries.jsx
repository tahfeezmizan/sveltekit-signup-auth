import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../Hook/useAxiosSecure';
import QueriesCard from './QueriesCard';
import Blogs from '../Blogs/Blogs';
import { IoGridOutline, IoList } from 'react-icons/io5';

const Queries = () => {
    const AxiosSecure = useAxiosSecure();
    const [card, setCard] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [gridLayout, setGridLayout] = useState('lg:grid-cols-3');

    useEffect(() => {
        AxiosSecure.get(`/queries`)
            .then(res => {
                setCard(res.data);
                setIsLoading(false);
            });
    }, []);

    const handleGridLayoutChange = (layout) => {
        setGridLayout(layout);
    };

    const handleChange = (event) => {
        setSearchText(event.target.value);
    };

    const handleSearch = () => {
        if (searchText.length !== 0) {
            AxiosSecure.get(`/queries/${searchText}`)
                .then(res => {
                    setCard(res.data);
                });
        }
        else {
            AxiosSecure.get(`/queries`)
                .then(res => {
                    setCard(res.data);
                    setIsLoading(false);
                });
        }
    };

    return (
        <>
            <div className="hero bg-base-200">
                <div className="w-full lg:w-5/6 xl:w-8/12 mx-auto px-2 lg:px-0 py-10 md:py-12 lg:py-20">
                    <div className="my-10 flex flex-col md:flex-row justify-between items-center gap-6">
                        <h2 className="text-3xl md:text-5xl font-bold pl-2">All Queries</h2>
                        <div className="flex gap-5 items-center">
                            <button className='btn bg-[#ff8717] hover:bg-[#eb7d16] text-white text-xl  rounded-none' onClick={() => handleGridLayoutChange('grid-cols-2')}><IoList /></button>
                            <button className='btn bg-[#ff8717] hover:bg-[#eb7d16] text-white text-xl  rounded-none' onClick={() => handleGridLayoutChange('grid-cols-3')}><IoGridOutline /></button>

                            <div className='flex items-center'>
                                <input
                                    type="text"
                                    name='search'
                                    placeholder="Search"
                                    className="input input-bordered outline-none border-none rounded-none "
                                    value={searchText}
                                    onChange={handleChange}
                                />
                                <button className='btn bg-[#ff8717] hover:bg-[#eb7d16] text-white text-xl rounded-none' onClick={handleSearch}>Search</button>
                            </div>

                        </div>
                    </div>

                    {isLoading ?
                        <div className="w-full flex justify-center items-center">
                            <span className="loading loading-spinner text-error text-5xl"></span>
                        </div> :
                        <div className={`grid ${gridLayout} gap-10`}>
                        {
                            card?.map(data => (
                                <QueriesCard
                                    data={data}
                                    key={data._id}
                                    layout={gridLayout === 'grid-cols-2' ? 'flex' : 'flex-col'}
                                />
                            ))}
                    </div>
                    }
                </div>
            </div>
            <Blogs></Blogs>
        </>
    );
};

export default Queries;
