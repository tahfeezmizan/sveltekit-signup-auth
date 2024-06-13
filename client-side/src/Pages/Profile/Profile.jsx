import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import UseAuth from '../../Hook/UseAuth';

const Profile = () => {
    const { user, userProfileUpdate } = UseAuth();
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [photoURL, setPhotoURL] = useState('');

    useEffect(() => {
        if (user) {
            setDisplayName(user.displayName || '');
            setEmail(user.email || '');
            setPhotoURL(user.photoURL || '');
        }
    }, [user]);

    const handleUpdateProfile = (e) => {
        e.preventDefault();
        let updatedProfile = {
            displayName,
            email,
            photoURL
        };

        userProfileUpdate(displayName, photoURL)
            .then((result) => {
                toast.success('Profile updated successfully!');
                // console.log(result);
            })
            .catch((error) => {
                // console.error('Error updating profile:', error);
                toast.error('Failed to update profile. Please try again.');
            });
    };

    if (!user) {
        return <p>Loading profile...</p>;
    }
    return (
        <div className="">
            <div className='w-full my lg:w-9/12 xl:w-8/12 mx-auto px-3 py-32 md:px-0'>
                <Helmet>
                    <title>Profile - Trip Rex React Template</title>
                </Helmet>
                <div className="w-full sm:w-3/5 mx-auto bg-base-200 text-center p-5 md:p-10 lg:p-14 rounded-lg">
                    <img src={photoURL} alt="Profile" className='mx-auto rounded-full w-32 h-32 object-cover mb-4' />
                    <h2 className='text-2xl sm:text-3xl lg:text-4xl'>{displayName}</h2>
                    <p className="text-sm sm:text-base mb-4">{email}</p>

                    {/* Update Profile Form */}
                    <form onSubmit={handleUpdateProfile} className="text-left w-full sm:w-96 mx-auto">
                        <label htmlFor="displayName" className="block font-medium">Display Name:</label>
                        <input
                            type="text"
                            id="displayName"
                            placeholder='Change Name'
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            className="w-full border rounded-md p-2 mb-4"
                        />

                        <label htmlFor="photoURL" className="block font-medium">Photo URL:</label>
                        <input
                            type="text"
                            id="photoURL"
                            placeholder='Add New Photo'
                            value={photoURL}
                            onChange={(e) => setPhotoURL(e.target.value)}
                            className="w-full border rounded-md p-2 mb-4"
                        />

                        <div className="flex flex-col sm:flex-row justify-between items-center">
                            <button type="submit" className="btn bg-[#ff8717] hover:bg-[#eb7d16] border-none rounded-none text-white px-4 sm:px-6 lg:px-10 py-2 sm:py-3 text-base sm:text-xl">
                                Update Profile
                            </button>
                            <button className="btn bg-[#ff8717] hover:bg-[#eb7d16] border-none rounded-none text-white px-4 sm:px-6 lg:px-10 py-2 sm:py-3 text-base sm:text-xl mt-2 sm:mt-0">
                                Connect
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
