import React from "react";
import Image from "../img/Doctor.png";
import { Button, Form, Input } from "antd";
import {PRIMARY,HEADER} from  "../utils/CommenStyles"
import { Link } from "react-router-dom";
const Register = () => {

  const onFinish = (values)=>{
    console.log(values);

  }
  return (
    <div className="flex items-center flex-row h-[100vh] justify-center gap-6">
      <div className="w-[20rem] h-[30rem]">
        <img src={Image} alt="" />
      </div>
      <div className=" flex flex-col shadow-card p-4 w-[600px] rounded-md gap-6" >
        <h1 className={`${HEADER}`}>Nice To Meet U</h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Name" name="name">
            <Input placeholder="Name"/>
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input placeholder="example@gmail.com" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input placeholder="*******" type="password" />
          </Form.Item>
          <Button className={`${PRIMARY} mb-4`} htmlType="submit">REGISTER</Button>
          <Link className="text-xs text-blue-700" to="/login">CLICK HERE TO LOGIN</Link>
        </Form>
      </div>
    </div>
  );
};

export default Register;
