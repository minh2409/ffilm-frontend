import 'preline/preline';
import {Link, useNavigate} from 'react-router-dom'
import ffilm from '../../assets/image/ffilm.svg'
import background from '../../assets/image/background.jpg'
import { useContext, useState} from 'react'
import axios from 'axios'
import { AuthContext } from '../../assets/contexts/AuthContext';
const LoginPage = () => {
    const [user, setUser] = useState({
        username:"",
        password:""
    });

    const navigator = useNavigate();
    const { dispatch } = useContext(AuthContext);
    const [responseMessage, setResponseMessage] = useState('');


    const submitHandler = async (e) => {
        e.preventDefault();
        await axios.post("https://ffilm.onrender.com/api/user/login", user)
        .then((response)=>{
            alert(response.data.message);
            const { message, status, ...other } = response.data;
            dispatch({ type: "LOGIN_SUCCESS", payload: other });
            navigator("/home");
        })
        .catch((err)=>{
            dispatch({ type: "LOGIN_FAILURE", payload: err });
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
                <div className='flex justify-center flex-row items-end gap-4 mt-10'>
                    <div className='block text-5xl font-bold text-gray-800'>Welcome to</div>
                    <img src={ffilm} alt="Preline" className="w-28 h-auto" />
                </div>
                
                <div className="p-4 sm:p-7 w-full h-full flex flex-col items-center justify-between">
                    <div className="text-center">
                    <h1 className="block text-2xl font-bold text-gray-800">Sign in</h1>
                    <p className="mt-2 text-sm text-gray-600">
                        Don't have an account yet?
                        <Link to="/signup" className="text-red-600 decoration-2 hover:underline font-medium">
                        Sign up here
                        </Link>
                    </p>
                    </div>

                    <div className="mt-5 w-full h-full">
                    <form>
                        <div className="gap-y-4 flex flex-col w-full h-full justify-between">
                        <div>
                            <label for="username" className="block text-sm mb-2">Username</label>
                            <div className="relative">
                            <input onChange={changeHandler} type="text" id="username" name="username" value={user.username} className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:ring-red-500 disabled:opacity-50 disabled:pointer-events-none" required aria-describedby="email-error"/>
                            <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                                <svg className="size-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                                </svg>
                            </div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between items-center">
                            <label for="password" className="block text-sm mb-2">Password</label>
                            <Link to="/resetPassword" className="text-sm text-red-600 decoration-2 hover:underline font-medium">Forgot password?</Link>
                            </div>
                            <div className="relative">
                            <input onChange={changeHandler} type="password" id="password" name="password" value={user.password} className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:ring-red-500 disabled:opacity-50 disabled:pointer-events-none" required aria-describedby="password-error"/>
                            <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                                <svg className="size-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                                </svg>
                            </div>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="flex">
                            <input id="remember-me" name="remember-me" type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded text-red-600 focus:ring-red-500"/>
                            </div>
                            <div className="ms-3">
                            <label for="remember-me" className="text-sm">Remember me</label>
                            </div>
                        </div>
                        {responseMessage && <p className="text-sm text-center mt-2 text-red-600">{responseMessage}</p>}
                        <button type="button" onClick={submitHandler} className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 disabled:pointer-events-none">Sign in</button>
                        </div>
                    </form>
                    </div>
                </div>
                </div>  
        </div>
    );
}

export default LoginPage;
