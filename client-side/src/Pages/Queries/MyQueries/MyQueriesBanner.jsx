import { Link } from 'react-router-dom';
import sliderBg from '../../../assets/slider-bg.jpg';
import { Helmet } from 'react-helmet';

const MyQueriesBanner = () => {
    return (
        <div className="text-center text-6xl py-10" style={{
            backgroundImage: `url(${sliderBg})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
        }}>
            <Helmet>
                <title>My Queries - Gadgets Stock React Template</title>
            </Helmet>
            <div className="w-full lg:w-5/6 xl:w-8/12 mx-auto px-2 lg:px-0 py-10 md:py-12 lg:py-20">
                <h1 className="font-medium font-Jost pb-4 text-white" >My Queries</h1>
                <Link to='/addqueries'>
                    <button className='btn btn-outline border-[#ff8717] hover:bg-[#eb7d16] rounded-none px-10 text-xl text-white'>Add New Queries</button>
                </Link>
            </div>
        </div>
    );
};

export default MyQueriesBanner;