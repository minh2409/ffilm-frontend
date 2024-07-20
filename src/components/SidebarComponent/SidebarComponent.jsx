import React, { useContext } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import ffilm from '../../assets/image/ffilm.svg'
import axios from 'axios'
import { AuthContext } from '../../assets/contexts/AuthContext'

const SidebarComponent = (props) => {
  const navigator = useNavigate();
  const { user } = useContext(AuthContext);

  const logoutHandler = async (e) => {
    e.preventDefault();
    await axios.post("https://ffilm.onrender.com/api/user/logout", {
      refreshToken: user.refreshToken,
    })
    .then((res)=>{
      alert(res.data.message);
      navigator("/login");
      localStorage.setItem("user", null);
      window.location.reload(false);
    })
    .catch((err)=>{
      console.error(err.response?.data?.message);
    });
  }

  return (
    <div>
      <div className="sticky top-0 inset-x-0 z-20 bg-white border-y px-4 sm:px-6 md:px-8 lg:hidden">
          <div className="flex items-center py-4">
          <button type="button" className="text-black hover:text-black" data-hs-overlay="#application-sidebar-dark" aria-controls="application-sidebar-dark" aria-label="Toggle navigation">
              <span className="sr-only">Toggle Navigation</span>
              <svg className="size-5" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
              </svg>
          </button>
          </div>
      </div>
      
      <div id="application-sidebar-dark" className="justify-center m-2 hs-overlay [--auto-close:lg] hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden fixed top-0 start-0 bottom-0 z-[60] w-64 bg-white border-e border-red-800 border-opacity-25 pt-7 pb-10 overflow-y-auto lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-red-100 [&::-webkit-scrollbar-thumb]:bg-red-300">
        <div className="flex-col flex w-full h-full justify-between">
          <div>
            <div className="px-6">
            <Link to="/home"className="flex-none text-xl font-semibold text-white" aria-label="Brand">
              <img src={ffilm} alt="Preline" className="w-28 h-auto" />
            </Link>
            </div>
        
            <nav className="hs-accordion-group p-6 w-full flex flex-col flex-wrap" data-hs-accordion-always-open>
            <ul className="space-y-1.5">
        
                <li>
                <Link to="/home"className="hs-accordion-toggle w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 hs-accordion-active:text-white hs-accordion-active:hover:bg-transparent text-sm text-black rounded-lg hover:bg-red-600 hover:text-white">
                    <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                    Home   
                </Link>
                </li>

                <li>
                <Link to="/search"className="hs-accordion-toggle w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 hs-accordion-active:text-white hs-accordion-active:hover:bg-transparent text-sm text-black rounded-lg hover:bg-red-600 hover:text-white">
                <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>                    Search 
                </Link>
                </li>

                <li>
                <Link to="/marketplace" className="hs-accordion-toggle w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 hs-accordion-active:text-white hs-accordion-active:hover:bg-transparent text-sm text-black rounded-lg hover:bg-red-600 hover:text-white">
                    <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="20.5" r="1"/><circle cx="18" cy="20.5" r="1"/><path d="M2.5 2.5h3l2.7 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6l1.6-8.4H7.1"/></svg>
                    Marketplace   
                </Link>
                </li>
                
                <li>
                <Link to="/notifications"className="hs-accordion-toggle w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 hs-accordion-active:text-white hs-accordion-active:hover:bg-transparent text-sm text-black rounded-lg hover:bg-red-600 hover:text-white">
                    <svg className="flex-shrink-0 mt-0.5 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0"></path></svg>
                    Notifications
                </Link>
                </li>
        
                <li>
                <Link to="/suggestions"className="hs-accordion-toggle w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 hs-accordion-active:text-white hs-accordion-active:hover:bg-transparent text-sm text-black rounded-lg hover:bg-red-600 hover:text-white">
                    <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                    Suggestions
                </Link>            
                </li>

                <li>
                <Link to="/following"className="hs-accordion-toggle w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 hs-accordion-active:text-white hs-accordion-active:hover:bg-transparent text-sm text-black rounded-lg hover:bg-red-600 hover:text-white">
                    <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                    Following
                </Link>            
                </li>
        
                <li>
                <Link to="/messenger"className="hs-accordion-toggle w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 hs-accordion-active:text-white hs-accordion-active:hover:bg-transparent text-sm text-black rounded-lg hover:bg-red-600 hover:text-white">
                    <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                    Messenger
                </Link>
                </li>     
                <li>
                <button type="button" onClick={logoutHandler} className="hs-accordion-toggle w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 hs-accordion-active:text-white hs-accordion-active:hover:bg-transparent text-sm text-black rounded-lg hover:bg-red-600 hover:text-white">
                    <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                    Logout
                </button>
                </li>             
            </ul>
            </nav>
          </div>
          <div className='mr-4 ml-4 m-4 gap-4'>
          {user && (
                <Link to={`/profile/${user.data.username}`} className="flex p-2 mb-2 gap-4 items-center rounded-xl hover:bg-black hover:bg-opacity-25">
                  <img className="size-[62px] rounded-full" src={user.data.profilePicture} alt="userAavatar"/>
                    <div>
                      <div className="text-lg font-bold text-black ">{user.data.username}</div>
                      <div className="text-xs font-normal text-black">@{user.data.username}</div>
                    </div>
                </Link>
              )}
            <button type="button" onClick={() => props.setPopupPost(true)} class="py-3 px-4 p-2 w-full inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-red-600 text-white hover:bg-red-800 disabled:opacity-50 disabled:pointer-events-none">
              POST
            </button>
          </div>
        </div>
      </div>      
    </div>
  )
}

export default SidebarComponent
