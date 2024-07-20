import FollowingPage from "../pages/FollowingPage/FollowingPage";
import HomePage from "../pages/HomePage/HomePage";
import MarketplacePage from "../pages/MarketplacePage/MarketplacePage";
import Messenger from "../pages/MessengerPage/MessengerPage";
import NotificationPage from "../pages/NotificationPage/NotificationPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import SuggestionsPage from "../pages/SuggestionPage/SuggestionPage";

import AdminPage from "../admin/pages/AdminPage/AdminPage";
import SearchPage from "../pages/SearchPage/SearchPage";
import UserPage from "../admin/pages/UserPage/UserPage";
import StatPage from "../admin/pages/StatPage/StatPage";
import OnworkingPage from "../pages/OnworkingPage/OnworkingPage";

export const routes = [
    {
        path: '/',
        page: HomePage,
        props: { setTrigger: 'setPopupPost', setTriggerPost: 'setPopupPoster', rerenderFeed:"rerenderFeed", onChange:"handleChange" },
        isShowSidebar: true,
    },
    {
        path: '/home',
        page: HomePage,
        props: { setTrigger: 'setPopupPost', setTriggerPost: 'setPopupPoster', rerenderFeed:"rerenderFeed", onChange:"handleChange" },
        isShowSidebar: true,
    },
    {
        path: '/marketplace/*',
        page: MarketplacePage,
        isShowSidebar: true,
    },
    {
        path: '/notifications',
        props: { setTriggerPost: 'setPopupPoster'},
        page: NotificationPage,
        isShowSidebar: true,
    },
    {
        path: '/suggestions',
        props: { setTriggerPost: 'setPopupPoster', rerenderFeed:"rerenderFeed", onChange:"handleChange"},
        // page: SuggestionsPage,
        page: OnworkingPage,
        isShowSidebar: true,
    },
    {
        path: '/following',
        props: { setTriggerPost: 'setPopupPoster', rerenderFeed:"rerenderFeed", onChange:"handleChange"  },
        page: FollowingPage,
        isShowSidebar: true,
        
    },
    {
        path: '/messenger',
        // page: Messenger,
        page: OnworkingPage,
        isShowSidebar: true,
    },
    {
        path: '/search',
        page: SearchPage,
        props: { setTriggerPost: 'setPopupPoster', rerenderFeed:"rerenderFeed", onChange:"handleChange" },
        isShowSidebar: true,
    },
    {
        path: '/profile/:username',
        page: ProfilePage,
        isShowSidebar: true,
        props: {rerenderFeed:"rerenderFeed", onChange:"handleChange"}
    },
    {
        path: '/adminpage/*',
        page: AdminPage,
        isShowSidebar: false,
    },
    {
        path: '/*',
        page: OnworkingPage,
        isShowSidebar: false,
    },
];

export const adminroutes = [
    {
        path: '/',
        page: StatPage,
        isShowSidebar: true,
    },
    {
        path: '/user',
        page: UserPage,
        isShowSidebar: true,
    },
    {
        path: '/stat',
        page: StatPage,
        isShowSidebar: true,
    },
];