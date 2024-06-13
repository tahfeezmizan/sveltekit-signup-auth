import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import BlogsCard from "./BlogsCard";

const Blogs = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const AxiosSecure = useAxiosSecure();

    useEffect(() => {
        AxiosSecure.get(`/blog-post`)
            .then(res => {
                setData(res.data);
                setIsLoading(false);
            });
    }, []);

    return (
        <div className="hero bg-base-200">
            <div className="w-full lg:w-5/6 xl:w-8/12 mx-auto px-2 lg:px-0 py-10 md:py-12 lg:py-20">

                <div className="my-10">
                    <h2 className="text-3xl md:text-5xl font-Jost font-bold pb-5">Latest Blog</h2>
                    <p className="font-Roboto text-lg">There are many variations of passages of Lorem Ipsum available</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 mt-10 gap-10 sm:mb-4 md:mb-4">
                    {
                        data?.map(data => <BlogsCard
                            data={data}
                            key={data._id}
                        ></BlogsCard>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Blogs;