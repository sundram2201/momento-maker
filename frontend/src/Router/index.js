import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Dashboard";
import Signup from "../Pages/Account/Signup";
import SignIn from "../Pages/Account/Signin";
import PrivateRoute from "./PrivateRoute";
import Profile from "../Pages/Account/Profile";
import AddMoment from "../Pages/Moments/AddMoment";
import MomentList from "../Pages/Moments/MomentList";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <PrivateRoute>
          <Home />
        </PrivateRoute>
      ),
    },
    {
      path: "/moment-list",
      element: (
        <PrivateRoute>
          <MomentList />
        </PrivateRoute>
      ),
    },

    {
      path: "/add-moment",
      element: (
        <PrivateRoute>
          <AddMoment />
        </PrivateRoute>
      ),
    },
    {
      path: "/profile",
      element: (
        <PrivateRoute>
          <Profile />
        </PrivateRoute>
      ),
    },
    {
      path: "/sign-in",
      element: <SignIn />,
    },
    {
      path: "/sign-up",
      element: <Signup />,
    },
  ]);

  return <RouterProvider router={router} />;
};
export default Router;
