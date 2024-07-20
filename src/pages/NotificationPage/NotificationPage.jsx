import 'preline/preline'
import { useState, useEffect } from 'react';


const NotificationPage = (props) =>{

    const notifications = [
        {Title: "TitlePost", userName: "user B", userID: "@user002", userImage:"", msg: "user B had an comment on your post", detail: "I love your post",date:"2017-06-01T08:30", type: "Comments"},
        {Title: "TitlePost", userName: "user C", userID: "@user003", userImage:"", msg: "user C had like your post", detail: "",date:"2017-06-01T08:30", type: "Like"},
    ];

    const [notification, setNotifications] = useState([]);

    useEffect(() => {
        setNotifications(notifications);
    }, []);

    return(
        <div className="app slide-up min-w-full mx-auto rounded-xl shadow-2xl">
        <div className="flex flex-col">
            <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                    <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 text-6xl font-bold">
                    Notifications Center
                    </div>
                <table className="min-w-full divide-y divide-gray-200 ">
                    <thead className="bg-gray-50 ">                    
                    <tr>
                        <th scope="col" className="px-6 py-3 text-start">
                        <div className="flex items-center gap-x-2">
                            <span className="text-xs font-semibold uppercase tracking-wide text-gray-800">
                            your post
                            </span>
                        </div>
                        </th>

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
                            Review
                            </span>
                        </div>
                        </th>

                        <th scope="col" className="px-6 py-3 text-start">
                        <div className="flex items-center gap-x-2">
                            <span className="text-xs font-semibold uppercase tracking-wide text-gray-800">
                            Date
                            </span>
                        </div>
                        </th>

                        <th scope="col" className="px-6 py-3 text-start">
                        <div className="flex items-center gap-x-2">
                            <span className="text-xs font-semibold uppercase tracking-wide text-gray-800">
                            type
                            </span>
                        </div>
                        </th>
                    </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200 ">

                    {notification.map((noti, index)=>{
                        return(
                            <>
                                <tr className="bg-white hover:bg-gray-50">
                                    <td className="size-px whitespace-nowrap align-top">
                                    <a onClick={()=> props.setTriggerPost(true)} className="block p-6" href="#test">
                                        <div className="flex items-center gap-x-4">
                                        <img className="flex-shrink-0 size-[38px] rounded-lg" src="https://images.unsplash.com/photo-1572307480813-ceb0e59d8325?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=320&q=80" alt="Image Description"/>
                                        <div>
                                            <span className="block text-sm font-semibold text-gray-800">{noti.Title}</span>
                                        </div>
                                        </div>
                                    </a>
                                    </td>
                                    <td className="size-px whitespace-nowrap align-top">
                                    <a onClick={()=> props.setTriggerPost(true)} className="block p-6" href="#test">
                                        <div className="flex items-center gap-x-3">
                                        <img className="inline-block size-[38px] rounded-full" src="https://images.unsplash.com/photo-1531927557220-a9e23c1e4794?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80" alt="Image Description"/>
                                        <div className="grow">
                                            <span className="block text-sm font-semibold text-gray-800">{noti.userName}</span>
                                            <span className="block text-sm text-gray-500">{noti.userID}</span>
                                        </div>
                                        </div>
                                    </a>
                                    </td>
                                    <td className="h-px w-72 min-w-72 align-top">
                                    <a onClick={()=> props.setTriggerPost(true)} className="block p-6" href="#test">
                                        <span className="block text-sm font-semibold text-gray-800">{noti.msg}</span>
                                        <span className="block text-sm text-gray-500">{noti.detail}</span>
                                    </a>
                                    </td>
                                    <td className="size-px whitespace-nowrap align-top">
                                    <a onClick={()=> props.setTriggerPost(true)} className="block p-6" href="#test">
                                        <span className="text-sm text-gray-600">{noti.date}</span>
                                    </a>
                                    </td>
                                    <td className="size-px whitespace-nowrap align-top">
                                    <a onClick={()=> props.setTriggerPost(true)} className="block p-6" href="#test">
                                        <span className="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium bg-teal-100 text-teal-800 rounded-full">
                                        <svg className="size-2.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                                        </svg>
                                        {noti.type}
                                        </span>
                                    </a>
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
    )
}

export default NotificationPage;