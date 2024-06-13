import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { API_URL } from "../../../constant";

const UpdateQueries = () => {
    const [data, setData] = useState([]);
    const { id } = useParams()
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${API_URL}/findupdatequeries/${id}`)
            .then(res => res.json())
            .then(data => {
                setData(data)
                // console.log(data);
            })
    }, [])

    const handleUpdateQuries = e => {
        e.preventDefault();
        // const today = new Date();
        // const date = today.toLocaleDateString();
        const form = e.target;
        const productName = form.productName.value;
        const brandName = form.brandName.value;
        const imageUrl = form.imageUrl.value;
        const queryTitle = form.queryTitle.value;
        const boycottingReason = form.boycottingReason.value;

        const updateQuery = {
            productName, imageUrl, brandName, queryTitle, boycottingReason,
        }
        console.log(updateQuery);

        // update method
        fetch(`${API_URL}/queriesupdate/${id}`, {
            method: 'PATCH',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(updateQuery)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        title: 'success',
                        text: 'Queries Update Successfully',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    })
                    navigate('/myqueries')
                }
            })
    }

    return (
        <div className="py-10">
            <div className="w-full md:w-8/12 mx-auto">
                <div className="max-w-screen-md mx-auto border rounded-lg p-12">
                    <h1 className="text-2xl md:text-5xl text-center font-bold pb-5">Add New Quries</h1>

                    <form onSubmit={handleUpdateQuries}>
                        <div className="flex flex-col md:flex-row gap-0 md:gap-8">
                            <div className="flex-1 space-y-2 mb-4">
                                <label className="md:text-lg font-medium">Product Name</label>
                                <input
                                    type="text" name="productName"
                                    placeholder="Product Name"
                                    defaultValue={data.productName}
                                    className="input input-bordered font-semibold w-full max-w-xs"
                                    required
                                />
                            </div>
                            <div className="flex-1 space-y-2 mb-4">
                                <label className="md:text-lg font-medium">Brand Name</label>

                                <input
                                    type="text" name="brandName"
                                    placeholder="Brand Name"
                                    defaultValue={data.brandName}
                                    className="input input-bordered w-full max-w-xs"
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row gap-0 md:gap-8">
                            <div className="flex-1 space-y-2 mb-4">
                                <label className="md:text-lg font-medium">Queries Title</label>
                                <input
                                    type="text" name="queryTitle"
                                    placeholder="Query Title"
                                    defaultValue={data.queryTitle}
                                    className="input input-bordered w-full max-w-xs"
                                    required
                                />
                            </div>
                            <div className="flex-1 space-y-2 mb-4">
                                <label className="md:text-lg font-medium">Image Url</label>
                                <input
                                    type="text" name="imageUrl"
                                    placeholder="Product ImageUrl Url"
                                    defaultValue={data.imageUrl}
                                    className="input input-bordered w-full max-w-xs"
                                    required
                                />
                            </div>
                        </div>
                        <div className=" space-y-2 mb-4">
                            <label className="md:text-lg font-medium block">Boycotting Reason Details</label>
                            <textarea
                                name='boycottingReason'
                                placeholder="Boycotting Reason Details"
                                defaultValue={data.boycottingReason}
                                className="textarea textarea-bordered  w-full"
                                required></textarea>
                        </div>
                        <div className="form-control my-6">
                            <button className="btn btn-outline btn-warning rounded-none px-10 text-xl text-white">Update Query</button>
                        </div>
                    </form>
                </div >
            </div >
        </div>
    );
};

export default UpdateQueries;