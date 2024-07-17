import { Navigate } from "react-router-dom";
import Sidebar from "../Components/Layout/SideBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  // const navigate = useNavigate();

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      console.log(error, ">?");
      if (error?.response?.data?.status === false) {
        localStorage.clear();
        <Navigate to={"/sign-in"} />;
      } else {
        throw error;
      }
    }
  );

  const isAuth = () => Boolean(localStorage.getItem("token"));
  return isAuth() ? <Sidebar children={children} /> : <Navigate to={"/sign-in"} />;
  // return <Sidebar children={children} />;
};

export default PrivateRoute;
