import logo from "./logo.svg";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Login } from "./pages/login/Login";
import { Register } from "./pages/register/Register";
import { HomeMobile } from "./pages/homeMobile/HomeMobile";
import { NotificationMobile } from "./pages/notificationMobile/NotificationMobile";
import createStore from "react-auth-kit/createStore";
import AuthProvider from "react-auth-kit";
import { CreateQr } from "./pages/createQr/CreateQr";
import { CheckQr } from "./pages/checkQr/CheckQr";
import { SeeHistory } from "./pages/seeHistories/SeeHistory";
import { Resident } from "./pages/resident/Resident";
import { GateKeeper } from "./pages/gateKeeper/GateKeeper";
import { House } from "./pages/house/House";
import { createContext, useState } from "react";
import { Dashboard } from "./pages/dashboard/Dashboard";

const store = createStore({
  authName: "_auth",
  authType: "cookie",
  cookieDomain: window.location.hostname,
  cookieSecure: false,
});

function App() {
  return (
    <div className="App">
      <AuthProvider store={store}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home-mobile" element={<HomeMobile />} />
          <Route path="/notification-mobile" element={<NotificationMobile />} />
          <Route path="/create-qr" element={<CreateQr />} />
          <Route path="/check-qr" element={<CheckQr />} />
          <Route path="/histories" element={<SeeHistory />} />
          <Route path="/resident" element={<Resident />} />
          <Route path="/gate-keeper" element={<GateKeeper />} />
          <Route path="/house" element={<House />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
