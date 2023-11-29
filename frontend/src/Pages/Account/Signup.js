import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useFormik } from "formik";
import logo from "../../Images/Group 938.png";
import axios from "axios";
import { BASE_URL } from "../../Utils/BaseUrl";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const formStyles = {
  borderTop: "0",
  borderRight: "0",
  borderLeft: "0",
  borderRadius: "0",
  borderBottom: "1px solid #ced4da",
};

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      mobile_no: "",
      mobile_no_pre: "",
      city: "",
      password: "",
      email: "",
    },
    validationSchema: "",
    onSubmit: async (values) => {
      try {
        const res = await axios.post(BASE_URL + "/api/user/register-user", values);
        if (res.status === 201) {
          navigate("/");
          toast.success("User signed up");
        }
      } catch (err) {
        toast.error("Sign up failed");
        return err;
      }
    },
  });

  const { handleSubmit, handleChange } = formik;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    formik.setFieldValue("mobile_no_pre", "+91");
  }, []);

  const CountryCodes = () =>
    ["+91", "+1", "+44"].map((el, i) => (
      <option key={i} value={el}>
        {el}
      </option>
    ));
  return (
    <div className=''>
      <div className='py-5 text-center' style={{ background: "#001B30" }}>
        <img src={logo} />
      </div>
      <div className='container mt-5'>
        <h1 className='mb-5 text-center fw-bold'>Sign Up</h1>
        <form onSubmit={handleSubmit} className='mb-5'>
          <div className='row mb-5'>
            <div className='col-md-6'>
              <label htmlFor='firstName' className='form-label'>
                First Name
              </label>
              <input
                name='first_name'
                value={formik.values.first_name}
                onChange={(e) => handleChange(e)}
                type='text'
                className='form-control'
                style={formStyles}
                id='firstName'
              />
            </div>
            <div className='col-md-6'>
              <label htmlFor='lastName' className='form-label'>
                Last Name
              </label>
              <input
                name='last_name'
                value={formik.values.last_name}
                onChange={(e) => handleChange(e)}
                type='text'
                className='form-control'
                style={formStyles}
                id='lastName'
              />
            </div>
          </div>

          <div className='row mb-5'>
            <div className='col-md-6'>
              <label htmlFor='phone' className='form-label'>
                Mobile No.
              </label>
              <div className='input-group'>
                <div className='input-group-prepend'>
                  <select
                    name='mobile_no_pre'
                    value={formik.values.mobile_no_pre}
                    onChange={(e) => handleChange(e)}
                    className='form-select'
                    style={formStyles}
                    id='phoneCode'>
                    <CountryCodes />
                  </select>
                </div>
                <input
                  name='mobile_no'
                  value={formik.values.mobile_no}
                  onChange={(e) => handleChange(e)}
                  type='tel'
                  className='form-control'
                  style={formStyles}
                  id='phone'
                />
              </div>
            </div>
            <div className='col-md-6'>
              <label htmlFor='email' className='form-label'>
                Email-ID
              </label>
              <input
                name='email'
                value={formik.values.email}
                onChange={(e) => handleChange(e)}
                type='email'
                className='form-control'
                style={formStyles}
                id='email'
              />
            </div>
          </div>

          <div className='row mb-5'>
            <div className='col-md-6'>
              <label htmlFor='city' className='form-label'>
                City
              </label>
              <input
                name='city'
                value={formik.values.city}
                onChange={(e) => handleChange(e)}
                type='text'
                className='form-control'
                style={formStyles}
                id='city'
              />
            </div>
            <div className='col-md-6'>
              <label htmlFor='password' className='form-label'>
                Enter Password
              </label>
              <div className='input-group'>
                <input
                  name='password'
                  value={formik.values.password}
                  onChange={(e) => handleChange(e)}
                  type={showPassword ? "text" : "password"}
                  className='form-control '
                  style={formStyles}
                  id='password'
                />
                <button type='button' className='btn' style={formStyles} onClick={togglePasswordVisibility}>
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
          </div>

          <div className='d-flex justify-content-center'>
            <button
              type='submit'
              className='btn '
              style={{
                background: "#001B30",
                color: "white",
                paddingRight: "4rem",
                paddingLeft: "4rem",
                borderRadius: "5rem",
              }}>
              Sign up
            </button>
          </div>
          <div className='text-center'>
            <Link to='/sign-in'>Sign in?</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
