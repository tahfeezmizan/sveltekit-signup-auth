import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
import UseAuth from "../../Hook/UseAuth";
import { API_URL } from "../../constant";

const AddRecommendation = ({ card }) => {
    const { user } = UseAuth();

    const handleAddRecommendation = e => {
        e.preventDefault();
        const today = new Date();
        const form = e.target;

        const recommenderEmail = user.email;
        const recommenderName = user.displayName;
        const date = today.toLocaleDateString();

        const recommendationTitle = form.recommendationTitle.value;
        const recommendedProductName = form.recommendedProductName.value;
        const recommendedImage = form.recommendedImage.value;
        const recommendationReason = form.recommendationReason.value;

        //query data and query creator data
        const queryId = card?._id;
        const userEmail = card?.email;
        const userName = card?.userName;
        const queryTitle = card?.queryTitle;
        const productName = card?.productName;
        const imageUrl = card?.imageUrl;

        const recommendation = {
            recommenderEmail, recommenderName, date, recommendationTitle, recommendedProductName, recommendedImage, recommendationReason, queryId, queryTitle, productName, imageUrl,
            queryCreator: {
                userEmail, userName,
            }
        }
        console.table(recommendation)

        fetch(`${API_URL}/recommendation`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(recommendation)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                if (data.insertedId) {
                    Swal.fire({
                        title: 'success',
                        text: 'Add New Recommendations',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    })
                    form.reset('')
                }
            })
    }

    return (
        <div className="">
            <Helmet>
                <title>Add Recommendation - Gadgets Stock React Template</title>
            </Helmet>
            <div className="max-w-screen-md mx-auto border rounded-lg p-12">
                <h1 className="text-2xl font-medium pb-5">Add Recommendation</h1>

                <form onSubmit={handleAddRecommendation}>
                    <div className="space-y-2 mb-4">
                        <label className="font-medium block">Recommendation Title</label>
                        <input
                            type="text" name="recommendationTitle"
                            placeholder="Recommendation Title"
                            className="input input-bordered rounded-none w-full"
                            required
                        />
                    </div>
                    <div className="flex-1 space-y-2 mb-4">
                        <label className="font-medium block">Recommended product Name</label>

                        <input
                            type="text" name="recommendedProductName"
                            placeholder="Recommended product Name"
                            className="input input-bordered rounded-none w-full"
                            required
                        />
                    </div>
                    <div className="flex-1 space-y-2 mb-4">
                        <label className="font-medium block">Recommended Product Image</label>
                        <input
                            type="text" name="recommendedImage"
                            placeholder="Recommended Product Image"
                            className="input input-bordered rounded-none w-full"
                            required
                        />
                    </div>
                    <div className=" space-y-2 mb-4">
                        <label className="font-medium block">Recommendation reason</label>
                        <textarea
                            name='recommendationReason'
                            placeholder="Recommendation Reason"
                            className="textarea textarea-bordered rounded-none w-full"
                            required></textarea>
                    </div>


                    <button className="btn bg-[#ff8717] hover:bg-[#eb7d16] border-none rounded-none text-white px-10 text-xl">
                        Add Recommendation
                    </button>

                </form>
            </div >
        </div >
    );
};

export default AddRecommendation;