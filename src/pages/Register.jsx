import React from "react";
import Image from "../img/Doctor.png";
import { Button, Form, Input } from "antd";
import { PRIMARY, HEADER } from "../utils/CommenStyles";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertsSlice";
const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        `${process.env.REACT_APP_LOCAL_SERVER_HOST}user/register`,
        values
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.msg);
        toast("Redirecting to login page");
        setTimeout(() => {
          navigate("/login");
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
    <div className="flex items-center flex-row h-[100vh] justify-center gap-6 bg-[#005545]">
      <div className="w-[20rem] h-[30rem] hidden md:flex justify-center items-center">
        <img src={Image} alt="" />
      </div>
      <div className=" flex flex-col shadow-card p-4 w-[35rem] rounded-md gap-6 bg-slate-200">
        <h1 className={`${HEADER}`}>Nice To Meet U</h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input your username" }]}
          >
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email" }]}
          >
            <Input placeholder="example@gmail.com" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password" }]}
          >
            <Input placeholder="*******" type="password" />
          </Form.Item>
          <Button className={`${PRIMARY} mb-4`} htmlType="submit">
            REGISTER
          </Button>
          <Link className="text-xs text-blue-700" to="/login">
            CLICK HERE TO LOGIN
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default Register;
