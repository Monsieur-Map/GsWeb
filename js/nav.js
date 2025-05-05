import { getUserByEmail } from "./entity/user.entity.js";

document.addEventListener("DOMContentLoaded", async function () {
  const login_home_btn = document.getElementById("contact_submit");
  // lay current user trong local storage -> kiem tra
  let currentUserEmail = localStorage.getItem("currentUser"); // json
  if (!currentUserEmail) {
    // neu chua dang nhap -> login
    login_home_btn.textContent = "Đăng ký/ Đăng nhập";
    // chinh link duong dan
    login_home_btn.addEventListener("click", function () {
      if (!window.location.href.includes("/html/"))
        location.href = "./html/login.html";
      else location.href = "./login.html";
    });
  } else {
    const userInfo = await getUserByEmail(currentUserEmail);
    if (userInfo) {
      // sua button thanh user fullname
      login_home_btn.textContent = userInfo.fullName || userInfo.email;
      // them button create blog
      createBtnCreateBlog();
      // kiem tra neu da dang nhap -> doi thanh logout
      login_home_btn.addEventListener("click", function () {
        // xoa du lieu -> dang xuat
        localStorage.removeItem("currentUser");
        // reload trang index
        location.href = "../index.html";
      });
    } else {
      alert("Tai khoan khong ton tai tren Firestore!");
      localStorage.removeItem("currentUser");
      location.reload();
    }
  }
});

// create button create blog
function createBtnCreateBlog() {
  const containerNav = document.querySelector("#navbarNav ul");

  const blogItem = document.createElement("li");
  blogItem.className = "nav-item";
  blogItem.id = "createPost";

  const blogLink = document.createElement("a");
  blogLink.className = "nav-link";
  if (!window.location.href.includes("/html/"))
    blogLink.href = "./html/editblog.html";
  else blogLink.href = "./editblog.html";
  blogLink.textContent = "Create Post";

  blogItem.appendChild(blogLink);
  containerNav.appendChild(blogItem);
}
