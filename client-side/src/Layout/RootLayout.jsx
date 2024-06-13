import React from 'react';
import { Outlet, useNavigation } from "react-router-dom";
import Navbar from '../Pages/Shared/Navbar/Navbar';
import Footer from '../Pages/Shared/Footer/Footer';

const RootLayout = () => {
    const navigation = useNavigation();
    return (
        <div>
            <Navbar></Navbar>
            {
                navigation.state === 'loading' ? <span className="loading loading-spinner text-error"></span>
                    : <Outlet></Outlet>
            }
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;