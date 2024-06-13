import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../Layout/RootLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import AddQueries from "../Pages/Queries/MyQueries/AddQueries";
import MyQueries from "../Pages/Queries/MyQueries/MyQueries";
import MyQueriesBanner from "../Pages/Queries/MyQueries/MyQueriesBanner";
import UpdateQueries from "../Pages/Queries/MyQueries/UpdateQueries";
import Queries from "../Pages/Queries/Queries";
import QuriesDetails from "../Pages/Queries/QuriesDetails";
import MyRecommendation from "../Pages/Queries/Recommendation/MyRecommendation";
import RecommendationsForMe from "../Pages/Queries/Recommendation/RecommendationsForMe";
import Register from "../Pages/Register/Register";
import PrivateRoute from "./PrivateRoute";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import QueriesBanner from "../Pages/Queries/QueriesBanner";
import Profile from "../Pages/Profile/Profile";
import AddRecommendation from "../Pages/Queries/AddRecommendation";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '/register',
                element: <Register />,
            },
            {
                path: '/queries',
                element: <>
                    <QueriesBanner /> <Queries />,
                </>
            },
            {
                path: '/myqueries',
                element: <>
                    <PrivateRoute>
                        <MyQueriesBanner /><MyQueries />
                    </PrivateRoute>
                </>,
            },
            {
                path: '/queriesDetails/:id',
                element: <>
                    <PrivateRoute>
                        <QuriesDetails />
                    </PrivateRoute></>,
            },
            {
                path: '/addqueries',
                element: <>
                    <PrivateRoute>
                        <AddQueries />
                    </PrivateRoute></>,
            },
            {
                path: '/updatequeries/:id',
                element: <>
                    <PrivateRoute>
                        <UpdateQueries />
                    </PrivateRoute>
                </>
            },
            {
                path: '/myrecommendation',
                element: <>
                    <PrivateRoute>
                        <MyRecommendation />
                    </PrivateRoute>
                </>
            },
            {
                path: '/recommendationsforme',
                element: <>
                    <PrivateRoute>
                        <RecommendationsForMe />
                    </PrivateRoute>
                </>
            },
            {
                path: '/profile',
                element: <>
                    <PrivateRoute>
                        <Profile />
                    </PrivateRoute>
                </>
            },
            {
                path: '/addrecommendation',
                element: <>
                    <PrivateRoute>
                        <AddRecommendation />
                    </PrivateRoute>
                </>
            },
        ]
    },
]);

export default router;
