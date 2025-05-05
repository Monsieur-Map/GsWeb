import { addPost } from "./entity/post.entity.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("create-post-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = document.getElementById("postTitle").value.trim();
    const content = document.getElementById("postContent").value.trim();
    const cover_ava_url = document.getElementById("coverImage").value.trim();
    const tag = document.getElementById("type-selected").value;

    const validationError = validatePostForm(
      title,
      content,
      cover_ava_url,
      tag
    );
    if (validationError) {
      alert(validationError);
      return;
    }

    const currentUserEmail = localStorage.getItem("currentUser");
    if (!currentUserEmail) {
      alert("Bạn phải đăng nhập để đăng bài.");
      return;
    }

    try {
      await addPost(currentUserEmail, title, content, tag, cover_ava_url);
      alert("Bài viết đã được đăng!");
      form.reset();
      //   chuyen trang blog
      location.href = "./blog.html";
    } catch (err) {
      console.error("Lỗi khi tạo bài viết:", err);
      alert("Đã xảy ra lỗi. Vui lòng thử lại.");
    }
  });
});

// ======= VALIDATION FUNCTION =======
function validatePostForm(title, content, coverUrl, tag) {
  const urlRegex = /^(https?:\/\/)[^\s]+\.[^\s]+$/;

  if (!title) return "Tiêu đề không được để trống.";
  if (!content) return "Nội dung không được để trống.";
  if (!urlRegex.test(coverUrl)) return "Liên kết ảnh không hợp lệ.";
  if (!tag || tag.toLowerCase() === "none")
    return "Vui lòng chọn một thẻ hợp lệ.";

  return null; // no error
}
