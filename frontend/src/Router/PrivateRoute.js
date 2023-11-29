import { Navigate } from "react-router-dom";
import Sidebar from "../Components/Layout/SideBar";

const PrivateRoute = ({ children }) => {
  const isAuth = () => Boolean(localStorage.getItem("token"));
  return isAuth() ? <Sidebar children={children} /> : <Navigate to={"/sign-in"} />;
  // return <Sidebar children={children} />;
};

export default PrivateRoute;
