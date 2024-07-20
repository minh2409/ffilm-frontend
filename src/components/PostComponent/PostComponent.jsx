import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../assets/contexts/AuthContext';
import axios from 'axios';
import Intercept from '../../Tools/refrech';
import { format } from "timeago.js";

const PostComponent = (props) => {

  const post = props.post;
  const { user } = useContext(AuthContext);
  const [likes, setLikes] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  // const [Countcomments, setCountComments] = useState(post.comment.length);
  // const [showPost, setShowPost] = useState(false);
  // const [showMenu, setShowMenu] = useState(false);
  const axiosJWT = axios.create();
  Intercept(axiosJWT);
  useEffect(() => {
    setIsLiked(post.likes.includes(user.data._id));
  }, []);
  // const deleteHandler = async () => {
  //   try {
  //     await axiosJWT.delete(`http://localhost:8000/api/article/${post._id}`, {
  //       headers: { Authorization: "Bearer " + user.accessToken },
  //     });
  //     NotificationManager.success("Success", "Post has been deleted", 3000);
  //     props.onChange(1);
  //   } catch (error) {
  //     NotificationManager.warning("Warning", "error", 3000);
  //   }
  // };
  const likeHandler = async () => {
    try {
      await axiosJWT.get(`https://ffilm.onrender.com/api/article/${post._id}/like`, {
        headers: { Authorization: "Bearer " + user.accessToken },
      });
    } catch (error) {}

    setLikes(isLiked ? likes - 1 : likes + 1);
    setIsLiked(!isLiked);
  };
  // const setcommentHandler = () => {
  //   setCountComments(Countcomments + 1);
  // };
  // const showMenuHandler = () => {
  //   setShowMenu(!showMenu);
  // };
  
  
  return (
    <div className="flex-col flex justify-between gap-4 cursor-pointer max-w-[50rem] aspect-[16/11] min-w-[50rem]">
      <div className="flex flex-col bg-white border border-gray-200 shadow-xl rounded-xl p-4 gap-2">    
        <div className='flex gap-2 justify-between'>
          <div className="flex gap-4">
            <img className="inline-block w-[62px] h-[62px] rounded-full" src={user.profilePicture} alt="userAvatar"/>
            <a href='#user001'>
              <h3 className="text-xl font-bold">{post.user.username}</h3>
              <p className="text-gray-600">{format(post.createdAt)}</p>
            </a>
          </div>                      
          <button type="button" className="py-2 px-4 align-baseline items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-red-500 hover:bg-red-100 hover:text-red-800 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-red-800/30 dark:hover:text-red-400">
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="red" stroke-linecap="round" stroke-width="2" d="M6 12h.01m6 0h.01m5.99 0h.01"/>
            </svg>                            
          </button>
        </div>  
          
        <div onClick={() => props.setTrigger.setTriggerPost(true)} className="relative group overflow-hidden rounded-xl aspect-[16/9]">
          <img className="w-full h-full object-cover rounded-xl" src={post.imgurl ? post.imgurl : "https://images.unsplash.com/photo-1633114128174-2f8aa49759b0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"} alt="pictureUserA" />
          <div className="absolute inset-0 flex items-end">
            <div className="w-full bg-black bg-opacity-30 h-[30%] transform transition-transform duration-300 ease-in-out group-hover:translate-y-0 translate-y-full">
              <div className="text-white p-4">{post.description}</div>
            </div>
          </div>
        </div>

        <div className='relative flex justify-between'>
          <div className='flex gap-1'>
            <div className='flex font-bold items-center gap-1'>
              <button onClick={likeHandler} type="button" className="py-2 px-4 m-2 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-red-500 hover:bg-red-100 hover:text-red-800 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-red-800/30 dark:hover:text-red-400">
                {!isLiked ? 
                  <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="red" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11c.889-.086 1.416-.543 2.156-1.057a22.323 22.323 0 0 0 3.958-5.084 1.6 1.6 0 0 1 .582-.628 1.549 1.549 0 0 1 1.466-.087c.205.095.388.233.537.406a1.64 1.64 0 0 1 .384 1.279l-1.388 4.114M7 11H4v6.5A1.5 1.5 0 0 0 5.5 19v0A1.5 1.5 0 0 0 7 17.5V11Zm6.5-1h4.915c.286 0 .372.014.626.15.254.135.472.332.637.572a1.874 1.874 0 0 1 .215 1.673l-2.098 6.4C17.538 19.52 17.368 20 16.12 20c-2.303 0-4.79-.943-6.67-1.475"/>
                  </svg> :  
                  <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="red" fill="red" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11c.889-.086 1.416-.543 2.156-1.057a22.323 22.323 0 0 0 3.958-5.084 1.6 1.6 0 0 1 .582-.628 1.549 1.549 0 0 1 1.466-.087c.205.095.388.233.537.406a1.64 1.64 0 0 1 .384 1.279l-1.388 4.114M7 11H4v6.5A1.5 1.5 0 0 0 5.5 19v0A1.5 1.5 0 0 0 7 17.5V11Zm6.5-1h4.915c.286 0 .372.014.626.15.254.135.472.332.637.572a1.874 1.874 0 0 1 .215 1.673l-2.098 6.4C17.538 19.52 17.368 20 16.12 20c-2.303 0-4.79-.943-6.67-1.475"/>
                  </svg> }            
              </button>
              {likes}
            </div>
          </div>
          <button type="button" className="py-2 px-4 m-2 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-red-500 hover:bg-red-100 hover:text-red-800 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-red-800/30 dark:hover:text-red-400">
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="red" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 9h5m3 0h2M7 12h2m3 0h5M5 5h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-6.616a1 1 0 0 0-.67.257l-2.88 2.592A.5.5 0 0 1 8 18.477V17a1 1 0 0 0-1-1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"/>
            </svg>                          
          </button>
          <button type="button" className="py-2 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-red-500 hover:bg-red-100 hover:text-red-800 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-red-800/30 dark:hover:text-red-400">
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="red" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.248 19C3.22 15.77 5.275 8.232 12.466 8.232V6.079a1.025 1.025 0 0 1 1.644-.862l5.479 4.307a1.108 1.108 0 0 1 0 1.723l-5.48 4.307a1.026 1.026 0 0 1-1.643-.861v-2.154C5.275 13.616 4.248 19 4.248 19Z"/>
            </svg>                          
          </button>
        </div>                                   
      </div>
    </div> 
  )
}
export default PostComponent
