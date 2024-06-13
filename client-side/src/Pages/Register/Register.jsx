import { useEffect, useState } from "react";
import UseAuth from "../../Hook/UseAuth";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

const Register = () => {
    const { createUser, user, userProfileUpdate, isLoading, logOut } = UseAuth();
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [navigate, user]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        const { email, password, name, photoURL } = data;
        console.log(data)

        createUser(email, password)
            .then(result => {
                const registerData = result?.user;
                userProfileUpdate(name, photoURL)
                    .then(() => {
                        logOut()
                        toast.success('User Register Sucessfully')
                        navigate('/login')
                    })
            })
            .catch(error => {
                const errorMessage = error.message;
                toast.error(`${errorMessage}`)
            });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    if (user || isLoading) return

    return (
        <div className="w-full md:w-8/12 mx-auto rounded-3xl py-20">
            <Helmet>
                <title>Register - Gadgets Stock React Template</title>
            </Helmet>
            <div className="w-5/6 mx-auto rounded-xl overflow-hidden flex flex-col md:flex-row justify-between items-center shadow-2xl bg-base-100">
                <div className="flex-1">
                    <img src='https://images.pexels.com/photos/1251834/pexels-photo-1251834.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt="" />
                </div>
                <div className="flex-1">
                    <div className="card shrink-0 w-full max-w-lg p-10 ">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <p className="">Welcome</p>
                            <h1 className="text-5xl font-bold">Sing Up</h1>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    type="text"
                                    name="name" placeholder="Enter Your Name"
                                    className="input input-bordered"
                                    {...register("name", { required: true })}
                                />
                                {errors.name && <span className="text-xs text-red-500">Name is required</span>}
                                {/* {errors.name && toast.success('Name')} */}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter Your Email"
                                    className="input input-bordered"

                                    {...register("email", { required: true })}
                                />
                                {errors.email && <span className="text-xs text-red-500">Email is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input
                                    type="text"
                                    name="photoURL"
                                    placeholder="Photo URL"
                                    className="input input-bordered"
                                    {...register("photoURL")}
                                />
                                {/* {errors.photoURL && toast.success('Photo Url')} */}
                                {errors.photoURL && <span className="text-xs text-red-500"></span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <div className="relative input input-bordered flex items-center">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="Enter Your Password"
                                        className="w-4/5"
                                        {...register("password", {
                                            required: "Password is required",
                                            minLength: {
                                                value: 6,
                                                message: "Password must have at least 6 characters"
                                            },
                                            validate: {
                                                hasUppercase: value => /[A-Z]/.test(value) || "Password must contain at least one uppercase letter",
                                                hasLowercase: value => /[a-z]/.test(value) || "Password must contain at least one lowercase letter",
                                                hasNumber: value => /[0-9]/.test(value) || "Password must have at least 1 Number"
                                            }
                                        })}
                                    />
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute inset-y-0 right-4 flex items-center"
                                    >
                                        {showPassword ? <FaRegEyeSlash className="h-6 w-6 text-gray-500" /> : <FaRegEye className="h-6 w-6 text-gray-500" />}
                                    </button>
                                </div>
                                {errors.password && <span className="text-xs text-red-500">{errors?.password?.message}</span>}
                            </div>
                            <div className="form-control my-6">
                                <button type="submit" className="btn bg-[#ff8717] hover:bg-[#eb7d16] border-none rounded-none text-white text-xl font-bold">Create An Account</button>
                            </div>
                            <h3 className="text-center ">Have an account? <Link to="/login" className="text-blue-600 hover:text-[#d01818] font-bold ">Sing In</Link></h3>
                        </form>

                    </div>
                </div>


            </div>
        </div>
    );
};

export default Register;