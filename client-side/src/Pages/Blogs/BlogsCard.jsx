import { CiCalendarDate } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";

const BlogsCard = ({ data }) => {
    const { image, date, blogtitle, description, blogAuthor } = data;

    return (
        <div class="card bg-base-100 p-6 rounded-md border border-solid border-dark-5">
            <div className="flex flex-col md:flex-row gap-10 md:gap-2">
                <img src={image} className="w-full md:w-56" alt="" />
                <div class="px-3 flex flex-col justify-between">
                    <div className="flex justify-between pb-3">
                        <p class="flex gap-2 items-center font-Roboto"><CiCalendarDate /> {date}</p>
                        <p class="flex gap-2 items-center font-Roboto"><FaRegUser /> {blogAuthor}</p>
                    </div>

                    <div className="">
                        <h3 class="text-2xl font-bold mb-6 font-Jost">{blogtitle}</h3>
                        <p class="leading-7 mb-6 font-Roboto text-justify">{description.substring(0, 134)}...</p>
                    </div>
                    <button class="btn hover:bg-[#eb7d16] hover:border-[#ff8717] border-[#ff8717] btn-outline rounded-none text-lg font-Jost">Learn More</button>
                </div>
            </div>
        </div>
    );
};

export default BlogsCard;