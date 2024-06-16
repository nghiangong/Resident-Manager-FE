import axios from "axios";

function getRandomItem(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

const streetNames = [
  "Lê Lợi",
  "Nguyễn Huệ",
  "Trần Hưng Đạo",
  "Hoàng Diệu",
  "Trần Phú",
  "Bà Triệu",
  "Hai Bà Trưng",
  "Điện Biên Phủ",
  "Phan Chu Trinh",
  "Phạm Hùng",
];

const directions = ["Đông", "Tây", "Nam", "Bắc"];

function generateHouse(k) {
  const houseData = [];
  for (let i = 1; i <= k; i++) {
    houseData.push({
      name: `Vinhome ${i}`,
      address: `Số ${i}, đường ${getRandomItem(streetNames)}`,
    });
  }
  return houseData;
}

function generateGate(k) {
  const gateData = [];
  for (let i = 1; i <= k; i++) {
    gateData.push({
      name: `Vinhome ${i}`,
      address: `Số ${i}, phía ${getRandomItem(
        directions
      )}, đường ${getRandomItem(streetNames)}`,
    });
  }
  return gateData;
}

const note = [
  "Den tham nha",
  "Shipper giao hang",
  "Ho hang den choi",
  "Di choi cong vien",
  "Mua sam tai trung tam thuong mai",
  "Tham gia workshop",
  "Nghi ngoi, thu gian",
  "Den xem nha",
  "Di mua nha",
  "Di bo, tap the duc",
  "Lam mot so loai giay to",
  "Cung hop du an",
  "Hoc them ngoai khoa",
  "Tham quan chup anh",
  "Di xem phim tai rap",
];

function generateFullName() {
  const firstNameList = [
    "Nguyễn",
    "Trần",
    "Lê",
    "Phạm",
    "Hoàng",
    "Vũ",
    "Đặng",
    "Bùi",
    "Đỗ",
    "Hồ",
  ];
  const middleNameList = [
    "Thị",
    "Văn",
    "Kim",
    "Thanh",
    "Minh",
    "Hữu",
    "Thành",
    "Ngọc",
    "Hoàng",
    "Trung",
  ];
  const lastNameList = [
    "An",
    "Bảo",
    "Công",
    "Duy",
    "Hạnh",
    "Linh",
    "Hùng",
    "Thu",
    "Nga",
    "Sơn",
  ];

  const firstName =
    firstNameList[Math.floor(Math.random() * firstNameList.length)];
  const middleName =
    middleNameList[Math.floor(Math.random() * middleNameList.length)];
  const lastName =
    lastNameList[Math.floor(Math.random() * lastNameList.length)];

  return `${firstName} ${middleName} ${lastName}`;
}

function generateUser(k) {
  const memberData = [];
  for (let i = 0; i < k; i++) {
    const fullName = generateFullName();
    const gender = Math.random() < 0.5 ? true : false; // Ngẫu nhiên chọn giới tính 0 hoặc 1

    memberData.push({ name: fullName, gender: gender });
  }
  return memberData;
}

const addGates = async () => {
  const gateData = generateGate(10);
  for (const gate of gateData) {
    await axios.post("http://localhost:8080/api/v1/gate", {
      name: gate.name,
      address: gate.address,
    });
  }
};

const addRoles = async () => {
  const roleData = ["ROLE_ADMIN", "ROLE_USER", "ROLE_GATEKEEPER"];
  for (const roleName of roleData) {
    await axios.post("http://localhost:8080/api/v1/role", {
      name: roleName,
    });
  }
};

const addHouses = async () => {
  const houseData = generateHouse(100);
  for (const house of houseData) {
    await axios.post("http://localhost:8080/api/v1/house", {
      name: house.name,
      address: house.address,
    });
  }
};

function generateUsername(name) {
  // Tách tên thành các phần riêng biệt
  const nameParts = name.split(" ");
  let firstAndMiddleName = "";
  for (let i = 0; i < nameParts.length - 1; i++) {
    firstAndMiddleName += nameParts[i].charAt(0).toLowerCase();
  }

  // Tạo phần cuối của username từ tên cuối cùng
  const lastName = nameParts[nameParts.length - 1]
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  // Tạo phần số ngẫu nhiên từ 1 đến 10000
  const randomNumber = Math.floor(Math.random() * 10000) + 1;

  // Tạo username
  const username = `${lastName}.${firstAndMiddleName}${randomNumber}`;

  return username;
}

const generatePhoneNumber = () => {
  let phoneNumber = "0"; // Bắt đầu chuỗi số điện thoại với số 0

  // Thêm 9 chữ số ngẫu nhiên vào sau số 0
  for (let i = 0; i < 9; i++) {
    phoneNumber += Math.floor(Math.random() * 10); // Sinh ngẫu nhiên từ 0 đến 9
  }

  return phoneNumber;
};

function generateRandomBirthday() {
  // Tạo ngày, tháng và năm ngẫu nhiên trong khoảng từ 1980 đến 2005
  const year = Math.floor(Math.random() * (2005 - 1980 + 1)) + 1980;
  const month = Math.floor(Math.random() * 12) + 1; // Từ tháng 1 đến tháng 12
  const day = Math.floor(Math.random() * 31) + 1; // Từ ngày 1 đến ngày 31 (tùy theo tháng)

  // Đảm bảo ngày tháng hợp lệ
  const date = new Date(year, month - 1, day); // Trừ 1 ở month vì index của tháng trong JavaScript bắt đầu từ 0

  // Format ngày sinh dưới dạng yyyy-MM-dd
  const formattedDate = date.toISOString().slice(0, 10);

  return formattedDate;
}

function generateIdCard() {
  let idCard = "0"; // Bắt đầu với chữ số 0

  // Tạo 11 chữ số ngẫu nhiên
  for (let i = 0; i < 11; i++) {
    const digit = Math.floor(Math.random() * 10); // Tạo một chữ số ngẫu nhiên từ 0 đến 9
    idCard += digit.toString(); // Chuyển đổi chữ số thành chuỗi và nối vào chuỗi phoneNumber
  }

  return idCard;
}

const addResident = async () => {
  const residentData = generateUser(400);
  let houseId1 = 0;
  const roleIds1 = [2];
  for (let i = 0; i < residentData.length; i++) {
    let ownId1;
    if (i % 4 === 0) {
      ownId1 = 0;
      houseId1++;
    } else {
      ownId1 = i - (i % 4) + 1;
    }
    let image1 = "";
    if (residentData[i].gender) {
      image1 =
        "https://cdn5.vectorstock.com/i/1000x1000/73/84/young-man-model-avatar-character-vector-19077384.jpg";
    } else {
      image1 =
        "https://cdn4.vectorstock.com/i/1000x1000/86/88/woman-female-avatar-character-vector-11708688.jpg";
    }
    let name1 = residentData[i].name;
    let username1 = generateUsername(residentData[i].name);
    // Tạo cư dân mới
    await axios.post("http://localhost:8080/api/v1/signup", {
      name: name1,
      gender: residentData[i].gender,
      password: "123456",
      phone: generatePhoneNumber(),
      username: username1,
      email: username1 + "@gmail.com",
      image: image1,
      date: generateRandomBirthday(),
      ownId: ownId1,
      idCard: generateIdCard(),
      houseId: houseId1,
      roleIds: roleIds1,
      acceptedStatus: true,
      createQrPermission: true,
    });
  }
};

const addGateKeepers = async () => {
  const residentData = generateUser(20);
  let gateId1 = 0;
  const roleIds1 = [3];
  for (let i = 0; i < residentData.length; i++) {
    if (i % 2 === 0) {
      gateId1++;
    }
    let image1 = "";
    if (residentData[i].gender) {
      image1 =
        "https://cdn5.vectorstock.com/i/1000x1000/73/84/young-man-model-avatar-character-vector-19077384.jpg";
    } else {
      image1 =
        "https://cdn4.vectorstock.com/i/1000x1000/86/88/woman-female-avatar-character-vector-11708688.jpg";
    }
    let name1 = residentData[i].name;
    let username1 = generateUsername(residentData[i].name);
    // Tạo cư dân mới
    await axios.post("http://localhost:8080/api/v1/user", {
      name: name1,
      gender: residentData[i].gender,
      password: "123456",
      phone: generatePhoneNumber(),
      username: username1,
      email: username1 + "@gmail.com",
      image: image1,
      date: generateRandomBirthday(),
      idCard: generateIdCard(),
      gateId: gateId1,
      roleIds: roleIds1,
      acceptedStatus: true,
    });
  }
};

const addAdmin = async () => {
  const roleIds1 = [1];
  await axios.post("http://localhost:8080/api/v1/user", {
    name: "Hoàng Ngọc Hải",
    gender: true,
    password: "123456",
    phone: generatePhoneNumber(),
    username: "hai.hn4741",
    email: "haind11122002@gmail.com",
    image:
      "https://cdn5.vectorstock.com/i/1000x1000/73/84/young-man-model-avatar-character-vector-19077384.jpg",
    date: generateRandomBirthday(),
    idCard: generateIdCard(),
    roleIds: roleIds1,
    acceptedStatus: true,
  });
};

const addHistory = async () => {
  // Lặp qua từng ngày trong 2 tháng trở về trước đến ngày hiện tại
  const currentDate = new Date();
  const twoMonthsAgo = new Date();
  twoMonthsAgo.setMonth(currentDate.getMonth() - 2);

  while (twoMonthsAgo <= currentDate) {
    // Tạo random số request từ 10 đến 20
    const numberOfRequests = Math.floor(Math.random() * 11) + 10;

    // Tạo request với resident là false
    for (let i = 0; i < numberOfRequests; i++) {
      const randomGateId = Math.floor(Math.random() * 10) + 1;
      const randomQrCreaterId = Math.floor(Math.random() * 400) + 1;
      const randomNote = getRandomItem(note);
      const randomDate = new Date(
        twoMonthsAgo.getFullYear(),
        twoMonthsAgo.getMonth(),
        twoMonthsAgo.getDate(),
        Math.floor(Math.random() * 24),
        Math.floor(Math.random() * 60)
      );
      const resident = false;

      await axios.post("http://localhost:8080/api/v1/history", {
        name: generateFullName()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/đ/g, "d")
          .replace(/Đ/g, "D"),
        gender: Math.random() < 0.5, // Random giới tính
        date: randomDate.toISOString(), // Format ngày theo chuẩn ISO
        gateId: randomGateId,
        qrCreatorId: randomQrCreaterId,
        note: randomNote,
        resident: resident,
      });
    }
    const numberOfRequests1 = Math.floor(Math.random() * 11) + 10;
    // Tạo request với resident là true
    for (let i = 0; i < numberOfRequests1; i++) {
      const randomQrCreaterId = Math.floor(Math.random() * 400) + 1;
      const randomDate = new Date(
        twoMonthsAgo.getFullYear(),
        twoMonthsAgo.getMonth(),
        twoMonthsAgo.getDate(),
        Math.floor(Math.random() * 24),
        Math.floor(Math.random() * 60)
      );
      const resident = true;

      const res = await axios.get(
        `http://localhost:8080/api/v1/users/${randomQrCreaterId}`
      );
      const { name, gender } = res.data;

      await axios.post("http://localhost:8080/api/v1/history", {
        name: name
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/đ/g, "d")
          .replace(/Đ/g, "D"),
        gender: gender,
        date: randomDate.toISOString(),
        gateId: Math.floor(Math.random() * 10) + 1,
        qrCreatorId: randomQrCreaterId,
        resident: resident,
      });
    }

    // Tăng ngày lên 1 để lặp tiếp
    twoMonthsAgo.setDate(twoMonthsAgo.getDate() + 1);
  }
};
//muốn dùng file này, phía backend phải create drop và comment lại các đoạn sau
//các hasRole phương thức post ở file Controller, acceptedStatus ở mapstrucmapper

const addData = async () => {
  try {
    await addHouses();
    await addGates();
    await addRoles();
    await addResident();
    await addGateKeepers();
    await addAdmin();
    await addHistory();
    console.log("Data added successfully.");
  } catch (error) {
    console.error("Error adding data:", error);
  }
};

addData();
