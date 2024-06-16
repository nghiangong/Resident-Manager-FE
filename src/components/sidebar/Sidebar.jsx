import "./Sidebar.scss";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartPie,
  faCircleCheck,
  faClock,
  faHouse,
  faUserGroup,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
export const Sidebar = () => {
  const auth = useAuthUser();
  const location = useLocation();
  return (
    <div className="sidebarTotalContainer">
      <div className="sidebarContainer">
        {auth.currentRole === 1 && (
          <>
            <Link
              to="/dashboard"
              className={`subSide ${
                location.pathname === "/dashboard" ? "active" : ""
              }`}
            >
              <FontAwesomeIcon icon={faChartPie} />
              <span>Thống kê</span>
            </Link>
            <Link
              to="/resident"
              className={`subSide ${
                location.pathname === "/resident" ? "active" : ""
              }`}
            >
              <FontAwesomeIcon icon={faUserGroup} />
              <span>Dân cư</span>
            </Link>
            <Link
              to="/gate-keeper"
              className={`subSide ${
                location.pathname === "/gate-keeper" ? "active" : ""
              }`}
            >
              <FontAwesomeIcon icon={faUserShield} />
              <span>Bảo vệ</span>
            </Link>
            <Link
              to="/house"
              className={`subSide ${
                location.pathname === "/house" ? "active" : ""
              }`}
            >
              <FontAwesomeIcon icon={faHouse} />
              <span>Nhà</span>
            </Link>
            <Link
              to="/histories"
              className={`subSide ${
                location.pathname === "/histories" ? "active" : ""
              }`}
            >
              <FontAwesomeIcon icon={faClock} />
              <span>Lịch sử vào ra</span>
            </Link>
          </>
        )}
        {auth.currentRole === 3 && (
          <>
            <Link
              to="/check-qr"
              className={`subSide ${
                location.pathname === "/check-qr" ? "active" : ""
              }`}
            >
              <FontAwesomeIcon icon={faCircleCheck} />
              <span>Kiểm tra thông tin</span>
            </Link>
            <Link
              to="/histories"
              className={`subSide ${
                location.pathname === "/histories" ? "active" : ""
              }`}
            >
              <FontAwesomeIcon icon={faClock} />
              <span>Lịch sử vào ra</span>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
