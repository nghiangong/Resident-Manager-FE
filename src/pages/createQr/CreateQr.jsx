// import { useEffect, useState } from "react";
import { NavMobile } from "../../components/navMobile/NavMobile";
import { TopbarMobile } from "../../components/topbarMobile/TopbarMobile";
import "./CreateQr.scss";
import QRCode from "qrcode.react";
import { useLocation } from "react-router-dom";
// import toast, { Toaster } from "react-hot-toast";
// import { onMessageListener, requestForToken } from "../../utils/firebase";
// import useAuthUser from "react-auth-kit/hooks/useAuthUser";
export const CreateQr = () => {
  const location = useLocation();
  // const auth = useAuthUser();
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
  // const [update, setUpdate] = useState(false);
  // const [notification, setNotification] = useState({ title: "", body: "" });
  // const notify = () => toast(<ToastDisplay />);
  // function ToastDisplay() {
  //   return (
  //     <div>
  //       <p>
  //         <b>{notification?.title}</b>
  //       </p>
  //       <p>{notification?.body}</p>
  //     </div>
  //   );
  // }
  // useEffect(() => {
  //   if (notification?.title) {
  //     notify();
  //     setUpdate(!update);
  //   }
  // }, [notification]);
  // requestForToken();

  // onMessageListener()
  //   .then((payload) => {
  //     const notification = JSON.parse(payload.data.notification);
  //     if (notification.receiverId === auth.id) {
  //       setNotification({
  //         title: notification.title,
  //         body: notification.message,
  //       });
  //     }
  //   })
  //   .catch((err) => console.log("failed: ", err));
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
      {/* <Toaster /> */}
    </div>
  );
};
