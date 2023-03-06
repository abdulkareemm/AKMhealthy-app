import React from "react";
import Image from "../img/Doctor.png";
import { Button, Form, Input } from "antd";
import { PRIMARY, HEADER } from "../utils/CommenStyles";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertsSlice";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_HOST}user/login`,
        values
      );
      if (response.data.success) {
        toast.success(response.data.msg);
        localStorage.setItem("token", response.data.token);
        setTimeout(() => {
          dispatch(hideLoading());

          navigate("/");
        }, 2000);
      } else {
        toast.error(response.data.msg);
      }
    } catch (err) {
      dispatch(hideLoading());
      toast.error(err.message);
    }
  };
  return (
    <div className="flex items-center flex-row h-[100vh] justify-center gap-6">
      <div className="w-[20rem] h-[30rem] hidden md:flex justify-center items-center">
        <img src={Image} alt="" />
      </div>
      <div className=" flex flex-col shadow-card p-4 w-[35rem] rounded-md gap-6 bg-slate-200 sm:p-5 ">
        <h1 className={`${HEADER}`}>Welcome Back</h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Email" name="email">
            <Input placeholder="example@gmail.com" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input placeholder="*******" type="password" />
          </Form.Item>
          <Button className={`${PRIMARY} mb-4`} htmlType="submit">
            LOGIN
          </Button>
          <Link className="text-xs text-blue-700" to="/register">
            CLICK HERE TO REGISTER
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default Login;
