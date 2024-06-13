import { useEffect, useState } from "react";
import { CiCalendarDate } from "react-icons/ci";
import { Link } from "react-router-dom";
import UseAuth from "../../Hook/UseAuth";
import useAxiosSecure from "../../Hook/useAxiosSecure";

const QueriesCard = ({ data, layout }) => {
    const { user } = UseAuth();
    const AxiosSecure = useAxiosSecure();
    const [reCount, setReCount] = useState({});
    const { _id, userName, userPhoto, productName, imageUrl, brandName, queryTitle, date, boycottingReason } = data;

    const formattedDate = new Date(date);
    const issueDate = `${formattedDate.getMonth() + 1}/${formattedDate.getDate()}/${formattedDate.getFullYear()}`;

    useEffect(() => {
        if (user?.email) {
            AxiosSecure.get(`/recommendation/${user?.email}`)
                .then(res => {
                    const count = res?.data?.filter(re => re.queryTitle === queryTitle);
                    setReCount(count);
                });
        }
    }, [user?.email, queryTitle]);

    return (
        <Link to={`/queriesDetails/${_id}`}>
            <div className="card bg-base-100 shadow-xl rounded-xl overflow-hidden">
                <div className={`${layout}`}>
                    <figure className="bg-gray-100">
                        <p title="Recommendation Count" className="absolute top-5 left-5 p-1 px-3 border-2 z-10 border-[#ff8717]">{reCount?.length > 0 ? reCount?.length : '0'}</p>
                        <div className="h-64 overflow-hidden border-red-600">
                            <img className="w-full p-3 h-full object-contain transition-transform transform hover:scale-105 duration-500 ease-in-out" src={imageUrl} alt="" />
                        </div>
                    </figure>
                    <div className="card-body">
                        <p className="text-gray-500 flex items-center gap-2 font-Jost"><span className="text-lg"><CiCalendarDate /></span> {issueDate}</p>
                        <h2 className="text-xl card-title font-Jost capitalize my-1 font-medium" title={queryTitle}>{queryTitle?.substring(0, 30)}...</h2>
                        {boycottingReason && (
                            <p className="pb-2" title={boycottingReason}>Alternation Reason:
                                <span className="font-semibold">{boycottingReason?.substring(0, 50)}...</span>
                            </p>
                        )}
                        <div className="flex items-center gap-6 pb-4 border-b">
                            <p className="">Brand Name: <span className="font-semibold"> <br /> {brandName}</span></p>
                            <p className="">Product Name: <span className="font-semibold"> <br /> {productName?.substring(0, 30)}</span></p>
                        </div>

                        <div className="flex items-center justify-between gap-3 pt-4 ">
                            <div className="flex gap-3 items-center ">
                                <img src={userPhoto} className="rounded-full w-10" alt="" />
                                <div className="">
                                    <h2 className="font-semibold text-sm font-Jost capitalize">{userName}</h2>
                                    <p className="text-gray-500 text-sm">UnKnown</p>
                                </div>
                            </div>
                            <Link to={`/queriesDetails/${_id}`}>
                                <button className="btn bg-[#ff8717] hover:bg-[#eb7d16] text-white rounded-none btn-sm text-lg font-Jost">Recomandation</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default QueriesCard;
