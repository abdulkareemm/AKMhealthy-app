import { Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Layout } from "../../components";
import { hideLoading, showLoading } from "../../redux/alertsSlice";

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const dispatch = useDispatch();
  const getUsersData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get(
        `${process.env.REACT_APP_LOCAL_SERVER_HOST}admin/get-doctors`,
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
        setDoctors(response.data.doctors);
      } else {
        toast.error(response.data.msg);
      }
    } catch (err) {
      dispatch(hideLoading());
      console.log(err.message);
      toast.error("SomeThing went wrong");
    }
  };
  
  const changeDoctorStatus = async (id, status) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        `${process.env.REACT_APP_LOCAL_SERVER_HOST}admin/change-doctor-status`,
        { status, doctorId: id },
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
        setDoctors(response.data.doctors)
      } else {
        toast.error(response.data.msg);
      }
    } catch (err) {
      dispatch(hideLoading());
      toast.error("SomeThing went wrong");
    }
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <h1>
          {record.firstName} {record.lastName}
        </h1>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (id, record) => {
        return (
          <div className="flex  underline text-blue-700 cursor-pointer">
            {record.status === "pending" ? (
              <div onClick={()=>changeDoctorStatus(record._id, "approved")}>Approve</div>
            ) : (
              <div onClick={()=>changeDoctorStatus(record._id, "block")}>Block</div>
            )}
          </div>
        );
      },
    },
  ];

  
  useEffect(() => {
    getUsersData();
  }, []);

  return (
    <Layout>
      <h1>DoctorList</h1>
      {doctors?.length > 0 ? (
        <Table columns={columns} dataSource={doctors} />
      ) : (
        <h1>There is no doctors </h1>
      )}
    </Layout>
  );
};

export default DoctorList;
