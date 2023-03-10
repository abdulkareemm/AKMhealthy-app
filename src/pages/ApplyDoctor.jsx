import axios from "axios";
import React from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {Layout,DoctorForm} from "../components";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import moment from "moment"

const ApplayDoctor = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        `${process.env.REACT_APP_LOCAL_SERVER_HOST}user/apply-doctor`,
        {
          ...values,
          userId: user._id,
          timings: [
            moment(values.timings[0]).format("HH:mm"),
            moment(values.timings[1]).format("HH:mm"),
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.msg);
        navigate("/")
      }else{
        toast.error(response.data.msg)
      }
    } catch (err) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout>
      <h1 className="text-3xl text-black/70 font-bold">
        Apply Doctor Account
      </h1>
      <div className="flex items-center justify-center mt-2">
        <hr className="text-black  border-2 w-[93%]" />
      </div>
      <DoctorForm onFinish={onFinish}/>
    </Layout>
  );
};

export default ApplayDoctor;
