import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import {  setUser } from "../redux/userSlice";
const ProtectorRoutes = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const getUser = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        `${process.env.REACT_APP_LOCAL_SERVER_HOST}user/get-user-info`,
        { token: localStorage.getItem("token") },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (response.data.success) {
        dispatch(hideLoading());
        dispatch(setUser(response.data.user));
      } else {
        dispatch(hideLoading());
        localStorage.removeItem("token");
        navigate("/login");
      }
    } catch (err) {
      dispatch(hideLoading());
      console.log(err.message);
    }
  };
  useEffect(() => {
    if(!user)getUser();
  }, [user]);
  if (localStorage.getItem("token")) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectorRoutes;
