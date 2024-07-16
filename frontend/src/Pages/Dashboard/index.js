import { useEffect, useState } from "react";
import { BASE_URL } from "../../Utils/BaseUrl";
import axios from "axios";

const Home = () => {
  const [userData, setUserData] = useState(null);
  const token = localStorage.getItem("token");

  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/api/user/get-user", {
        headers: { token },
      });
      if (res.status === 200) {
        setUserData(res.data);
      }
    } catch (err) {
      throw err;
    }
  };

  const greetByName = () => {
    if (userData?.first_name) {
      const firstName = userData?.first_name;
      const upperChar = firstName && firstName.slice(0, 1).toUpperCase();
      const restChar = firstName && firstName.slice(1);

      return upperChar + restChar;
    } else {
      return "User";
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const userKeys = [
    { label: "First Name", value: "first_name" },
    { label: "Last Name", value: "last_name" },
    { label: "Email Address", value: "email" },
    { label: "Mobile.", value: "mobile_no" },
  ];

  const UserInfo = () => {
    return (
      userData &&
      userKeys?.map((el, i) => {
        return (
          <>
            <div className='row'>
              <div className='col-sm-3'>
                <h6 className='mb-0'>{el.label}</h6>
              </div>
              <div className='col-sm-9 text-secondary'>{userData[el.value]}</div>
            </div>
            {i === userKeys.length - 1 ? "" : <hr />}
          </>
        );
      })
    );
  };

  return (
    <>
      <h1 className='text-center'>
        Welcome, <span style={{ fontWeight: "900" }}>{greetByName()}</span> 👋
      </h1>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <div className='card mb-3'>
              <div className='card-body'>
                <UserInfo />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
