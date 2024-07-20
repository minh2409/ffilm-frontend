import React from 'react'
import { useState, useEffect, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import PostComponent from '../../components/PostComponent/PostComponent';
import 'preline/preline';
import { AuthContext } from '../../assets/contexts/AuthContext';
import Intercept from '../../Tools/refrech';
import axios from 'axios';

const SearchPage = (props) => {
  const { user } = useContext(AuthContext);
    const [loadingNewPosts, setLoadingNewPosts] = useState(true);
    const [currPage, setCurrPage] = useState(1);
    const [prevPage, setPrevPage] = useState(0);
    const [posts, setPosts] = useState([]);
    const listInnerRef = useRef();
    const [wasLastList, setWasLastList] = useState(false);

  const Users = [
    {userName: "user B", userID: "@user002", userImage:"", numberFollower:"1655", description: "user B had an comment on your post" ,dateJoin:"2017-06-01", verify: "verified"},
    {userName: "user C", userID: "@user003", userImage:"", numberFollower:"1655", description: "user C had like your post" ,dateJoin:"2017-06-01", verify: "non-verified"},
  ];
  

  const [users, setUsers] = useState([]);

  useEffect(() => {
      setUsers(Users);
  }, []);

  props.onChange(0);

  const axiosJWT = axios.create();

  Intercept(axiosJWT);
  useEffect(() => {
    if (props.rerenderFeed === 1) {
      setCurrPage(1);
      setPrevPage(0);
      setPosts([]);
      setWasLastList(false);
    }
    props.onChange(0);
    const fetchPosts = async () => {
      const res = await axiosJWT.get(
        `https://ffilm.onrender.com/api/article/timeline?page=${currPage}`,
        { headers: { Authorization: "Bearer " + user.accessToken } }
      );
      if (res.data.Articles.length === 1) {
        setWasLastList(true);
        setLoadingNewPosts(false);
      }
      if (!res.data.Articles.length) {
        setWasLastList(true);
        setLoadingNewPosts(false);
        return;
      }
      setPrevPage(currPage);
      const sortedPost = [...posts, ...res.data.Articles].sort((p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      });
      setPosts(sortedPost);
    };
    if (!wasLastList && prevPage !== currPage) {
      fetchPosts();
    }
  }, [
    currPage,
    wasLastList,
    prevPage,
    posts,
    loadingNewPosts,
    axiosJWT,
    user.accessToken,
    props,
  ]);
  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        setCurrPage(currPage + 1);
      }
    }
  };

  return (
    <div className='app slide-up flex flex-col rounded-2xl gap-4'>
      <div class="relative flex flex-col w-full">
        <div class="relative">
          <div class="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-3.5">
            <svg class="flex-shrink-0 size-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
          </div>
          <input class="py-3 ps-10 pe-4 block w-full border-gray-200 rounded-lg text-sm focus:border-red-500 focus:ring-red-500 disabled:opacity-50 disabled:pointer-events-none" type="text" placeholder="Type a name"put=""/>
        </div>        
      </div>   

      <div className="min-w-full mx-auto rounded-xl shadow-2xl">
        <div className="flex flex-col">
            <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                    <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 text-3xl font-bold">
                    People
                    </div>
                <table className="min-w-full divide-y divide-gray-200 ">
                    <thead className="bg-gray-50 ">                    
                    <tr>
                        <th scope="col" className="px-6 py-3 text-start">
                        <div className="flex items-center gap-x-2">
                            <span className="text-xs font-semibold uppercase tracking-wide text-gray-800">
                            User
                            </span>
                        </div>
                        </th>

                        <th scope="col" className="px-6 py-3 text-start">
                        <div className="flex items-center gap-x-2">
                            <span className="text-xs font-semibold uppercase tracking-wide text-gray-800">
                            Number of Follower
                            </span>
                        </div>
                        </th>

                        <th scope="col" className="px-6 py-3 text-start">
                        <div className="flex items-center gap-x-2">
                            <span className="text-xs font-semibold uppercase tracking-wide text-gray-800">
                            Description
                            </span>
                        </div>
                        </th>

                        <th scope="col" className="px-6 py-3 text-start">
                        <div className="flex items-center gap-x-2">
                            <span className="text-xs font-semibold uppercase tracking-wide text-gray-800">
                            Date join
                            </span>
                        </div>
                        </th>

                        <th scope="col" className="px-6 py-3 text-start">
                        <div className="flex items-center gap-x-2">
                            <span className="text-xs font-semibold uppercase tracking-wide text-gray-800">
                            Verify
                            </span>
                        </div>
                        </th>
                    </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200 ">

                    {users.map((user, index)=>{
                        return(
                            <>
                                <tr className="bg-white hover:bg-gray-50">                                    
                                    <td className="size-px whitespace-nowrap align-top">
                                    <Link to="/profile" className="block p-6" href="#test">
                                        <div className="flex items-center gap-x-3">
                                        <img className="inline-block size-[38px] rounded-full" src="https://images.unsplash.com/photo-1531927557220-a9e23c1e4794?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80" alt="Description"/>
                                        <div className="grow">
                                            <span className="block text-sm font-semibold text-gray-800">{user.userName}</span>
                                            <span className="block text-sm text-gray-500">{user.userID}</span>
                                        </div>
                                        </div>
                                    </Link>
                                    </td>
                                    <td className="h-px w-72 min-w-72 align-top">
                                    <Link to="/profile" className="block p-6" href="#test">
                                        <span className="block text-sm text-gray-500">{user.numberFollower}</span>
                                    </Link>
                                    </td>
                                    <td className="h-px w-72 min-w-72 align-top">
                                    <Link to="/profile" className="block p-6" href="#test">
                                        <span className="block text-sm text-gray-500">{user.description}</span>
                                    </Link>
                                    </td>
                                    <td className="size-px whitespace-nowrap align-top">
                                    <Link to="/profile" className="block p-6" href="#test">
                                        <span className="text-sm text-gray-600">{user.dateJoin}</span>
                                    </Link>
                                    </td>
                                    <td className="size-px whitespace-nowrap align-top">
                                    <Link to="/profile" className="block p-6" href="#test">
                                        <span className="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium bg-teal-100 text-teal-800 rounded-full">
                                        <svg className="size-2.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                                        </svg>
                                        {user.verify}
                                        </span>
                                    </Link>
                                    </td>
                                </tr>
                            </>
                        )
                    })}    
                    </tbody>
                </table>
                </div>
            </div>
            </div>
        </div>
        </div>  

        <div className="min-w-full mx-auto rounded-xl shadow-2xl">
        <div className="flex flex-col">
            <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                    <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 text-3xl font-bold">
                    Marketplace
                    </div> 

                    <div className="flex p-4">
                      <div className="grid grid-cols-4 grid-rows-3 gap-4 min-w-[98%] min-h-full">
                          <div class="relative group overflow-hidden rounded-xl col-start-1 row-start-1">
                            <img class="rounded-xl shadow-xl border border-gray-200 w-full sm:size-full object-cover" src="https://vmi.tv/wp-content/uploads/sites/3/2020/01/Summicron-C_40mm_horizontal_left-scaled-e1609928072225.jpg" alt="pictureUserA" />
                            <div class="absolute inset-0 flex items-end">
                              <div class="w-full bg-black bg-opacity-30 h-[30%] transform transition-transform duration-300 ease-in-out group-hover:translate-y-0 translate-y-full">
                                <div class="text-white p-4">description</div>
                              </div>
                            </div>
                          </div>
                          
                          <div class="relative group overflow-hidden rounded-xl col-start-1 row-start-2">
                            <img class="rounded-xl shadow-xl border border-gray-200 w-full sm:size-full object-cover" src="https://vmi.tv/wp-content/uploads/sites/3/2020/01/Summicron-C_40mm_horizontal_left-scaled-e1609928072225.jpg" alt="pictureUserA" />
                            <div class="absolute inset-0 flex items-end">
                              <div class="w-full bg-black bg-opacity-30 h-[30%] transform transition-transform duration-300 ease-in-out group-hover:translate-y-0 translate-y-full">
                                <div class="text-white p-4">description</div>
                              </div>
                            </div>
                          </div>

                          <div class="relative group overflow-hidden rounded-xl col-start-1 row-start-3">
                            <img class="rounded-xl shadow-xl border border-gray-200 w-full sm:size-80 object-cover" src="https://vmi.tv/wp-content/uploads/sites/3/2020/01/Summicron-C_40mm_horizontal_left-scaled-e1609928072225.jpg" alt="pictureUserA" />
                            <div class="absolute inset-0 flex items-end">
                              <div class="w-full bg-black bg-opacity-30 h-[30%] transform transition-transform duration-300 ease-in-out group-hover:translate-y-0 translate-y-full">
                                <div class="text-white p-4">description</div>
                              </div>
                            </div>
                          </div>

                          <div class="relative group overflow-hidden rounded-xl col-start-2 row-start-1">
                            <img class="rounded-xl shadow-xl border border-gray-200 w-full sm:size-full object-cover" src="https://vmi.tv/wp-content/uploads/sites/3/2020/01/Summicron-C_40mm_horizontal_left-scaled-e1609928072225.jpg" alt="pictureUserA" />
                            <div class="absolute inset-0 flex items-end">
                              <div class="w-full bg-black bg-opacity-30 h-[30%] transform transition-transform duration-300 ease-in-out group-hover:translate-y-0 translate-y-full">
                                <div class="text-white p-4">description</div>
                              </div>
                            </div>
                          </div>

                          <div class="relative group overflow-hidden rounded-xl col-start-2 row-start-2">
                            <img class="rounded-xl shadow-xl border border-gray-200 w-full sm:size-full object-cover" src="https://vmi.tv/wp-content/uploads/sites/3/2020/01/Summicron-C_40mm_horizontal_left-scaled-e1609928072225.jpg" alt="pictureUserA" />
                            <div class="absolute inset-0 flex items-end">
                              <div class="w-full bg-black bg-opacity-30 h-[30%] transform transition-transform duration-300 ease-in-out group-hover:translate-y-0 translate-y-full">
                                <div class="text-white p-4">description</div>
                              </div>
                            </div>
                          </div>

                          <div class="relative group overflow-hidden rounded-xl col-start-2 row-start-3">
                            <img class="rounded-xl shadow-xl border border-gray-200 w-full sm:size-80 object-cover" src="https://vmi.tv/wp-content/uploads/sites/3/2020/01/Summicron-C_40mm_horizontal_left-scaled-e1609928072225.jpg" alt="pictureUserA" />
                            <div class="absolute inset-0 flex items-end">
                              <div class="w-full bg-black bg-opacity-30 h-[30%] transform transition-transform duration-300 ease-in-out group-hover:translate-y-0 translate-y-full">
                                <div class="text-white p-4">description</div>
                              </div>
                            </div>
                          </div>

                          <div class="relative group overflow-hidden rounded-xl col-start-3 row-start-1">
                            <img class="rounded-xl shadow-xl border border-gray-200 w-full sm:size-80 object-cover" src="https://vmi.tv/wp-content/uploads/sites/3/2020/01/Summicron-C_40mm_horizontal_left-scaled-e1609928072225.jpg" alt="pictureUserA" />
                            <div class="absolute inset-0 flex items-end">
                              <div class="w-full bg-black bg-opacity-30 h-[30%] transform transition-transform duration-300 ease-in-out group-hover:translate-y-0 translate-y-full">
                                <div class="text-white p-4">description</div>
                              </div>
                            </div>
                          </div>

                          <div class="relative group overflow-hidden rounded-xl col-start-3 row-start-2">
                            <img class="rounded-xl shadow-xl border border-gray-200 w-full sm:size-80 object-cover" src="https://vmi.tv/wp-content/uploads/sites/3/2020/01/Summicron-C_40mm_horizontal_left-scaled-e1609928072225.jpg" alt="pictureUserA" />
                            <div class="absolute inset-0 flex items-end">
                              <div class="w-full bg-black bg-opacity-30 h-[30%] transform transition-transform duration-300 ease-in-out group-hover:translate-y-0 translate-y-full">
                                <div class="text-white p-4">description</div>
                              </div>
                            </div>
                          </div>

                          <div class="relative group overflow-hidden rounded-xl col-start-3 row-start-3">
                            <img class="rounded-xl shadow-xl border border-gray-200 w-full sm:size-80 object-cover" src="https://vmi.tv/wp-content/uploads/sites/3/2020/01/Summicron-C_40mm_horizontal_left-scaled-e1609928072225.jpg" alt="pictureUserA" />
                            <div class="absolute inset-0 flex items-end">
                              <div class="w-full bg-black bg-opacity-30 h-[30%] transform transition-transform duration-300 ease-in-out group-hover:translate-y-0 translate-y-full">
                                <div class="text-white p-4">description</div>
                              </div>
                            </div>
                          </div>

                          <div class="relative group overflow-hidden rounded-xl col-start-4 row-start-1">
                            <img class="rounded-xl shadow-xl border border-gray-200 w-full sm:size-80 object-cover" src="https://vmi.tv/wp-content/uploads/sites/3/2020/01/Summicron-C_40mm_horizontal_left-scaled-e1609928072225.jpg" alt="pictureUserA" />
                            <div class="absolute inset-0 flex items-end">
                              <div class="w-full bg-black bg-opacity-30 h-[30%] transform transition-transform duration-300 ease-in-out group-hover:translate-y-0 translate-y-full">
                                <div class="text-white p-4">description</div>
                              </div>
                            </div>
                          </div>

                          <div class="relative group overflow-hidden rounded-xl col-start-4 row-start-2">
                            <img class="rounded-xl shadow-xl border border-gray-200 w-full sm:size-80 object-cover" src="https://vmi.tv/wp-content/uploads/sites/3/2020/01/Summicron-C_40mm_horizontal_left-scaled-e1609928072225.jpg" alt="pictureUserA" />
                            <div class="absolute inset-0 flex items-end">
                              <div class="w-full bg-black bg-opacity-30 h-[30%] transform transition-transform duration-300 ease-in-out group-hover:translate-y-0 translate-y-full">
                                <div class="text-white p-4">description</div>
                              </div>
                            </div>
                          </div>

                          <div class="relative group overflow-hidden rounded-xl col-start-4 row-start-3">
                            <img class="rounded-xl shadow-xl border border-gray-200 w-full sm:size-80 object-cover" src="https://vmi.tv/wp-content/uploads/sites/3/2020/01/Summicron-C_40mm_horizontal_left-scaled-e1609928072225.jpg" alt="pictureUserA" />
                            <div class="absolute inset-0 flex items-end">
                              <div class="w-full bg-black bg-opacity-30 h-[30%] transform transition-transform duration-300 ease-in-out group-hover:translate-y-0 translate-y-full">
                                <div class="text-white p-4">description</div>
                              </div>
                            </div>
                          </div>
                      </div>
                      </div>               
                </div>
            </div>
            </div>
        </div>
        </div> 

        <div className="min-w-full mx-auto rounded-xl shadow-2xl">
        <div className="flex flex-col">
            <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
                <div onScroll={onScroll} ref={listInnerRef} className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                    <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 text-3xl font-bold">
                    Posts
                    </div>
                    {posts.map((post, index) =>{
                    return(
                      <div className='flex p-4 mb-14 flex-col items-center'>
                        <PostComponent post={post} setTrigger={props} />  
                      </div>
                    )
                  })} 
                </div>
            </div>
            </div>
        </div>
        </div>  
        
    </div>
  );
};

export default SearchPage
