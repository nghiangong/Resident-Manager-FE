import dayjs from "dayjs";
import moment from "moment";

export const createExpireDate = (expireTime, expireDay) => {
  // Chuyển đổi expireTime và expireDay thành đối tượng dayjs để dễ xử lý
  const time = dayjs(expireTime);
  const day = dayjs(expireDay);

  // Lấy giờ, phút, giây từ expireTime
  const hours = time.hour();
  const minutes = time.minute();
  const seconds = time.second();

  // Lấy ngày, tháng, năm từ expireDay
  const year = day.year();
  const month = day.month() + 1; // Tháng trong dayjs bắt đầu từ 0 nên cần +1
  const date = day.date();

  // Tạo expireDate với định dạng "yyyy-MM-ddTHH:mm:ss"
  const expireDate = dayjs(
    `${year}-${month}-${date}T${hours}:${minutes}:${seconds}`
  );

  return expireDate.format("YYYY-MM-DDTHH:mm:ss");
};

// Hàm để so sánh thời điểm hiện tại với expireDate
export const isExpired = (expireDate) => {
  const now = dayjs(); // Lấy thời điểm hiện tại
  const expireDateTime = dayjs(expireDate); // Chuyển đổi expireDate thành đối tượng dayjs

  // So sánh thời điểm hiện tại với expireDate
  return now.isAfter(expireDateTime);
};

export const getCurrentDate1 = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  let month = currentDate.getMonth() + 1;
  let day = currentDate.getDate();

  // Đảm bảo thêm số 0 vào trước số nhỏ hơn 10 để đảm bảo định dạng yyyy-MM-dd
  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }

  return `${year}-${month}-${day}`;
};

export const getCurrentDate = () => {
  return moment().format("ddd DD MMMM");
};

export const getCurrentDateTimeFormatted = () => {
  const now = new Date();

  // Lấy thông tin ngày, tháng, năm
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  // Lấy thông tin giờ, phút, giây
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  // Tạo chuỗi định dạng mới
  const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

  return formattedDateTime;
};

export const formatDateTimeDetail = (dateTimeString) => {
  // Tạo một đối tượng Date từ chuỗi đầu vào
  const dateTime = new Date(dateTimeString);

  // Lấy thông tin ngày, tháng, năm
  const year = dateTime.getFullYear();
  const month = String(dateTime.getMonth() + 1).padStart(2, "0");
  const day = String(dateTime.getDate()).padStart(2, "0");

  // Lấy thông tin giờ, phút, giây
  const hours = String(dateTime.getHours()).padStart(2, "0");
  const minutes = String(dateTime.getMinutes()).padStart(2, "0");
  const seconds = String(dateTime.getSeconds()).padStart(2, "0");

  // Tạo chuỗi định dạng mới
  const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  return formattedDateTime;
};
