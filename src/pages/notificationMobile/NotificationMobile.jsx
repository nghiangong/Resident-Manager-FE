import { createContext, useEffect, useState } from "react";
import { NavMobile } from "../../components/navMobile/NavMobile";
import { Notification } from "../../components/notification/Notification";
import { TopbarMobile } from "../../components/topbarMobile/TopbarMobile";
import "./NotificationMobile.scss";
import { userRequest } from "../../utils/requestMethod";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { message } from "antd";
import { getCurrentDate1 } from "../../utils/Format";
// import { requestForToken, onMessageListener } from "../../utils/firebase";
// import toast, { Toaster } from "react-hot-toast";
export const UpdateNotificationContext = createContext();
export const NotificationMobile = () => {
  const [update, setUpdate] = useState(false);
  const [historiesPerDay, setHistoriesPerDay] = useState(null);
  const [histories, setHistories] = useState([]);
  const auth = useAuthUser();
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
  const getHistories = async () => {
    try {
      const res = await userRequest.get(`/histories?userId=${auth.id}`);
      setHistories(res.data);
    } catch (error) {
      console.log(error);
      message.error("Không lấy được thông báo");
    }
  };
  const getHistoriesPerDay = async () => {
    try {
      const res = await userRequest.get(
        `/historiesPerDay?date=${getCurrentDate1()}&userId=${auth.id}`
      );
      setHistoriesPerDay(res.data);
    } catch (error) {
      console.log(error);
      message.error("Không lấy được số lượt ra vào");
    }
  };
  useEffect(() => {
    getHistories();
  }, [update]);
  useEffect(() => {
    getHistoriesPerDay();
  }, []);
  return (
    <div className="notificationMobileContainer">
      <TopbarMobile />
      <div className="contentContainer">
        <h4>Tổng lượt vào ra trong ngày: {historiesPerDay}</h4>
        <div className="totalNotification">
          {histories.map((history) => (
            <UpdateNotificationContext.Provider value={{ update, setUpdate }}>
              <Notification key={history.id} history={history} />
            </UpdateNotificationContext.Provider>
          ))}
        </div>
      </div>
      <NavMobile update={update} />
      {/* <Toaster /> */}
    </div>
  );
};
