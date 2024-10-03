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
      //Lưu object vào Local storage
      localStorage.setItem(user.email, JSON.stringify(user));
      // chuyen trang login
      window.location.href = "./login.html";
    }
  });
}
// ----------------------------------------------------------------------------------
else if (login_btn) {
  login_btn.addEventListener("click", function (ev) {
    //preventDefault
    ev.preventDefault();
    // lay du lieu tu form nhap
    const email = document.getElementById("txtEmail");
    const password = document.getElementById("txtPassword");
    // kiem tra du lieu tu he thong
    console.log(email.value);
    const user = JSON.parse(localStorage.getItem(email.value));
    if (user) {
      // user da co trong he thong
      // kiem tra password
      if (user.password === password.value) {
        // luu du lieu vao current user
        localStorage.setItem("currentUser", JSON.stringify(user));
        // hoan tat dang nhap
        alert("Login successful!");
        // chuyen trang home
        window.location.href = "../index.html";
      } else {
        // sai mat khau
        alert("Email or password is not correct!");
        return;
      }
    } else {
      // khong ton tai user
      alert("User is not exist, please signup first!");
      return;
    }
  });
}
