import { Avatar, Dropdown } from "antd";
import { UserOutlined, LogoutOutlined, SettingOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/AuthSlice";

const UserDropdown = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const items = [
    {
      key: "1",
      label: "Profile",
      icon: <UserOutlined />,
      onClick: () => {
        console.log("Profile clicked");
      },
    },
    {
      key: "2",
      label: "Settings",
      icon: <SettingOutlined />,
      onClick: () => {
        console.log("Settings clicked");
      },
    },
    {
      type: "divider",
    },
    {
      key: "3",
      label: "Logout",
      icon: <LogoutOutlined />,
      danger: true,
      onClick: () => {
        dispatch(logout())
      },
    },
  ];

  return (
    <Dropdown
      menu={{ items }}
      placement="bottomRight"
      trigger={["click"]}
    >
      <div className="flex items-center cursor-pointer">
        <Avatar src="https://i.pravatar.cc/150?img=3" size="large" />
        <span className="ml-2 font-medium dark:text-white">
          {user?.split(" ").slice(0, 2).join(" ")}
        </span>
      </div>
    </Dropdown>
  );
};

export default UserDropdown;
