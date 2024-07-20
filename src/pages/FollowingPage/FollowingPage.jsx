import 'preline/preline';
import { useState, useEffect, useContext, useRef } from 'react';
import PostComponent from '../../components/PostComponent/PostComponent';
import FollowedUserTagComponent from '../../components/UserTagComponent/FollowedUserTagComponent';
import { AuthContext } from '../../assets/contexts/AuthContext';
import Intercept from '../../Tools/refrech';
import axios from 'axios';


const FollowingPage = (props) => {
  const { user } = useContext(AuthContext);
  const [loadingNewPosts, setLoadingNewPosts] = useState(true);
  const [currPage, setCurrPage] = useState(1);
  const [prevPage, setPrevPage] = useState(0);
  const [posts, setPosts] = useState([]);
  const listInnerRef = useRef();
  const [wasLastList, setWasLastList] = useState(false);
  const username = user.data.username
  const [followingList, setFollowingList] = useState([]); 
  props.onChange(0)
  
  const axiosJWT = axios.create();
  Intercept(axiosJWT);
  
  
  useEffect(()=>{
    const FollowingsList = async () =>{
        await axiosJWT.get("https://ffilm.onrender.com/api/user/followings/" + username)
        .then((res) => {
          setFollowingList(res.data.followings);
          console.log("following",res.data.followings);
          console.log("followinglist", followingList)
          console.log("username",username)
        })
        .catch((err)=>{
          console.error(err);
        })
      }
    FollowingsList();
    },[username])          

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
    
      return(
        <div className="app">     
        {/* post  */}
          <div className="flex w-full h-full gap-4 slide-up">     
            <div onScroll={onScroll} ref={listInnerRef} className='flex-col flex space-y-4 min-w-[75%] items-center gap-12'>                      
              {posts.map((post, index) =>{
              return(
                <PostComponent post={post} key={post._id} rerenderFeed={props.rerenderFeed} onChange={props.onChange} setTrigger={props}/>
              )
            })}  
            </div>    
            
            {/* trending */}
            <div className= "self-start sticky flex flex-col min-w-[400px] gap-4 shadow-2xl rounded-xl">
              <ul className="flex flex-col bg-white border border-gray-200 shadow-sm rounded-xl gap-4 pb-4">
                <li className="flex items-start justify-between text-xl font-bold px-4 py-3 border-b border-gray-200"> Followed</li>            
                
                {followingList.map((user, index)=>{
                  return(
                    <FollowedUserTagComponent user={user} onChange={props.onChange}/>
                )})}    
              </ul>
            </div>           
          </div> 
        </div>   
    )
}

export default FollowingPage;