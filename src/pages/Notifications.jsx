import { Tabs } from "antd";
import axios from "axios";
import React from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Layout } from "../components";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import { setUser } from "../redux/userSlice";

const Notifications = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const markAllAsSeen = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        `${process.env.REACT_APP_LOCAL_SERVER_HOST}user/mark-all-notifications-as-seen`,
        { userId: user._id },
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
        console.log(response.data.user);

        dispatch(setUser(response.data.user));
      } else {
        toast.error(response.data.msg);
      }
    } catch (err) {
      dispatch(hideLoading());
      toast.error("SomeThing went wrong");
    }
  };
  const deleteAllSeenNotifications = async()=>{
    try {
      dispatch(showLoading());
      const response = await axios.post(
        `${process.env.REACT_APP_LOCAL_SERVER_HOST}user/delete-all-notifications`,
        { userId: user._id },
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
        console.log(response.data.user);

        dispatch(setUser(response.data.user));
      } else {
        toast.error(response.data.msg);
      }
    } catch (err) {
      dispatch(hideLoading());
      toast.error("SomeThing went wrong");
    }
  }
  return (
    <Layout>
      <h1>Notifications</h1>
      <Tabs>
        <Tabs.TabPane tab="Unseen" key={0}>
          <div className="flex justify-end">
            <h1
              className="underline text-blue-500 cursor-pointer"
              onClick={markAllAsSeen}
            >
              Mark all as seen
            </h1>
          </div>
          {user?.unseenNotifications.map((noti, id) => {
            return (
              <div
                className="shadow-card p-2 rounded-md max-w-[200px]"
                key={id}
              >
                <div>{noti.message}</div>
              </div>
            );
          })}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Seen" key={1}>
          <div className="flex justify-end">
            <h1
              className="underline text-blue-500 cursor-pointer"
              onClick={deleteAllSeenNotifications}
            >
              Delete all
            </h1>
          </div>
          {user?.seenNotifications.map((noti, id) => {
            return (
              <div
                className="shadow-card p-2 rounded-md max-w-[200px]"
                key={id}
              >
                <div>{noti.message}</div>
              </div>
            );
          })}
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
};

export default Notifications;
