// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore-lite.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJUWB5-lSClw3SsKISqxhQoLZbmRvioIY",
  authDomain: "jsi31-gsweb.firebaseapp.com",
  databaseURL: "https://jsi31-gsweb-default-rtdb.firebaseio.com",
  projectId: "jsi31-gsweb",
  storageBucket: "jsi31-gsweb.firebasestorage.app",
  messagingSenderId: "71886744724",
  appId: "1:71886744724:web:53606f7c3bfa7df3121881",
  measurementId: "G-1LGSQZYV4S",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//validate form

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
    !email.value ||
    !password.value ||
    !username.value ||
    !fullname.value ||
    !birthDate.value ||
    !phoneNumb.value
  ) {
    alert("Please fill this form");
    return false;
  } else if (!emailRegex.test(email.value)) {
    //Lỗi định dạng email
    alert("This email account looks suspicious");
    email.value = "";
    return false;
  } else if (password.value.lenght < 6) {
    //password phải từ 6 chữ số trở lên
    alert("Password acquires at least 6 letters");
    password.value = "";
    return false;
  } else if (username.value.includes(" ")) {
    //username không được có khoảng trắng giữa các kí tự
    alert("Username is not allow with no spaces");
    username.value = "";
    return false;
  } else if (birthDate.valueAsDate.getFullYear() > 2010) {
    //Độ tuổi có thể tham gia
    alert("You are too young");
    birthDate.value = "";
    return false;
  } else if (phoneNumb.value.match(/\d/g).length < 10) {
    //sđt phải có 10 kí tự trở lên
    alert("Your phone number is not appropriate");
    phoneNumb.value = ""; //Xóa dữ liệu
    return false;
  } else return true;
}

const signup_btn = document.getElementById("signup-btn");
const login_btn = document.getElementById("login-btn");
// ----------------------------------------------------------------------------------
// bắt sự kiện cho button submit đăng ký
// nếu có button tại trang hiện tại -> thì bắt sự kiện
if (signup_btn) {
  signup_btn.addEventListener("click", function (ev) {
    //preventDefault
    ev.preventDefault();
    //get data from form
    const email = document.getElementById("txtEmail");
    const password = document.getElementById("txtPassword");
    const username = document.getElementById("txtUsername");
    const fullname = document.getElementById("txtHoTen");
    const birthDate = document.getElementById("txtDate");
    const phoneNumb = document.getElementById("txtTel");
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
      //tạo object user
      const user = {
        email: email.value,
        username: username.value,
        fullname: fullname.value,
        birthDate: birthDate.valueAsDate,
        phoneNumb: phoneNumb.value,
        password: password.value,
      };
      //Lưu object vào firebase
      const auth = getAuth(app);
      createUserWithEmailAndPassword(auth, user.email, user.password)
        .then((userCredential) => {
          // Signed up
          const userData = userCredential.user;
          // ...
          alert("Signup successfully!");
          console.log(userData);
          // chuyen trang login
          window.location.href = "./login.html";
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
          alert(error);
        });
    }
  });
}
// ----------------------------------------------------------------------------------
else if (login_btn) {
  login_btn.addEventListener("click", function (ev) {
    //preventDefault
    ev.preventDefault();
    // lay du lieu tu form nhap
    const email = document.getElementById("txtEmail").value;
    const password = document.getElementById("txtPassword").value;
    // kiem tra du lieu tu he thống
    if (validatLoginForm(email, password)) {
      //Không có lỗi ở client
      const auth = getAuth(app);
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
          console.log(user);
          alert("Signin Successfull");
          window.location.href = "../index.html";
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(
            "Firebase error: Your account is not found or password is incorrect"
          );
        });
    }
  });
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
  if (password.length <= 6) {
    alert("Password must be at least 6 characters long!");
    return false;
  }
  return true;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Initualize Firebase
export const firebaseapp = await initializeApp(firebaseConfig);
export const firestore = await getFirestore(firebaseapp);
