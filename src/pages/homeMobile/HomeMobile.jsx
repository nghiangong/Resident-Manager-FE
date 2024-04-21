import {
  EditOutlined,
  QrcodeOutlined,
  UserAddOutlined,
  UserDeleteOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { NavMobile } from "../../components/navMobile/NavMobile";
import { TopbarMobile } from "../../components/topbarMobile/TopbarMobile";
import "./HomeMobile.scss";
import React, { useEffect, useState } from "react";
import { Button, message } from "antd";
import { QrInformationSelfModal } from "../../components/QrInformationSelfModal/QrInformationSelfModal";
import { QrInformationVisitorModal } from "../../components/QrInformationVisitorModal/QrInformationVisitorModal";
import { Switch } from "antd";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { userRequest } from "../../utils/requestMethod";
import { AddMemberModal } from "../../components/addMemberModal/AddMemberModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserSecret, faUserTie } from "@fortawesome/free-solid-svg-icons";

export const HomeMobile = () => {
  const [update, setUpdate] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const auth = useAuthUser();
  const openModal1 = () => {
    if (user.createQrPermission) {
      setIsModalOpen1(true);
    }
  };
  const openModal3 = () => {
    if (user.ownId === 0) {
      setIsModalOpen3(true);
    }
  };
  const getMyself = async () => {
    try {
      const res = await userRequest.get(`/users/${auth.id}`);
      setUser(res.data);
    } catch (error) {
      message.error("Không lấy được thông tin người dùng");
    }
  };
  const getMembers = async () => {
    let id;
    auth.ownId === 0 ? (id = auth.id) : (id = auth.ownId);
    try {
      const res = await userRequest.get(`/users/${id}/family`);
      setUsers(res.data);
    } catch (error) {
      message.error("Không lấy được thông tin thành viên");
    }
  };
  useEffect(() => {
    getMembers();
    getMyself();
  }, []);
  useEffect(() => {
    getMembers();
  }, [update]);
  const openModal2 = () => {
    if (user.createQrPermission) {
      setIsModalOpen2(true);
    }
  };
  const onChange = async (checked, user) => {
    try {
      const rolesIds = user.roles.map((role) => role.id);
      // Gửi yêu cầu cập nhật quyền tạo Qr của người dùng với userId tương ứng
      await userRequest.put(`/users/${user.id}`, {
        name: user.name,
        phone: user.phone,
        username: user.username,
        email: user.email,
        acceptedStatus: user.acceptedStatus,
        gender: user.gender,
        image: user.image,
        date: user.date,
        ownId: user.ownId,
        idCard: user.idCard,
        roleIds: rolesIds,
        createQrPermission: checked,
      });
    } catch (error) {
      message.error("Cho phép tạo Qr thất bại");
    }
  };
  return (
    <div className="homeMobileContainer">
      <TopbarMobile />
      <div className="contentContainer">
        <div className="createQrContainer">
          <div className="createQrTitle">
            <QrcodeOutlined />
            <h4>Tạo Qr Code</h4>
          </div>
          <div className="createQrTotal">
            <div
              className="createQrPerson"
              onClick={openModal1}
              style={{ backgroundColor: "var(--color-light-blue)" }}
            >
              <div className="createQrPersonIcon">
                <FontAwesomeIcon
                  fontSize="65px"
                  icon={faUserTie}
                  color="var(--color-light)"
                />
              </div>
              <h3>Bản thân</h3>
            </div>
            <QrInformationSelfModal
              isOpen={isModalOpen1}
              setIsOpen={setIsModalOpen1}
            />
            <div
              className="createQrPerson"
              onClick={openModal2}
              style={{ backgroundColor: "var(--color-light-red)" }}
            >
              <div className="createQrPersonIcon">
                <FontAwesomeIcon
                  fontSize="65px"
                  icon={faUserSecret}
                  color="var(--color-light)"
                />
              </div>
              <h3>Khách</h3>
            </div>
            <QrInformationVisitorModal
              isOpen={isModalOpen2}
              setIsOpen={setIsModalOpen2}
            />
          </div>
        </div>
        <div className="memberManagementContainer">
          <div className="familyTitleContainer">
            <div className="familyTitle">
              <UsergroupAddOutlined />
              <h4>Thành viên</h4>
            </div>
            <Button
              onClick={openModal3}
              type="primary"
              style={{ marginInlineStart: "4em" }}
            >
              Thêm thành viên
            </Button>
            <AddMemberModal
              isOpen={isModalOpen3}
              setIsOpen={setIsModalOpen3}
              update={update}
              setUpdate={setUpdate}
            />
          </div>
          <div className="familyList">
            <h3>Tên thành viên</h3>
            <h3>Quyền tạo Qr</h3>
            {users.map((user) => (
              <React.Fragment key={user.id}>
                <span>{user.name}</span>
                <div className="editIcon">
                  <Switch
                    defaultChecked={user.createQrPermission}
                    onChange={(checked) => onChange(checked, user)}
                    style={{ height: "80%" }}
                    disabled={auth.ownId !== 0}
                  />
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
      <NavMobile />
    </div>
  );
};
