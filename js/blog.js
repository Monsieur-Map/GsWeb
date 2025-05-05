import { getAllPosts, updateLikeCount } from "./entity/post.entity.js";
import { getUserByEmail } from "./entity/user.entity.js";

document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("blog-list");

  try {
    const posts = await getAllPosts();
    //  neu khong co bai dang nao => hien thi dong chu
    if (!posts.length) {
      container.innerHTML = `<h2>Hiện chưa có bài đăng nào!</h2>`;
      return;
    }
    for (const post of posts) {
      console.log(post.id);
      const user = await getUserByEmail(post.created_by);

      const blogCard = document.createElement("div");
      blogCard.className = "blog-card";
      blogCard.classList.add("my-card");
      blogCard.setAttribute("data-type", post.tag);

      // ==== Profile ====
      const profileDiv = document.createElement("div");
      profileDiv.className = "profile";

      const avatar = document.createElement("img");
      avatar.className = "hoyo_avatar";
      // lay 1 avatar mac dinh tren mang
      avatar.src =
        "https://cdn11.dienmaycholon.vn/filewebdmclnew/public/userupload/files/Image%20FP_2024/avatar-cute-60.png";
      avatar.alt = "avatar";

      const userBlogDiv = document.createElement("div");
      userBlogDiv.className = "user-blog";

      const userNameDiv = document.createElement("div");
      userNameDiv.className = "user-name";
      userNameDiv.innerHTML = `${
        user?.name || post.created_by
      } <span class="verified">✔️</span>`;

      const dateDiv = document.createElement("div");
      dateDiv.className = "date";
      dateDiv.textContent = new Date(post.created_at).toLocaleDateString(
        "vi-VN"
      );

      userBlogDiv.appendChild(userNameDiv);
      userBlogDiv.appendChild(dateDiv);

      profileDiv.appendChild(avatar);
      profileDiv.appendChild(userBlogDiv);

      // ==== Content ====
      const caption = document.createElement("p");
      caption.innerHTML = `
        <strong>${post.title}</strong>
        <br>
        <p>${post.content}</p>
      `;

      // ==== Image ====
      const banner = document.createElement("div");
      banner.className = "banner";
      const img = document.createElement("img");
      img.src = post.cover_ava_url;
      console.log(post.cover_ava_url);
      img.alt = "blog banner";
      banner.appendChild(img);

      // ==== Buttons ====
      const commentList = document.createElement("div");
      commentList.id = "commentList";

      const commentBtn = document.createElement("button");
      commentBtn.className = "react-button";
      commentBtn.innerHTML = `
        <img src="https://img.icons8.com/ios7/600/speech-bubble.png" alt="comment" />
        <span class="react-count">${post.comments}</span>
      `;
      commentBtn.addEventListener("click", () => {
        console.log(`Comment clicked for post by ${post.created_by}`);
        alert("Comment feature coming soon!");
      });

      const likeBtn = document.createElement("button");
      likeBtn.className = "react-button";
      likeBtn.innerHTML = `
        <img src="https://fastcdn.hoyoverse.com/static-resource-v2/2024/02/01/dfd373ce479643d9d06d2953c3dfcf90_6040573566435334579.png" alt="like" />
        <span class="react-count">${post.likes}</span>
      `;
      likeBtn.addEventListener("click", async () => {
        console.log("a");
        console.log(`Like clicked for post by ${post.created_by}`);
        // background color need to be changed
        likeBtn.classList.toggle("reacted");
        // update in database + UI
        if (likeBtn.classList.contains("reacted")) {
          // da like
          await updateLikeCount(post.id, 1);
          // update giao dien
          likeBtn.querySelector("span").innerText = post.likes + 1;
        } else {
          // bo like
          await updateLikeCount(post.id, -1);
          // vi bo like => reset vi tri ban dau => khong can thay doi UI
          likeBtn.querySelector("span").innerText = post.likes;
        }
      });

      commentList.appendChild(commentBtn);
      commentList.appendChild(likeBtn);

      // ==== Divider ====
      const divider = document.createElement("div");
      divider.className = "static_line";
      divider.setAttribute("no-preview", "true");

      const dividerImg = document.createElement("img");
      dividerImg.src =
        "https://hyl-static-res-prod.hoyolab.com/divider_config/PC/line_3.png";
      dividerImg.alt = "line";
      divider.appendChild(dividerImg);

      // ==== Append all ====
      blogCard.appendChild(profileDiv);
      blogCard.appendChild(caption);
      blogCard.appendChild(banner);
      blogCard.appendChild(commentList);
      blogCard.appendChild(divider);

      container.appendChild(blogCard);
    }
  } catch (err) {
    console.error("Failed to load blog posts:", err);
  }
});
