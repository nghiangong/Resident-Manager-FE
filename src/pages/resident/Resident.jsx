import logo from "../../image/logo-Vinhomes.png";
import { Sidebar } from "../../components/sidebar/Sidebar";
import { Topbar } from "../../components/topbar/Topbar";
import "./Resident.scss";
import React, { createContext, useState } from "react";
import { Input } from "antd";
import { ResidentTable } from "../../components/residentTable/ResidentTable";
export const UpdateResidentContext = createContext();
export const Resident = () => {
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
        <div className="contentWeb">
          <div className="residentTitle">
            <h4>Danh sách dân cư</h4>
            <div className="searchContainer">
              <Search
                placeholder="Search"
                onSearch={onSearch}
                style={{
                  width: 200,
                }}
              />
              <span>
                Total rows:{" "}
                <span style={{ color: "var(--color-blue)" }}>{totalCount}</span>
              </span>
            </div>
          </div>
          <UpdateResidentContext.Provider value={{ update, setUpdate }}>
            <ResidentTable
              acceptedStatus={true}
              totalCount={totalCount}
              setTotalCount={setTotalCount}
            />
          </UpdateResidentContext.Provider>
        </div>
        <div className="contentWeb">
          <div className="residentTitle">
            <h4>Phê duyệt dân cư</h4>
            <div className="searchContainer">
              <Search
                placeholder="Search"
                onSearch={onSearch}
                style={{
                  width: 200,
                }}
              />
              <span>
                Total rows:{" "}
                <span style={{ color: "var(--color-blue)" }}>
                  {totalCount1}
                </span>
              </span>
            </div>
          </div>
          <UpdateResidentContext.Provider value={{ update, setUpdate }}>
            <ResidentTable
              acceptedStatus={false}
              totalCount={totalCount1}
              setTotalCount={setTotalCount1}
            />
          </UpdateResidentContext.Provider>
        </div>
      </div>
    </div>
  );
};
