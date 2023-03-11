import { Button, Col, DatePicker, Row, TimePicker } from "antd";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Layout } from "../components";
import { hideLoading, showLoading } from "../redux/alertsSlice";

const BookAppointment = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.user);
  const [doctor, setDoctor] = useState(null);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [avialability, setAvialability] = useState(false);
  const dispatch = useDispatch();
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
  const checkAvailability = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        `${process.env.REACT_APP_LOCAL_SERVER_HOST}appointment/check-booking-avilability`,
        {
          doctorId: id,
          date: date,
          time: time,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (response.data.success) {
        dispatch(hideLoading());
        toast.success(response.data.msg);
        setAvialability(true);
      } else {
        toast.error(response.data.msg);
        dispatch(hideLoading());
      }
    } catch (err) {
      dispatch(hideLoading());
      console.log(err.message);
      toast.error("Error booking appointment");
    }
  };
  const BookNow = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        `${process.env.REACT_APP_LOCAL_SERVER_HOST}appointment/book-appointment`,
        {
          doctorId: id,
          userId: user._id,
          doctorInfo: doctor,
          userInfo: user,
          date: date,
          time: time,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (response.data.success) {
        dispatch(hideLoading());
        setAvialability(false);
        toast.success(response.data.msg);
      }
    } catch (err) {
      dispatch(hideLoading());
      console.log(err.message);
      toast.error("Error booking appointment");
    }
  };
  useEffect(() => {
    getDoctorInfo();
  }, []);
  return (
    <Layout>
      {doctor && (
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl">
            {doctor.firstName} {doctor.lastName}
          </h1>
          <hr className="text-black  border-2 w-[90%] mt-2" />
          <Row>
            <Col span={8} sm={24} xs={24} lg={8}>
              <h1 className="flex gap-2">
                <p className="font-bold">Timings :</p>
                {doctor.timings[0]} - {doctor.timings[1]}
              </h1>
              <div className="flex flex-col w-[20rem] mt-4 gap-2">
                <DatePicker
                  format="DD-MM-YYYY"
                  onChange={(value) =>
                    setDate(moment(value.toISOString()).format("DD-MM-YYYY"))
                  }
                />
                <TimePicker
                  format="HH:mm"
                  
                  onChange={(value) => {
                    setTime(moment(value.toISOString()).format("HH:mm"));
                  }}
                />
                {avialability ? (
                  <Button
                    className="bg-backgroundC mt-5 p-5 flex items-center justify-center"
                    onClick={BookNow}
                  >
                    Book Now
                  </Button>
                ) : (
                  <Button
                    className="bg-backgroundC mt-2 p-5 flex items-center justify-center"
                    onClick={() => checkAvailability()}
                  >
                    Check Availability
                  </Button>
                )}
              </div>
            </Col>
          </Row>
        </div>
      )}
    </Layout>
  );
};

export default BookAppointment;
