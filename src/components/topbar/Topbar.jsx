import "./Topbar.scss";
import { Avatar, Dropdown } from "antd";
import { useNavigate } from "react-router-dom";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { UserOutlined } from "@ant-design/icons";
export const Topbar = () => {
  const navigate = useNavigate();
  const signOut = useSignOut();
  const handleSignOut = () => {
    signOut();
    navigate("/");
  };
  const items = [
    {
      key: "1",
      danger: true,
      label: "Đăng xuất",
      onClick: handleSignOut,
    },
  ];
  return (
    <div className="topbarContainer">
      <Dropdown
        menu={{
          items,
        }}
      >
        <a onClick={(e) => e.preventDefault()}>
          <Avatar style={{marginInlineEnd: "var(--metric-box-spacing)"}} className="avatar" size="large" icon={<UserOutlined />} />
        </a>
      </Dropdown>
    </div>
  );
};
