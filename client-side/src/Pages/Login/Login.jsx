import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import UseAuth from "../../Hook/UseAuth";
import { API_URL } from "../../constant";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const Login = () => {
    const { logInUser, googleLogin, user, isLoading } = UseAuth();
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state || '/'

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
        const { email, password } = data;

        logInUser(email, password)
            .then(result => {
                const loggedUser = result.loggedUser;
                toast.success('Congrs! Login Sucessfull');
                navigate(from)

                const user = { email };
                axios.post(`${API_URL}/jwt`, user)
                    .then(res => {
                        if (res.data.success) {
                        }
                    })
            })
            .catch(error => {
                const errorText = error.message;
                const errorMessage = errorText.slice(22, 40);
                toast.error(`${errorMessage}`)
            });
    }
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="w-full md:w-8/12 mx-auto rounded-3xl py-20">
            <Helmet>
                <title>Login - Gadgets Stock React Template</title>
            </Helmet>
            <div className="w-4/6 mx-auto rounded-xl overflow-hidden flex flex-col md:flex-row justify-between items-center shadow-2xl bg-base-100">
                <div className="flex-1">
                    <div className="card shrink-0 w-full max-w-lg p-10 ">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <p className="">Welcome Back</p>
                            <h1 className="text-5xl font-bold">Log In</h1>
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
                                    <span className="label-text">Password</span>
                                </label>
                                <div className="relative input input-bordered flex items-center">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="Enter Your Password"
                                        className="w-4/5"
                                        {...register("password", { required: true })}
                                    />
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute inset-y-0 right-4 flex items-center"
                                    >
                                        {showPassword ? <FaRegEyeSlash className="h-6 w-6 text-gray-500" /> : <FaRegEye className="h-6 w-6 text-gray-500" />}
                                    </button>
                                </div>
                                {errors.password && <span className="text-xs text-red-500">Password is required</span>}
                            </div>
                            <div className="form-control pt-5">
                                <button className="btn bg-[#ff8717] hover:bg-[#eb7d16] border-none rounded-none text-white text-xl font-bold">Login</button>
                            </div>
                        </form>
                        {/* third party login method */}
                        <div className="text-center">
                            <div className="divider pb-3">or connected with</div>
                            <div className=''>
                                <button
                                    onClick={() => googleLogin()
                                        .then(result => {
                                            const user = { email };
                                            toast.success('Congrs! Google Login Sucessfull');
                                            // navigate(location?.state ? location.state : '/');

                                            axios.post(`${API_URL}/jwt`, user)
                                                .then(res => {
                                                    navigate(from)
                                                    console.log(res.data);
                                                })
                                        })
                                        .catch((error) => {
                                            const errorText = error.message;
                                            console.log(errorText);
                                            const errorMessage = errorText.slice(0, 200);
                                            toast.error(errorMessage)
                                        })
                                    }
                                    className='btn btn-sm text-2xl rounded-3xl px-6 bg-transparent hover:bg-transparent '><FcGoogle />
                                </button>

                            </div>
                        </div>

                        <h3 className="text-center pt-5">Need an account? <Link to="/register" className="text-blue-600 hover:text-[#d01818] font-bold">Create Account</Link></h3>
                    </div>
                </div>

                <div className="flex-1">
                    <img className="object-cover object-right" src='https://images.pexels.com/photos/1251834/pexels-photo-1251834.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt="" />
                </div>
            </div>
        </div>
    );
};

export default Login;
