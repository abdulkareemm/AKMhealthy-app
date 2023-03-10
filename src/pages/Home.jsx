import { Col, Row } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Doctor, Layout } from "../components";
import { hideLoading, showLoading } from "../redux/alertsSlice";

const Home = () => {
  const [doctors, setDoctors] = useState();
  const dispatch = useDispatch();
  const getDoctors = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get(
        `${process.env.REACT_APP_LOCAL_SERVER_HOST}user/get-doctors`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (response.data.success) {
        dispatch(hideLoading());
        dispatch(setDoctors(response.data.doctors));
      }
    } catch (err) {
      dispatch(hideLoading());
      console.log(err.message);
    }
  };
  useEffect(() => {
    getDoctors();
  }, []);

  return (
    <Layout>
      <Row gutter={20}>
        {doctors &&
          doctors.map((doctor) => (
            <Col span={8} xs={24} sm={24} lg={8}>
              <Doctor key={doctor._id} doctor={doctor} />
            </Col>
          ))}
      </Row>
    </Layout>
  );
};

export default Home;
