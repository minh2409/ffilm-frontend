import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../assets/contexts/AuthContext';
import axios from 'axios';
import Intercept from '../../Tools/refrech';

const NotFollowedUserTagComponent = (props) => {
  const username = props.data.username;
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(true);
  const [user, setCurrentUser] = useState({
    followers: [],
    followings: [],
  });

  const axiosJWT = axios.create();
  Intercept(axiosJWT);

  useEffect(() => {
    setFollowed(currentUser.data.followings.includes(user?._id));
  }, [currentUser.data.followings, user._id]);


  const followHandler = (async () => {
    try {
      if (followed) {
        await axiosJWT.put(
          `https://ffilm.onrender.com/api/user/${username}/unfollow`,
          {},
          {
            headers: { Authorization: "Bearer " + currentUser.accessToken },
          }
        );
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axiosJWT.put(
          `https://ffilm.onrender.com/api/user/${username}/follow`,
          {},
          {
            headers: { Authorization: "Bearer " + currentUser.accessToken },
          }
        );
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } catch (e) {}
  });


  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        "https://ffilm.onrender.com/api/user/u/" + username
      );
      setCurrentUser(res.data.user);
    };
    fetchUser();
  }, [username]);
  
  return (
    <div>
      <li className="flex items-center justify-between gap-4 ml-4 mr-4"> 
        <div className="flex gap-4 items-center">
            <img className="size-[62px] rounded-full" src={props.data.profilePicture} alt="userAavatar"/>
            <div>
            <div className="text-lg font-bold">{props.data.username}</div>
            <div className="text-xs font-normal">@{props.data.username}</div>
            </div>
        </div>              
        <button type="button" onClick={followHandler} class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 disabled:pointer-events-none">
            {followed ? "Unfollow": "Follow"}
        </button>
        </li>
    </div>
  )
}

export default NotFollowedUserTagComponent
