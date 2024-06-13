import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';

const UseAuth = () => {
    const contextData = useContext(AuthContext);
    return contextData;
};

export default UseAuth;