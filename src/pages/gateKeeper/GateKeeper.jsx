import { Input } from "antd";
import "./GateKeeper.scss";
import { createContext, useState } from "react";
import logo from "../../image/logo-Vinhomes.png";
import { Sidebar } from "../../components/sidebar/Sidebar";
import { Topbar } from "../../components/topbar/Topbar";
import { GateKeeperTable } from "../../components/gateKeeperTable/GateKeeperTable";
import { GateTable } from "../../components/gateTable/GateTable";
import { AddGateKeeperModal } from "../../components/addGateKeeperModal/AddGateKeeperModal";
import { AddGateModal } from "../../components/addGateModal/AddGateModal";
export const UpdateGateContext = createContext();
export const GateKeeper = () => {
  const { Search } = Input;
  const [update, setUpdate] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [totalCount1, setTotalCount1] = useState(0);
  const onSearch = (value, _e, info) => console.log(info?.source, value);
  return (
    <div className="webInterfaceContainer">
      <img className="logoWeb" src={logo} alt="logo" width={150} height={150} />
      <Topbar />
      <Sidebar />
      <div className="contentWebContainer">
        <UpdateGateContext.Provider value={{ update, setUpdate }}>
          <div className="contentWeb">
            <div className="gateKeeperTitle">
              <h4>Danh sách bảo vệ</h4>
              <div className="searchContainer">
                <Search
                  placeholder="Search"
                  onSearch={onSearch}
                  style={{
                    width: 200,
                  }}
                />
                <AddGateKeeperModal />
                <span>
                  Total rows:{" "}
                  <span style={{ color: "var(--color-blue)" }}>
                    {totalCount}
                  </span>
                </span>
              </div>
            </div>
            <GateKeeperTable
              totalCount={totalCount}
              setTotalCount={setTotalCount}
            />
          </div>
        </UpdateGateContext.Provider>
        <UpdateGateContext.Provider value={{ update, setUpdate }}>
          <div className="contentWeb">
            <div className="gateTitle">
              <h4>Danh sách cổng</h4>
              <div className="searchContainer">
                <Search
                  placeholder="Search"
                  onSearch={onSearch}
                  style={{
                    width: 200,
                  }}
                />
                <AddGateModal />
                <span>
                  Total rows:{" "}
                  <span style={{ color: "var(--color-blue)" }}>
                    {totalCount1}
                  </span>
                </span>
              </div>
            </div>
            <GateTable
              totalCount={totalCount1}
              setTotalCount={setTotalCount1}
            />
          </div>
        </UpdateGateContext.Provider>
      </div>
    </div>
  );
};
