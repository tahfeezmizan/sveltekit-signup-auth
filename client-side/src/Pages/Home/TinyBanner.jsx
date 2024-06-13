import { Link } from 'react-router-dom';
import bannerImg from '../../assets/breadcrunb-bg.webp'

const TinyBanner = () => {
    return (
        <div className="text-center text-6xl py-10" style={{
            backgroundImage: `url(${bannerImg})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
        }}>

            <div className="w-full lg:w-5/6 xl:w-8/12 mx-auto px-2 lg:px-0 py-10 md:py-12 lg:py-20">
                <h2 className="text-xl md:text-5xl font-Roboto pb-5">Explore Queries</h2>
                <h1 className="text-2xl  md:text-6xl font-bold  font-Jost" >For You Recommendation</h1>
                <button className="btn bg-[#ff8717] hover:bg-[#eb7d16] border-none rounded-none text-white px-10 text-xl">
                    <Link to="/queries">See All Queries</Link>
                </button>
            </div>
        </div>
    );
};
export default TinyBanner;