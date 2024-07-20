import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../assets/contexts/AuthContext";
import axios from "axios";
import Intercept from "../../Tools/refrech";


const ProfilePage = () => {
    const username = useParams().username;
    const [posts, setPosts] = useState([]);
    const { user: currentUser, dispatch } = useContext(AuthContext);
    const [user, setCurrentUser] = useState({
        username:"",
        description:"",
        profilePicture:""
    })
    const axiosJWT = axios.create();
    Intercept(axiosJWT);
    useEffect(() => {
        const fetchUser = async () => {
          const res = await axios.get(
            "https://ffilm.onrender.com/api/user/u/" + username
          );
          setCurrentUser(res.data.user);
          const pst = await axios.get(
            "https://ffilm.onrender.com/api/article/u/" + username
          );
          setPosts(
            pst.data.sort((p1, p2) => {
              return new Date(p2.createdAt) - new Date(p1.createdAt);
            })
          );
        };
        fetchUser();
      }, [username]);
    return(
        <main id="content" className="flex border border-gray-100 rounded-xl shadow-2xl">
        <div>
            <div className="relative slide-up">
                <div className="overflow-hidden absolute min-h-[25rem] min-w-full rounded-t-xl">
                    <div aria-hidden="true" className="flex -z-[1] absolute -top-40 start-0 rounded-lg">
                        <img className="" src={"https://images.squarespace-cdn.com/content/v1/59cc767e8dd04135bf0c554c/1607053823960-6MKT4ZVLF7FPOSZ6IFCX/IMG_0339.jpg"} alt="userAavatar"/>                        
                    </div>
                </div>

                <div className="max-w-[85rem] px-4 pt-10 sm:px-6 lg:px-8 lg:pt-14 mx-auto">
                    <div className="mt-6 md:mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 lg:gap-3 xl:gap-6 lg:items-center">
                        <div className="flex flex-col bg-white border-2 justify-between items-center border-red-900 text-center shadow-xl rounded-2xl p-4 md:p-8 min-w-[17rem]">
                            <img className="inline-block shadow-lg size-[150px] rounded-full" src={user.profilePicture} alt="userAavatar"/>                        
                            <h4 className="font-bold text-2xl text-gray-800">{user.username}</h4>
                            <h4 className="font-normal text-sm text-gray-800">@{user.username}</h4>
                            <p className="mt-2 text-sm text-gray-500">{user.description}</p>

                            <ul className="mt-7 space-y-2.5 text-sm">
                                <li className="flex space-x-2">
                                    <svg className="flex-shrink-0 mt-0.5 size-4 text-red-900" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                                    <span className="text-gray-800">
                                    2 users
                                    </span>
                                </li>                           
                            </ul>
                        </div>     
                    </div>

                    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            <div className="space-y-2">
                                <img className="w-full h-auto object-cover" src="https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" alt="Description"/>
                                <img className="w-full h-auto object-cover" src="https://images.unsplash.com/photo-1668906093328-99601a1aa584?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=986&q=80" alt="Description"/>
                                <img className="w-full h-auto object-cover" src="https://images.unsplash.com/photo-1567016526105-22da7c13161a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80" alt="Description"/>
                            </div>
                            <div className="space-y-2">
                                <img className="w-full h-auto object-cover" src="https://images.unsplash.com/photo-1668584054131-d5721c515211?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80" alt="Description"/>
                                <img className="w-full h-auto object-cover" src="https://images.unsplash.com/photo-1664574654529-b60630f33fdb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80" alt="Description"/>
                            </div>
                            <div className="space-y-2">
                                <img className="w-full h-auto object-cover" src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" alt="Description"/>
                                <img className="w-full h-auto object-cover" src="https://images.unsplash.com/photo-1586232702178-f044c5f4d4b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80" alt="Description"/>
                                <img className="w-full h-auto object-cover" src="https://images.unsplash.com/photo-1542125387-c71274d94f0a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" alt="Description"/>
                            </div>
                            <div className="space-y-2">
                                <img className="w-full h-auto object-cover" src="https://images.unsplash.com/photo-1668869713519-9bcbb0da7171?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=988&q=80" alt="Description"/>
                                <img className="w-full h-auto object-cover" src="https://images.unsplash.com/photo-1668584054035-f5ba7d426401?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3465&q=80" alt="Description"/>
                            </div>
                        </div>
                    </div>       
                </div>
            </div>
        </div>
    </main>
    )
}

export default ProfilePage;