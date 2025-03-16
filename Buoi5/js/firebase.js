// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
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
// =========================================================================================

// nếu mà có dùng hàm require hoặc import/export gì trên web -> type của script phải để ở module
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

function displayUserInfo(user) {
    document.getElementById("user-info").innerHTML = `
      <p><strong>Email:</strong> ${user.email}</p>
      <p class="text-success">Bạn đã đăng nhập thành công!</p>
    `;
}

function signinFireBase(email, password) {
  const auth = getAuth(app);
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
      console.log(user);
      alert("Signin Successfull");
      displayUserInfo(userCredential.user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert('Firebase error: Your account is not found or password is incorrect')
    });
}

//Bắt sự kiện cho button login
document.querySelector('#login_btn')?.addEventListener('click', (e) => {
    e.preventDefault();
    //Lấy dữ liệu từ html element
    const email = document.querySelector("#email").value.trim();
    const password = document.querySelector('#password').value.trim();
    //Kiểm tra dữ liệu
    if (validatLoginForm(email, password)){
        //Không có lỗi ở client
        //Signin bằng firebase
        signinFireBase(email, password);
        return;
    }else return;
});

//------------------------------------------------------
function validatSignUpForm(email, password) {
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

function signUpFireBase(email, password) {
  const auth = getAuth(app);
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      // ...
      alert("Signup successfully!")
      console.log();
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      alert(error);
    });
}

//Bắt sự kiện cho button login
document.querySelector('#signup')?.addEventListener('click', (e) => {
    e.preventDefault();
    //Lấy dữ liệu từ html element
    const email = document.querySelector("#email").value.trim();
    const password = document.querySelector('#password').value.trim();
    //Kiểm tra dữ liệu
    if (validatSignUpForm(email, password)){
        //Không có lỗi ở client
        //Signin bằng firebase
        signUpFireBase(email, password);
        return;
    }else return;
});
  