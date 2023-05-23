import { Tabs } from "antd";
import React from "react";
import NavBar from "../../Home/NavBar";
import LoginAPI from "./LoginAPI";
import RegisterAPI from "./RegisterAPI";

function Auth() {
  return (
    <div className="menuOrderComponent">
      <NavBar />
      <div className="flex justify-center pt-[150px]">
        <Tabs
          defaultSelectedKeys="1"
          type="card"
          size={"large"}
          style={{
            width: "50%",
            margin: "auto",
          }}
          tabBarStyle={{ justifyContent: "center" }}
          items={[
            {
              label: "Đăng nhập",
              key: "1",
              children: (
                <div className="bg-[rgba(173,178,181,.5)] p-[12px]">
                  <LoginAPI />
                </div>
              ),
            },
            {
              label: "Đăng ký",
              key: "2",
              children: (
                <div className="bg-[rgba(173,178,181,.5)] p-[12px]">
                  <RegisterAPI />
                </div>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
}

export default Auth;
