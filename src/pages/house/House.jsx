import { Input } from "antd";
import { createContext, useState } from "react";
import "./House.scss"
import logo from "../../image/logo-Vinhomes.png";
import { Sidebar } from "../../components/sidebar/Sidebar";
import { Topbar } from "../../components/topbar/Topbar";
import { AddHouseModal } from "../../components/addHouseModal/AddHouseModal";
import { HouseTable } from "../../components/houseTable/HouseTable";

export const UpdateHouseContext = createContext();
export const House = () => {
  const { Search } = Input;
  const [update, setUpdate] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const onSearch = (value, _e, info) => console.log(info?.source, value);
  return (
    <div className="webInterfaceContainer">
      <img className="logoWeb" src={logo} alt="logo" width={150} height={150} />
      <Topbar />
      <Sidebar />
      <div className="contentWebContainer">
        <UpdateHouseContext.Provider value={{ update, setUpdate }}>
          <div className="contentWeb">
            <div className="houseTitle">
              <h4>Danh sách nhà</h4>
              <div className="searchContainer">
                <Search
                  placeholder="Search"
                  onSearch={onSearch}
                  style={{
                    width: 200,
                  }}
                />
                <AddHouseModal />
                <span>
                  Total rows:{" "}
                  <span style={{ color: "var(--color-blue)" }}>
                    {totalCount}
                  </span>
                </span>
              </div>
            </div>
            <HouseTable totalCount={totalCount} setTotalCount={setTotalCount} />
          </div>
        </UpdateHouseContext.Provider>
      </div>
    </div>
  );
};
