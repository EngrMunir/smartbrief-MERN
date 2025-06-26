import Main from "../Layout/Main";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import { createBrowserRouter } from "react-router-dom";
import ManageSummaries from "../pages/Dashboard/AdminDashboard/ManageSummaries";
import ManageUsers from "../pages/Dashboard/AdminDashboard/ManageUsers";
import AdminDashboard from "../pages/Dashboard/AdminDashboard";
import UserDashboard from "../pages/Dashboard/UserDashboard/UserDashboard";
import EditorDashboard from "../pages/Dashboard/EditorDashboard/EditorDashboard";
import Dashboard from "../pages/Dashboard/DashboardLayout";
import ReviewerDashboard from "../pages/Dashboard/ReviewerDashboard/ReviewerDashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },
  {
    path:'/dashboard',
    element:<Dashboard/>
  },
 {
  path: "/dashboard/admin",
  element: <AdminDashboard />,
  children: [
    { path: "users", element: <ManageUsers /> },
    { path: "summaries", element: <ManageSummaries /> },
  ],
},
{
  path: "/dashboard/user",
  element: <UserDashboard />,
},
{
  path: "/dashboard/editor",
  element: <EditorDashboard />,
},
{
  path: "/dashboard/reviewer",
  element: <ReviewerDashboard />,
}

]);

export default router;
