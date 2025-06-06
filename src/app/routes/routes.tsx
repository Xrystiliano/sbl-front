import {createBrowserRouter} from 'react-router-dom';
import App from "../../App.tsx";
import LoginPage from "../../pages/user/LoginPage.tsx";
import RegisterPage from "../../pages/user/RegisterPage.tsx";
import MainPage from "../../pages/user/MainPage.tsx";
import NewsPage from "../../pages/news/NewsPage.tsx";
import NewsDetailPage from "../../pages/news/NewsDetailPage.tsx";
import AddNewsPage from "../../pages/news/AddNewsPage.tsx";

export const router = createBrowserRouter([
    {
        path: '/',
        element: < App/>,
        children: [
            {path: 'login', element: <LoginPage />},
            {path: 'register', element: <RegisterPage />},
            {path: 'main', element: <MainPage/>},
            {path: 'news', element: <NewsPage/>},
            {path: 'news/add', element: <AddNewsPage/>},
            {path: 'news/:id', element: <NewsDetailPage/>},
            // {path: 'checkout', element: <Checkout/>},
            // {
            //     path: 'admin',
            //     element: <AdminLayout />,
            //     children: [
            //         // {path: 'services', element: <AdminServices />},
            //         {path: 'orders', element: <AdminOrders />},
            //         {path: 'statistics', element: <AdminStats />},
            //         {path: 'coupons', element: <AdminCoupons />},
            //     ]
            // },
            // {
            //     path: 'profile',
            //     element: <CustomerLayout />,
            //     children: [
            //         {path: '', element: <CustomerProfile />},
            //         {path: 'orders', element: <CustomerOrders />},
            //     ]
            // },
            {path: '', element: <MainPage />},
        ],
    }
]);