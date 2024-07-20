import 'preline/preline'
import { useContext, useEffect, useRef, useState } from 'react';
import PostComponent from '../../components/PostComponent/PostComponent';
import NotFollowedUserTagComponent from '../../components/UserTagComponent/NotFollowedUserTagComponent';
import { AuthContext } from '../../assets/contexts/AuthContext';
import Intercept from '../../Tools/refrech';
import axios from 'axios';

const HomePage = (props) => {
  const { user } = useContext(AuthContext);
  const [loadingNewPosts, setLoadingNewPosts] = useState(true);
  const [currPage, setCurrPage] = useState(1);
  const [prevPage, setPrevPage] = useState(0);
  const [posts, setPosts] = useState([]);
  const listInnerRef = useRef();
  const [wasLastList, setWasLastList] = useState(false);
  const [usersSearch, setusersSearch] = useState([]);
  const [searchquery, setSearchquery] = useState("");

  
  props.onChange(0);
  
  const axiosJWT = axios.create();
  
  Intercept(axiosJWT);
  
  useEffect(() => {
    const getSearch = async () => {
      try {
        if (searchquery.length >= 0) {
          const searchresult = await axios.get(
            "https://ffilm.onrender.com/api/user/searchUser",
            {
              params: { search: searchquery },
            }
          );
          setusersSearch(searchresult.data);
        }
      } catch (error) {}
    };
    const timer = setTimeout(() => {
      getSearch();
    }, 700);
    return () => clearTimeout(timer);
  }, [searchquery]);

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
        `http://localhost:8000/api/article/timeline?page=${currPage}`,
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
    <div className="app slide-up">     
    {/* post  */}
      <div div className="flex w-full h-full gap-4 slide-up">     
        <div onScroll={onScroll} ref={listInnerRef} className='flex-col flex space-y-4 min-w-[75%] items-center gap-12'>     
          <div className="flex bg-white border border-gray-200 shadow-xl rounded-xl p-4 min-w-[75%] gap-3">
            <img className="size-[62px] rounded-full" src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80" alt="userAavatar"/>
            <input type="text" onClick={() => props.setTrigger(true)} id="input-label" class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-red-500 focus:ring-red-500 disabled:opacity-50 disabled:pointer-events-nne" placeholder="Which do you think right now?"/>
            <button type="button" onClick={() => props.setTrigger(true)} class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 disabled:pointer-events-none">
              Upload
            </button>
          </div>    

          {posts.map((post, index) =>{
            return(
              <PostComponent post={post} key={post._id} rerenderFeed={props.rerenderFeed} onChange={props.onChange} setTrigger={props}/>
            )
          })}              
        </div>    
        
        {/* trending */}
        <div className= "self-start sticky top-10 flex flex-col w-[900px] gap-4">
          <div className="flex flex-col bg-white border border-gray-200 shadow-sm rounded-xl">
            <div className="flex items-start justify-between text-xl font-bold px-4 py-3 border-b border-gray-200"> Trending</div>
            <button type="button" className="inline-flex items-center gap-x-2 py-3 px-4 text-sm text-start font-medium text-gray-800 hover:text-red-600 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg focus:z-10 disabled:opacity-50 disabled:pointer-events-none">            
              #Active
            </button>
            <button type="button" className="inline-flex items-center gap-x-2 py-3 px-4 text-sm text-start font-medium text-gray-800 hover:text-red-600 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg focus:z-10 disabled:opacity-50 disabled:pointer-events-none">
              #Link
            </button>
            <button type="button" className="inline-flex items-center gap-x-2 py-3 px-4 text-sm text-start font-medium text-gray-800 hover:text-red-600 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg focus:z-10 disabled:opacity-50 disabled:pointer-events-none">
              #Disabled
            </button>
          </div> 

          <ul className="flex flex-col bg-white border border-gray-200 shadow-sm rounded-xl gap-4 pb-4">
            <li className="flex items-start justify-between text-xl font-bold px-4 py-3 border-b border-gray-200"> Maybe you know</li>            
            
            {usersSearch?.users?.map((user, index)=>{
              return(
                <NotFollowedUserTagComponent data={user}/>
            )})}

          </ul>


        </div>             
      </div> 
    </div>    
  )
}

export default HomePage;
    