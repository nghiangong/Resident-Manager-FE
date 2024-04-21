import { NavMobile } from "../../components/navMobile/NavMobile";
import { TopbarMobile } from "../../components/topbarMobile/TopbarMobile";
import "./CreateQr.scss";
import QRCode from "qrcode.react";
import { useLocation } from "react-router-dom";

export const CreateQr = () => {
  const location = useLocation();
  const {
    userId,
    note,
    licensePlate,
    name,
    expireDate,
    gender,
    resident,
    digitalSignature,
  } = location.state;
  const title = resident ? "Dân cư" : "Khách";
  return (
    <div className="createQrContainer1">
      <TopbarMobile />
      <div className="contentContainer1">
        <h1>{title}</h1>
        <span>{name}</span>
        <QRCode
          level="Q"
          style={{ width: 256, height: 256 }}
          value={JSON.stringify({
            userId: userId,
            name: name,
            note: note,
            expireDate: expireDate,
            licensePlate: licensePlate,
            gender: gender,
            resident: resident,
            digitalSignature: digitalSignature,
          })}
        />
      </div>
      <NavMobile />
    </div>
  );
};
