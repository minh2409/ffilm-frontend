import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../assets/contexts/AuthContext";
import Intercept from "../../Tools/refrech";
import axios from "axios";

const PopupPostComponent = (props) => {
  const navigate = useNavigate();
  const desc = useRef();
  const { user } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const axiosJWT = axios.create();
  const cloudinaryConfig = {
    cloud_name: 'dv0hvrhle',
    api_key: '139328225433724',
    api_secret: 'nl6d0Lq4ujfMcaUapk0WeqKN04E',
    upload_preset: 'raw8ntho'
  };
  Intercept(axiosJWT);

  const submitHandler = async (e) => {
    e.preventDefault();
    e.currentTarget.disabled = true;
    let formDataInfo = {};
    formDataInfo.description = desc.current.value;

    try {
      const formDataFile = new FormData();
      if (file) {
        formDataFile.append("file", file);
        formDataFile.append("upload_preset", cloudinaryConfig.upload_preset);

        const img = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloud_name}/image/upload`,
          formDataFile
        );

        formDataInfo.imgurl = img.data.secure_url;

        console.log(formDataInfo.imgurl)
        console.log(user)

        await axiosJWT.post("https://ffilm.onrender.com/api/article", formDataInfo, {
          headers: { Authorization: "Bearer " + user.accessToken },
        })
        .then((res)=>{
            window.alert("Post has been created successfully");
            console.log(res)
            navigate("/home");
        })
        .catch((err)=>{
            console.error(err)
        })        
      } else {
        e.currentTarget.disabled = false;
        throw new Error("No file !!");
      }
    } catch (e) {
      window.alert("Photo is required");
    }
  };

  return (props.trigger) ? (
    <div id="maindiv" onClick={props.onClose} className="app z-[10000] fixed flex min-h-full min-w-full flex-col justify-center overflow-hidden bg-black bg-opacity-75 py-6 sm:py-12 opacity-up">
      <div className="w-7/12 mx-auto bg-white p-4 rounded-lg shadow-md slide-up ">
        <div className="flex items-center space-x-4 mb-4">
          <img className="w-12 h-12 rounded-full" src="https://via.placeholder.com/150" alt="User Avatar" />
          <input className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" type="text" placeholder="What's on your mind?" ref={desc} required />
        </div>
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <input type="file" id="file" accept=".png, .jpeg, .jpg" onChange={(e) => setFile(e.target.files[0])} className="flex items-center space-x-1 text-red-500 hover:bg-gray-100 p-2 rounded-lg hidden" />
            <label htmlFor="file" className="flex items-center space-x-1 text-red-500 hover:bg-gray-100 p-2 rounded-lg cursor-pointer">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.94 5H13v7h-2v-7H4.06L9 10l3-4 3 4z"></path></svg>
              <span>Photo</span>
            </label>
          </div>
          <button onClick={submitHandler} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">Post</button>
        </div>
      </div>
    </div>
  ) : "";
};

export default PopupPostComponent;
