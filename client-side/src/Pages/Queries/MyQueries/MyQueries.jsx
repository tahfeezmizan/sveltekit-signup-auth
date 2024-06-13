import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import UseAuth from "../../../Hook/UseAuth";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { API_URL } from "../../../constant";
import MyQueriesCard from "./MyQueriesCard";


const MyQueries = () => {
    const { user } = UseAuth();
    const [card, setCard] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const AxiosSecure = useAxiosSecure();

    useEffect(() => {
        AxiosSecure.get(`/queriesuser?email=${user?.email}`)
            .then(res => {
                setCard(res.data);
                setIsLoading(false)
            })

    }, []);


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
                fetch(`${API_URL}/queriesuser/${id}`, {
                    method: 'DELETE',
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your Queries has been deleted.",
                                icon: "success"
                            });
                            const remaining = card.filter(item => item._id !== id);
                            setCard(remaining)
                        }
                    })
            }
        });
    };


    return (
        <div className="hero bg-base-200">
            <div className="w-full lg:w-5/6 xl:w-8/12 mx-auto px-2 lg:px-0 py-10 md:py-12 lg:py-20">
                <div className="my-10">
                    <h2 className="text-3xl md:text-5xl font-bold pl-2">My Queries</h2>
                </div>

                {isLoading ? (
                    <div className="w-full flex justify-center items-center">
                        <span className="loading loading-spinner text-error text-5xl"></span>
                    </div>)
                    : card.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                            {
                                card?.map(data => <MyQueriesCard
                                    key={data._id} data={data}
                                    handleDelete={handleDelete}
                                ></MyQueriesCard>)
                            }
                        </div>)
                        : (
                            <h2 className="text-center text-4xl font-bold font-Jost ">You have no queries.</h2>
                        )
                }
            </div>
        </div>
    );
};

export default MyQueries;