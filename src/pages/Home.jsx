import axios from "axios";
import React, { useEffect } from "react";

const Home = () => {
  const getData = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_HOST}user/get-user-info`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token"),
          },
        }
      );
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return <div>Home</div>;
};

export default Home;
