import { Helmet } from 'react-helmet';
import sliderBg from '../../assets/slider-bg.jpg';

const QueriesBanner = () => {
    return (
        <div className="text-center text-6xl py-10" style={{
            backgroundImage: `url(${sliderBg})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
        }}>
            <Helmet>
                <title>All Queries - Gadgets Stock React Template</title>
            </Helmet>
            <div className="w-full lg:w-5/6 xl:w-8/12 mx-auto px-2 lg:px-0 py-10 md:py-12 lg:py-20">
                <h1 className="font-medium font-Jost pb-4 text-white" >All Queries</h1>
            </div>
        </div>
    );
};

export default QueriesBanner;