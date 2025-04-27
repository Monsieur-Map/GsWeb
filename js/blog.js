import {
    collection,
    getDocs,
    doc,
    setDoc,
    getDoc,
    query,
    serverTimestamp,
    deleteDoc
  } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore-lite.js";
import { firestore } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore-lite.js";
function Blog (
    id,
    comments = [],
    created_at,
    created_by = [],
    description,
    likes = [],
    post,
    title,
    views  
){
    //Function
    function addComment(comment, created_at, created_by){
        this.comment.push({
            comment: comment,
            created_by: created_at,
            created_at: created_at,
        })
    }

    function addLike(uid){
        this.likes.push(uid);
        updateBlog();
    }

    function updateBlog(){
        const blogRef = doc(firestore, "blogs", this.id);
        setDoc(blogRef, {
          description: this.description,
          title: this.title,
          poster: this.poster,
          comments: this.comments,
          likes: this.likes,
          views: this.views + 1,
        });
    }

    async function deleteBlog(){
        await deleteDoc(doc(firestore, "blogs",this.id));
    }

    async function getBlogList() {
        const q = await query(collection(firestore, "blogs"));
    
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          // list.push(doc);
        });
      }
    // tạo thuộc tính (property) cho đối tượng
    // this là từ khóa đại diện cho đối tượng được tạo ra từ constructor function
    this.comments = comments;
    this.created_at = created_at;
    this.created_by = created_by;
    this.description = description;
    this.likes = likes;
    this.post = post;
    this.title = title;
    this.views = views


    //   trả về đối tượng user sau khi được quy định thuộc tính và phương thức
    return {
    comments: this.comments,
    created_at: this.created_at,
    created_by: this.created_by,
    description: this.description,
    likes: this.likes,
    post: this.post,
    title: this.title,
    views: this.views
  }
}

// app.get(`/`, (req,res) => {
//   res.sendFile(path.join(initial_path, "index.html"));
// })

// app.get(`/blog`, (req,res) => {
//   res.sendFile(path.join(initial_path, "blog.html"));
// })

// app.listen("3000", () => {
//   console.log('listening......');
// })








