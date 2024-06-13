import { useEffect, useState } from "react";
import UseAuth from "../../../Hook/UseAuth";
import { API_URL } from "../../../constant";
import { Helmet } from "react-helmet";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

const RecommendationsForMe = () => {
    const { user } = UseAuth();
    const AxiosSecure = useAxiosSecure();
    const [recommendation, setRecommendation] = useState([]);

    useEffect(() => {
        if (user?.email) {
            AxiosSecure.get('/recommendation')
                .then(res => {
                    const otherRecommendation = res.data.filter(re => re.recommenderEmail !== user?.email);
                    setRecommendation(otherRecommendation);
                });
        }
    }, [user?.email]);


    return (
        <div className="w-full md:w-8/12 mx-auto rounded-3xl py-20">
            <Helmet>
                <title>Recommendations For Me - Gadgets Stock React Template</title>
            </Helmet>
            <h1 className="text-2xl pb-5 font-bold">Recommendations For Me <span className='bg-[#ff8717] text-white  text-base px-4 rounded-3xl'>{recommendation.length}</span> </h1>

            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th className='border p-3 text-lg font-bold '>Query Image</th>
                            <th className='border p-3 text-lg font-bold '>Recommender Name</th>
                            <th className='border p-3 text-lg font-bold '>Query Title</th>
                            <th className='border p-3 text-lg font-bold '>Product Name</th>
                            <th className='border p-3 text-lg font-bold '>Recommendation Product</th>
                            <th className='border p-3 text-lg font-bold '>Recommendation Reason</th>
                        </tr>
                    </thead>
                    {
                        recommendation?.map(data => (
                            <tbody key={data._id}>
                                <tr>
                                    <td className='border text-center'>
                                        <img className="w-16" src={data.imageUrl} alt="" />
                                    </td>
                                    <td className='border capitalize'>{data.queryCreator.userName}</td>
                                    <td className='border'>{data.queryTitle}</td>
                                    <td className='border'>{data.productName}</td>
                                    <td className='border'>{data.recommendedProductName}</td>
                                    <td className='border'>{data.recommendationReason.substring(0, 160)}</td>
                                </tr>
                            </tbody>
                        ))
                    }
                </table>
            </div>
        </div>
    );
};

export default RecommendationsForMe;