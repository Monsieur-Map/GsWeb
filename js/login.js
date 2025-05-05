import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

import { firebaseapp, firestore } from "./firebase.js";
import User, { addUser } from "./entity/user.entity.js";

function validateSingupForm(
  email,
  password,
  username,
  fullname,
  birthDate,
  phoneNumb
) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // TH: sự kiện null
  if (
    !email ||
    !password ||
    !username ||
    !fullname ||
    !birthDate ||
    !phoneNumb
  ) {
    alert("Please fill this form");
    return false;
  } else if (!emailRegex.test(email)) {
    //Lỗi định dạng email
    alert("This email account looks suspicious");
    email = "";
    return false;
  } else if (password.length < 6) {
    //password phải từ 6 chữ số trở lên
    alert("Password acquires at least 6 letters");
    password = "";
    return false;
  } else if (username.includes(" ")) {
    //username không được có khoảng trắng giữa các kí tự
    alert("Username is not allow with no spaces");
    username = "";
    return false;
  } else if (birthDate.getFullYear() > 2010) {
    //Độ tuổi có thể tham gia
    alert("You are too young");
    birthDate = "";
    return false;
  } else if (phoneNumb.match(/\d/g).length < 10) {
    //sđt phải có 10 kí tự trở lên
    alert("Your phone number is not appropriate");
    phoneNumb = ""; //Xóa dữ liệu
    return false;
  } else return true;
}

function validatLoginForm(email, password) {
  if (email === "" || password === "") {
    alert("You need to fill all FIELDS!");
    return false;
  }
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  // Kiểm tra định dạng của email
  if (!emailRegex.test(email)) {
    alert("Email is wrong format!");
    return false;
  }
  if (!email.includes("@")) {
    document.getElementById("emailError").textContent = "Email phải chứa '@'.";
    return false;
  }

  //pass đuôi 6 chữ số
  if (password.length < 6) {
    alert("Password must be at least 6 characters long!");
    return false;
  }
  return true;
}

// ----------------------------------------------------------------------------------
const auth = getAuth(firebaseapp);

const signup_btn = document.getElementById("signup-btn");
const login_btn = document.getElementById("login-btn");
// ----------------------------------------------------------------------------------
// bắt sự kiện cho button submit đăng ký
// nếu có button tại trang hiện tại -> thì bắt sự kiện
if (signup_btn) {
  signup_btn.addEventListener("click", async function (ev) {
    //preventDefault
    ev.preventDefault();
    //get data from form
    const email = document.getElementById("txtEmail").value;
    const password = document.getElementById("txtPassword").value;
    const username = document.getElementById("txtUsername").value;
    const fullname = document.getElementById("txtHoTen").value;
    const birthDate = document.getElementById("txtDate").valueAsDate;
    const phoneNumb = document.getElementById("txtTel").value;
    //validate.Form

    if (
      !validateSingupForm(
        email,
        password,
        username,
        fullname,
        birthDate,
        phoneNumb
      )
    ) {
      return;
    } else {
      // Lưu lại đăng ký của thông tin người dùng
      try {
        // tao obj user
        const user = new User(phoneNumb, username, email, birthDate, fullname);
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await addUser(user);
        alert("Đăng ký thành công!");
        location.href = "./login.html"; // Chuyển hướng sau khi đăng ký
      } catch (err) {
        console.error(err);
        alert("Email đã được sử dụng hoặc có lỗi xảy ra!");
      }
    }
  });
}
// ----------------------------------------------------------------------------------
else if (login_btn) {
  login_btn.addEventListener("click", async function (ev) {
    //preventDefault
    ev.preventDefault();
    // lay du lieu tu form nhap
    const email = document.getElementById("txtEmail").value;
    const password = document.getElementById("txtPassword").value;
    // kiem tra du lieu tu he thống
    if (validatLoginForm(email, password)) {
      //Không có lỗi ở client
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        alert("Đăng nhập thành công!");
        localStorage.setItem("currentUser", email);
        location.href = "../index.html";
      } catch (err) {
        console.error(err);
        alert("Sai tài khoản hoặc mật khẩu!");
      }
    }
  });
}
