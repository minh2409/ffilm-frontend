import 'preline/preline';
import background from '../../assets/image/background.jpg'
import { Link, useNavigate } from 'react-router-dom';
import { useState} from 'react'
import axios from 'axios'

const SignupPage = () => {

    const navigator = useNavigate();

    const [user, setUser] = useState({
        username:"",
        email:"",
        password:"",
        confirmPassword:"",
    });

    const [responseMessage, setResponseMessage] = useState('');

    const submitHandler = async (e) => {
        e.preventDefault();
        await axios.post("https://ffilm.onrender.com/api/user/signup", user)
        .then((response) => {
            setResponseMessage(response.data.message);
            alert(response.data.message);
            navigator("/login")
        })
        .catch((err)=>{
            setResponseMessage(err.response?.data?.message || 'An error occurred');
        })
    }

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setUser(user => ({
            ...user,
            [name]: value
        }));
    };

    return (
        <div className='relative flex items-center justify-center min-h-screen min-w-screen bg-cover bg-center' style={{ backgroundImage: `url(${background})` }}>
            <div className="w-full max-w-md mx-auto bg-white/30 backdrop-blur-lg border border-white/30 rounded-xl shadow-sm">
                <div className="mt-7">
                    <div className="p-4 sm:p-7">
                        <div className="text-center">
                            <h1 className="block text-2xl font-bold text-gray-800">Sign up</h1>
                            <p className="mt-2 text-sm text-gray-600">
                                Already have an account?
                                <Link to="/login" className="text-red-600 decoration-2 hover:underline font-medium">
                                    Sign in here
                                </Link>
                            </p>
                        </div>

                        <div className="mt-5">
                            <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6">Or</div>

                            <form>
                                <div className="grid gap-y-4">
                                    <div>
                                        <label htmlFor="username" className="block text-sm mb-2">Username</label>
                                        <div className="relative">
                                            <input onChange={changeHandler} type="text" id="username" name="username" value={user.username} className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-red-500 focus:ring-red-500 disabled:opacity-50 disabled:pointer-events-none" required aria-describedby="email-error" />
                                            <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                                                <svg className="size-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                                </svg>
                                            </div>
                                        </div>
                                        {/* <p className="hidden text-xs text-red-600 mt-2" id="email-error">Please include a valid email address so we can get back to you</p> */}
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm mb-2">Email address</label>
                                        <div className="relative">
                                            <input onChange={changeHandler} type="email" id="email" name="email" value={user.email} className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-red-500 focus:ring-red-500 disabled:opacity-50 disabled:pointer-events-none" required aria-describedby="email-error" />
                                            <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                                                <svg className="size-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="block text-sm mb-2">Password</label>
                                        <div className="relative">
                                            <input onChange={changeHandler} type="password" id="password" name="password" value={user.password} className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-red-500 focus:ring-red-500 disabled:opacity-50 disabled:pointer-events-none" required aria-describedby="password-error" />
                                            <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                                                <svg className="size-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <p className="hidden text-xs text-red-600 mt-2" id="password-error">8+ characters required</p>
                                    </div>
                                    <div>
                                        <label htmlFor="confirmPassword" className="block text-sm mb-2">Confirm Password</label>
                                        <div className="relative">
                                            <input onChange={changeHandler} type="password" id="confirmPassword" name="confirmPassword" value={user.confirmPassword} className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-red-500 focus:ring-red-500 disabled:opacity-50 disabled:pointer-events-none" required aria-describedby="confirm-password-error" />
                                            <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                                                <svg className="size-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="flex">
                                            <input id="remember-me" name="remember-me" type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded text-red-600 focus:ring-red-500" />
                                        </div>
                                        <div className="ms-3">
                                            <label htmlFor="remember-me" className="text-sm">I accept the <span className="text-red-600 decoration-2 hover:underline font-medium">Terms and Conditions</span></label>
                                        </div>
                                    </div>
                                    {responseMessage && <p className="text-sm text-center mt-2 text-red-600">{responseMessage}</p>}
                                    <button type="button" onClick={submitHandler} className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 disabled:pointer-events-none">Sign up</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
