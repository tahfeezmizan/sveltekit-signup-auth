import sponsors from '../../assets/1.webp'
import sponsors1 from '../../assets/2.webp'
import sponsors2 from '../../assets/3.webp'
import sponsors4 from '../../assets/4.webp'

const Sponsors = () => {
    return (
        <div className='w-full lg:w-5/6 xl:w-8/12 mx-auto px-2 lg:px-0 py-10 md:py-12 lg:py-20'>
            <div className="flex flex-col gap-10 md:flex-row items-center justify-around py-20 rounded-2xl border">
                <img className='grayscale hover:grayscale-0 duration-300' src={sponsors} alt="" />
                <img className='grayscale hover:grayscale-0 duration-300' src={sponsors1} alt="" />
                <img className='grayscale hover:grayscale-0 duration-300' src={sponsors2} alt="" />
                <img className='grayscale hover:grayscale-0 duration-300' src={sponsors4} alt="" />
            </div>
        </div>
    );
};

export default Sponsors;