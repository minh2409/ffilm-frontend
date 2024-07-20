import React, { useContext } from 'react'
import { AuthContext } from '../../assets/contexts/AuthContext'
import axios from 'axios'
import Intercept from '../../Tools/refrech'

const FollowedUserTagComponent = (props) => {
  const {user, dispatch} = useContext(AuthContext)
  
  props.onChange(0);
  
  const axiosJWT = axios.create();
  Intercept(axiosJWT);

  
  const unFollow = (async () => {
    await axiosJWT.put(
      `https://ffilm.onrender.com/api/user/${props.user.username}/unfollow`,
      {},
      {
        headers: {
          Authorization: "Bearer " + user.accessToken,
        },
      }
    );
    dispatch({ type: "UNFOLLOW", payload: props.user._id });
  })
  return (
    <div>
      <li className="flex items-center justify-between gap-4 ml-4 mr-4"> 
        <div className="flex gap-4 items-center">
            <img className="size-[62px] rounded-full" src={props.user.propfilePicture} alt="userAavatar"/>
            <div>
            <div className="text-lg font-bold">{props.user.username}</div>
            <div className="text-xs font-normal">@{props.user.username}</div>
            </div>
        </div>              
        <button
        onClick={unFollow}
        class="inline-flex items-center justify-center size-[38px] text-sm font-semibold rounded-full leading-none border border-red-200 bg-white text-red-800 shadow-xl">
        UnFollow
        </button>
     </li>   
    </div>
  )
}

export default FollowedUserTagComponent
