import 'preline/preline'
import { useState, useEffect } from 'react';

const PopupPosterComponent = (props) => {
    const Comments = [
        { avatar: 'https://via.placeholder.com/150', username: 'Jane Smith', userId: 'janesmith', text: 'Amazing photo!' },
        { avatar: 'https://via.placeholder.com/150', username: 'Bob Johnson', userId: 'bobjohnson', text: 'Great shot!' },
      ];
    
    const[comments, setComments] = useState([]);

    useEffect(() => {
        setComments(Comments);
    }, []);

    return(props.trigger)?(
        <div id="maindiv" onClick={props.onClose} className="app opacity-up fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[10000] min-h-full min-w-full flex-col overflow-hidden py-6 sm:py-12">
            <div className="bg-white rounded-lg overflow-hidden w-full max-w-6xl mx-4 slide-up">
                <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-2/3">
                    <img src="https://images.unsplash.com/photo-1633114128174-2f8aa49759b0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" alt="Full size" className="object-contain h-full w-full" />
                </div>
                <div className="w-full md:w-1/3 p-4 flex flex-col">
                    <div className="flex items-center mb-4">
                    <img src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80" alt="User avatar" className="w-12 h-12 rounded-full mr-4" />
                    <div>
                        <h2 className="text-lg font-semibold">username</h2>
                        <p className="text-gray-600">@userId</p>
                    </div>
                    </div>
                    <p className="mb-4">Lorem Ipsum</p>
                    <div className="flex items-center mb-4">
                    <span className="mr-4">
                        likes
                    </span>
                    <span>
                        dislikes
                    </span>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                    {comments.map((comment, index) => (
                        <div key={index} className="mb-2">
                        <div className="flex items-center mb-1">
                            <img src={comment.avatar} alt="Commenter avatar" className="w-8 h-8 rounded-full mr-2" />
                            <div>
                            <h3 className="text-sm font-semibold">{comment.username}</h3>
                            <p className="text-xs text-gray-600">@{comment.userId}</p>
                            </div>
                        </div>
                        <p className="text-sm">{comment.text}</p>
                        </div>
                    ))}
                    </div>
                </div>
                </div>
            </div>
        </div>
    ):"";
}
export default PopupPosterComponent;