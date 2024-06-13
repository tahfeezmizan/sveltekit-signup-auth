import Swal from "sweetalert2";
import UseAuth from "../../../Hook/UseAuth";
import { API_URL } from "../../../constant";

const AddQueries = () => {
    const { user } = UseAuth();
console.log('user form add query', user);

    const handleAddQuries = e => {
        e.preventDefault();
        const email = user.email;
        const userName = user.displayName;
        const userPhoto = user.photoURL;

        const today = new Date();
        const date =  today.getTime(); 
        console. log(date); 
        // const date = today.toLocaleDateString();

        const form = e.target;
        const productName = form.productName.value;
        const brandName = form.brandName.value;
        const imageUrl = form.imageUrl.value;
        const queryTitle = form.queryTitle.value;
        const boycottingReason = form.boycottingReason.value;

        const addQuery = {
            email,
            userName,
            userPhoto,
            productName,
            imageUrl,
            brandName,
            queryTitle,
            boycottingReason,
            date,
        }
        console.log(addQuery)

        fetch(`${API_URL}/queries`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(addQuery)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                if (data.insertedId) {
                    Swal.fire({
                        title: 'success',
                        text: 'Add New Queries',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    })
                    form.reset('')
                }
            })
    }

    return (
        <div className="py-10">
            <div className="w-full md:w-8/12 mx-auto">
                <div className="max-w-screen-md mx-auto rounded-lg p-12">
                    <h1 className="text-2xl md:text-3xl font-bold pb-6">Add New Quries</h1>

                    <form onSubmit={handleAddQuries}>
                        <div className="flex flex-col md:flex-row gap-0 md:gap-8">
                            <div className="flex-1 space-y-2 mb-4">
                                <label className="md:text-lg font-medium">Product Name</label>
                                <input
                                    type="text" name="productName"
                                    placeholder="Product Name"
                                    className="input input-bordered rounded-none w-full max-w-xs"
                                    required
                                />
                            </div>
                            <div className="flex-1 space-y-2 mb-4">
                                <label className="md:text-lg font-medium">Brand Name</label>

                                <input
                                    type="text" name="brandName"
                                    placeholder="Brand Name"
                                    className="input input-bordered rounded-none w-full max-w-xs"
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
                                    className="input input-bordered rounded-none w-full max-w-xs"
                                    required
                                />
                            </div>

                            <div className="flex-1 space-y-2 mb-4">
                                <label className="md:text-lg font-medium">Image Url</label>
                                <input
                                    type="text" name="imageUrl"
                                    placeholder="Product ImageUrl Url"
                                    className="input input-bordered rounded-none w-full max-w-xs"
                                    required
                                />
                            </div>
                        </div>

                        <div className=" space-y-2 mb-4">
                            <label className="md:text-lg font-medium block">Boycotting Reason Details</label>
                            <textarea
                                name='boycottingReason'
                                placeholder="Boycotting Reason Details                                "
                                className="textarea textarea-bordered rounded-none w-full"
                                required></textarea>
                        </div>

                        <div className="form-control my-6">
                            <button className="btn btn-outline bg-[#ff8717] hover:bg-[#eb7d16] border-none rounded-none px-10 text-xl text-white">Add New Query</button>
                        </div>
                    </form>
                </div >
            </div >
        </div>
    );
};

export default AddQueries;