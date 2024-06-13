import { Swiper, SwiperSlide } from 'swiper/react';
import sliderBg from '../../assets/slider-bg.jpg';
import slider1 from '../../assets/jbl-headphone.png';
import slider2 from '../../assets/hero-2.png';
import slider3 from '../../assets/surface-laptop.png';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Helmet } from 'react-helmet';

const Banner = () => {
    return (
        <div>
            <Helmet>
                <title>Home - Gadgets Stock React Template</title>
            </Helmet>
            <Swiper
                Autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                loop={true}
                direction={'vertical'}
                pagination={{
                    clickable: true,
                }}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper homeBanner"
            >
                <SwiperSlide
                    style={{
                        backgroundImage: `url(${sliderBg})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',

                    }}
                >
                    <div className="h-full  flex items-center"  >
                        <div className="w-full md:w-8/12 mx-auto">
                            <div className="flex flex-col lg:flex-row px-10 md:px-0 justify-between items-center gap-10">
                                <div className="flex-1 flex items-center justify-center">
                                    <img src={slider1} className='hidden md:block' alt="" />
                                </div>
                                <div className="flex-1">
                                    <h4 className='text-gray-400 text-2xl font-medium md:text-xl my-4'>Experience the Unseen!</h4>
                                    <h1 className='text-white text-2xl md:text-6xl pr-0 lg:pr-40 mb-8 font-Jost font-bold leading-10 md:leading-tight'>Find the Perfect Electronics Solutions!</h1>
                                    <p></p>
                                    <button className='btn btn-outline border-[#ff8717] hover:bg-[#eb7d16] rounded-none px-10 text-xl text-white'>Shop Now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide
                    style={{
                        backgroundImage: `url(${sliderBg})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',

                    }}
                >
                    <div className="h-full  flex items-center"  >
                        <div className="w-full md:w-8/12 mx-auto">
                            <div className="flex justify-between items-center gap-10">
                                <div className="flex-1">
                                    <img src={slider2} className='hidden md:block' alt="" />
                                </div>
                                <div className="flex-1">
                                    <h4 className='text-gray-400 text-2xl font-medium md:text-xl my-4'>Experience the Unseen!</h4>
                                    <h1 className='text-white text-2xl md:text-5xl mb-8 font-Jost font-bold  leading-10 md:leading-tight'>Discover the Right Electronics for Your Lifestyle.</h1>
                                    <p></p>
                                    <button className='btn btn-outline border-[#ff8717] hover:bg-[#eb7d16] rounded-none px-10 text-xl text-white'>Shop Now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide
                    style={{
                        backgroundImage: `url(${sliderBg})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',

                    }}
                >
                    <div className="h-full  flex items-center"  >
                        <div className="w-full md:w-8/12 mx-auto">
                            <div className="flex justify-between items-center gap-10">
                                <div className="flex-1">
                                    <img src={slider3} className='hidden md:block'  alt="" />
                                </div>
                                <div className="flex-1">
                                    <h4 className='text-gray-400 text-2xl font-medium md:text-xl my-4'>Experience the Unseen!</h4>
                                    <h1 className='text-white text-2xl md:text-6xl  pr-40 mb-8 font-Jost font-bold leading-10 md:leading-tight'>Your Ultimate Destination for Electronic Excellence!</h1>
                                    <p></p>
                                    <button className='btn btn-outline border-[#ff8717] hover:bg-[#eb7d16] rounded-none px-10 text-xl text-white'>Shop Now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper >
        </div>
    );
};

export default Banner;