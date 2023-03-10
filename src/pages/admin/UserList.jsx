import { Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Layout } from "../../components";
import { hideLoading, showLoading } from "../../redux/alertsSlice";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => {
        return <div className="flex  underline text-blue-700 cursor-pointer">
          <h1>Block</h1>
        </div>;
      },
    },
  ];

  const getUsersData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get(
        `${process.env.REACT_APP_LOCAL_SERVER_HOST}admin/get-users`,
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
        console.log(response.data.users);
        setUsers(response.data.users);
      } else {
        toast.error(response.data.msg);
      }
    } catch (err) {
      dispatch(hideLoading());
      toast.error("SomeThing went wrong");
    }
  };
  useEffect(() => {
    getUsersData();
  }, []);

  return <Layout><h1>Users List</h1>
  <Table columns={columns} dataSource={users}/>
  
  </Layout>;
};

export default UserList;
