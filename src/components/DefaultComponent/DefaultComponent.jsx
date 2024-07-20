import React from 'react'
import { useState, useEffect } from 'react'

import SidebarComponent from '../SidebarComponent/SidebarComponent'
import PopupPostComponent from '../PopUpPostComponent/PopupPostComponent'

const DefaultComponent = ({children}) => {

    const UserAccount = [
        {userName: "userD", userID: "@user0001"},
        ]

        const [userAccount, setUserAccount] = useState([]);
        const [popupPost, setPopupPost] = useState(false);

        useEffect(() => {
            setUserAccount(UserAccount);
        }, []);
    
  return (
    <div>
        <PopupPostComponent trigger={popupPost} setTrigger={setPopupPost} onClose={(e) => {
            console.log(e.target);
            if (e.target.id === "maindiv") {
            setPopupPost(false);
            }
        }}/>
        <SidebarComponent userAccount={userAccount} setPopupPost={setPopupPost}/> 
        <div className="w-full pt-5 px-4 sm:px-6 md:px-8 lg:ps-72">
            {children}
        </div>
    </div>
  )
}

export default DefaultComponent
