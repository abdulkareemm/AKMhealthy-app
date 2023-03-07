import { Avatar, Badge } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Layout = (props) => {
  const userMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Appointments",
      path: "/appointments",
      icon: "ri-file-list-line",
    },
    {
      name: "Apply Doctor",
      path: "/apply-doctor",
      icon: "ri-hospital-line",
    },
    {
      name: "Profile",
      path: "/profile",
      icon: "ri-user-line",
    },
  ];
  const adminMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Users",
      path: "/users",
      icon: "ri-user-line",
    },
    { name: "Doctors", path: "/doctors", icon: "ri-user-star-line" },
    {
      name: "Profile",
      path: "/profile",
      icon: "ri-user-line",
    },
  ];
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [collapsed, setCollapsed] = useState(false);
  const menuToBeRender = user?.isAdmin ? adminMenu : userMenu;

  return (
    <div className="flex flex-row px-[20px] mt-[20px]">
      {/* sidebar */}
      <div
        className={`${
          collapsed ? "w-16" : "w-[16rem]"
        } bg-backgroundC rounded-[5px] shadow-card mr-[20px] h-[96vh]  p-2`}
      >
        <div
          className={`flex items-center justify-center text-blue-200/40 mt-4 ${
            collapsed ? "flex-col " : "flex-row gap-4 "
          } `}
        >
          <h1 className="text-4xl font-bold ">A</h1>
          <h1 className="text-4xl font-bold ">K</h1>
          <h1 className="text-4xl font-bold ">M</h1>
        </div>
        <div className="mt-[6rem]">
          {menuToBeRender.map((menu, id) => {
            const isActive = location.pathname === menu.path;
            return (
              <div
                key={id}
                className={`flex items-center justify-start gap-3 mt-[25px] ${
                  isActive ? "bg-[#013733] rounded-[4px] p-2" : ""
                }`}
              >
                <Link
                  to={menu.path}
                  className="text-item text-[20px] flex flex-row"
                >
                  <i className={`${menu.icon} mx-2`}></i>
                  <h1 className={`${collapsed ? "hidden" : ""}`}>
                    {menu.name}
                  </h1>
                </Link>
              </div>
            );
          })}
          <div
            className="text-item text-[20px] flex flex-row mt-[25px] cursor-pointer"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
          >
            <i className="ri-logout-box-line mx-2"></i>
            <h1 className={`${collapsed ? "hidden" : ""}`}>Logout</h1>
          </div>
        </div>
      </div>
      {/* content */}
      <div className="flex flex-col w-full">
        {/* header */}
        <div className="bg-white rounded-[5px] shadow-card mb-[20px] h-[13vh] flex items-center justify-between">
          <i
            className={`${
              collapsed
                ? "hidden"
                : "ri-close-fill text-[2rem] cursor-pointer px-2"
            }`}
            onClick={() => setCollapsed(true)}
          />
          <i
            className={`${
              collapsed
                ? "ri-menu-2-fill text-[2rem] cursor-pointer px-2"
                : "hidden"
            }`}
            onClick={() => setCollapsed(false)}
          />
          <div className="flex items-center justify-center">
            <Badge count={user?.unseenNotifications.length} className="mr-4">
              <i className="ri-notification-line text-[2rem] cursor-pointer" />
            </Badge>
            <Link
              to="/profile"
              className="text-[1.5rem] underline text-blue-600 mr-2"
            >
              {user?.name}
            </Link>
          </div>
        </div>
        {/* body */}
        <div className="bg-white rounded-[5px] shadow-card  h-[80vh] p-5">
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
