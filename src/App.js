import { useState, useEffect, Fragment, useContext, useCallback } from 'react';
import { useLocation, Routes, Route, Navigate } from 'react-router-dom';

import "preline/preline";

import PopupPostComponent from './components/PopUpPostComponent/PopupPostComponent';
import PopupPosterComponent from './components/PopUpPostComponent/PopupPosterComponent';
import DefaultComponent from './components/DefaultComponent/DefaultComponent';

import { routes} from "./routes";
import { AuthContext} from "./assets/contexts/AuthContext"
import LoginPage from './pages/SigninPage/LoginPage';
import SignupPage from './pages/SigninPage/SignupPage';
import ResetPasswordPage from './pages/SigninPage/ResetPasswordPage';

function App() {
  const location = useLocation();
  // const [isAuthenticated, setIsAuthenticated] = useState(false)
  const { user } = useContext(AuthContext)

  const [rerenderFeed, setRerenderFeed] = useState(0);
  const handleChange = useCallback((newValue) => {
    setRerenderFeed(newValue);
  }, []);


  useEffect(() => {
    window.HSStaticMethods.autoInit();
  }, [location.pathname]);

  // useEffect(() =>{
  //   const token = sessionStorage.getItem("token");
  //   if (user) {
  //     setIsAuthenticated(true);
  //   } else {
  //     setIsAuthenticated(false);
  //   }
  // },[]);

  // useEffect(() => {
  //   const handleStorageChange = (event) => {
  //     if (event.key === "token") {
  //       const token = event.newValue;
  //       if (token) {
  //         setIsAuthenticated(true);
  //       } else {
  //         setIsAuthenticated(false);
  //       }
  //     }
  //   };

  //   window.addEventListener('storage', handleStorageChange);

  //   return () => {
  //     window.removeEventListener('storage', handleStorageChange);
  //   };
  // }, []);


  const [popupPost, setPopupPost] = useState(false);
  const [popupPoster, setPopupPoster] = useState(false); 
  return (
    <div className='app'>
      
      <PopupPostComponent trigger={popupPost} setTrigger={setPopupPost} onClose={(e) => {
        console.log(e.target);
        if (e.target.id === "maindiv") {
          setPopupPost(false);
        }
      }}/>
      
      <PopupPosterComponent trigger={popupPoster} setTrigger={setPopupPoster} onClose={(e) => {
        console.log(e.target);
        if (e.target.id === "maindiv") {
          setPopupPoster(false);
        }
      }}/>  

      <Routes>
        <Route
          path="/login"
          element={!user ? <LoginPage /> : <Navigate to="/home" />}
        />
        <Route
          path="/signup"
          element={!user ? <SignupPage /> : <Navigate to="/home" />}
        />
        <Route
          path="/resetPassword"
          element={!user ? <ResetPasswordPage /> : <Navigate to="/home" />}
        />
        {routes.map((route, index) => {
          const Page = route.page;
          const Layout = route.isShowSidebar ? DefaultComponent : Fragment;

          const propsToPass = route.props
            ? Object.fromEntries(
                Object.entries(route.props).map(([key, value]) => [
                  key,
                  eval(value),
                ])
              )
            : {};

          return (
            <Route
              key={index}
              path={route.path}
              element={
                user ? (
                  <Layout>
                    <Page {...propsToPass} />
                  </Layout>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          );
        })}
      </Routes>
    </div>
  );
}

export default App;
