import React from 'react';
import { NavLink } from 'react-router-dom';
import sitelogo from '../../../assets/site-logo.png'
import { FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="footer py-16 xl:py-28 bg-base-100 text-base-content">
            <div className="w-full px-4 md:px-0 md:w-8/12 mx-auto">
                <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-12 justify-center gap-8 xl:gap-10">
                    {/* Services Links */}
                    <div className="col-span-2 xl:col-span-3">
                        <NavLink className="text-xl uppercase Sitelogo pb-10">
                            <img src={sitelogo} className="w-48" alt="" />
                        </NavLink>

                        <p className="py-6 text-base font-Roboto">Sed ut perspiciatis undmnis is iste natus error sit amet voluptatem totam rem aperiam.</p>
                        <p className="">+012 (345) 678 99</p>
                    </div>


                    {/* Services Links */}
                    <div className="col-span-1 xl:col-span-3 text-center xl:text-start">
                        <nav className="flex flex-col">
                            <header className="text-lg font-bold mb-4">Support</header>

                            <a href="#" className="link text-base leading-10 link-hover">Help Center</a>
                            <a href="#" className="link text-base leading-10 link-hover">Our COVID-19 Response</a>
                            <a href="#" className="link text-base leading-10 link-hover">Cancellation options</a>
                            <a href="#" className="link text-base leading-10 link-hover">Safety information</a>
                        </nav>
                    </div>

                    {/* Company Links */}
                    <div className="col-span-1 xl:col-span-2 text-center xl:text-start">
                        <nav className="flex flex-col">
                            <header className="text-lg font-bold mb-4">Company</header>

                            <a href="#" className="link text-base leading-10 link-hover">About us</a>
                            <a href="#" className="link text-base leading-10 link-hover">Community Blog</a>
                            <a href="#" className="link text-base leading-10 link-hover">Careers</a>
                            <a href="#" className="link text-base leading-10 link-hover">Privacy policy</a>
                        </nav>
                    </div>

                    {/* Legal Links */}
                    <div className="col-span-1 xl:col-span-2 text-center xl:text-start">
                        <nav className="flex flex-col">
                            <header className="text-lg font-bold mb-4">Contact</header>

                            <a href="#" className="link text-base leading-10 link-hover">Partnerships</a>
                            <a href="#" className="link text-base leading-10 link-hover">FAQ</a>
                            <a href="#" className="link text-base leading-10 link-hover">Get in touch</a>
                        </nav>
                    </div>

                    {/* Follow Us On */}
                    <div className="col-span-1 xl:col-span-2 text-center xl:text-start">
                        <nav className="flex flex-col">
                            <header className="text-lg font-bold mb-6">Follow Us On</header>

                            <div className="flex items-center gap-8 text-xl text-white mb-5">
                                <p className="bg-[#ff8717] rounded-full p-2"><FaFacebook /></p>
                                <p className="bg-[#ff8717] rounded-full p-2"><FaLinkedin /></p>
                                <p className="bg-[#ff8717] rounded-full p-2"><FaTwitter /></p>
                            </div>
                            <p className="font-Roboto">Copyright © 2020 Gadgest</p>
                        </nav>
                    </div>

                </div>
            </div>
        </footer>
    );
};

export default Footer;