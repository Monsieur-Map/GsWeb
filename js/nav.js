document.addEventListener("DOMContentLoaded", function () {
  const login_home_btn = document.getElementById("contact_submit");
  // lay current user trong local storage -> kiem tra
  let currentUser = localStorage.getItem("currentUser"); // json
  if (!currentUser) {
    // neu chua dang nhap -> login
    login_home_btn.textContent = "Đăng ký/ Đăng nhập";
    login_home_btn.addEventListener("click", function () {
      location.href = "../html/login.html";
    });
  } else {
    // kiem tra neu da dang nhap -> doi thanh logout
    currentUser = JSON.parse(currentUser); //js
    console.log(currentUser.username)
    login_home_btn.textContent = currentUser.username;
    login_home_btn.addEventListener("click", function () {
      // xoa du lieu -> dang xuat
      localStorage.removeItem("currentUser");
      // reload trang index
      location.href = "../index.html";
    });
  }
});
