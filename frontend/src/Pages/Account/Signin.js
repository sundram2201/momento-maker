import React from "react";
import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { SignInAPI } from "../../APIs/index";
import toast from "react-hot-toast";
import { BASE_URL } from "../../Utils/BaseUrl";
import axios from "axios";

const SignIn = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const isValidEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(values.email);
    console.log(values, ">?>?");

    if (!isValidEmail) {
      onFinishFailed({
        errorFields: [{ email: ["Email"] }],
      });
      return;
    }

    try {
      const res = await axios.post(BASE_URL + "/api/user/login-user", values);
      console.log(res);

      if (res.status === 200) {
        navigate("/");
        toast.success("User signed in");
        localStorage.setItem("token", res?.data?.token);
      }
    } catch (err) {
      localStorage.clear();
      toast.error(err?.response?.data?.error);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    localStorage.clear();
    toast.error(errorInfo?.response?.data?.error);
  };
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Form
        name='basic'
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'>
        <Form.Item
          label='Email'
          name='email'
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}>
          <Input />
        </Form.Item>

        <Form.Item
          label='Password'
          name='password'
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}>
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
        <Link to={"/sign-up"}>
          <Button type='link' style={{ marginTop: "20px" }}>
            Create new account?
          </Button>
        </Link>
      </Form>
    </div>
  );
};
export default SignIn;
