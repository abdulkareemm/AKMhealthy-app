import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { DoctorForm, Layout } from "../../components";
import { hideLoading, showLoading } from "../../redux/alertsSlice";
import moment from "moment";

const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [doctor, setDoctor] = useState(null);

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        `${process.env.REACT_APP_LOCAL_SERVER_HOST}doctor/update-doctor-info/${id}`,
        {
          ...values,
          timings: [
            moment(values?.timings[0]).format("HH:mm"),
            moment(values?.timings[1]).format("HH:mm"),
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
        setDoctor(response.data.doctor);
      } else {
        toast.error(response.data.msg);
      }
    } catch (err) {
      dispatch(hideLoading());
      console.log(err.message);
      toast.error("Something went wrong");
    }
  };
  const getDoctorInfo = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get(
        `${process.env.REACT_APP_LOCAL_SERVER_HOST}doctor/get-doctor-info-by-user-id/${id}`,
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
        setDoctor(response.data.doctor);
      } else {
        toast.error(response.data.msg);
      }
    } catch (err) {
      dispatch(hideLoading());
      console.log(err.message);
      toast.error("Something went wrong");
    }
  };
  useEffect(() => {
    getDoctorInfo();
  }, []);
  return (
    <Layout>
      <h1 className="text-3xl text-black/70 font-bold">Doctor Profile</h1>
      <div className="flex items-center justify-center mt-2">
        <hr className="text-black  border-2 w-[93%]" />
      </div>
      {doctor && (
        <DoctorForm
          onFinish={onFinish}
          initivalValues={doctor ? doctor : null}
        />
      )}
    </Layout>
  );
};

export default Profile;
