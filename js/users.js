import {
  collection,
  getDocs,
  doc,
  setDoc,
  getDoc,
  query,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore-lite.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore-lite.js";
//Constructor function
function User(
  avatar = "https://i.pinimg.com/736x/44/b8/6f/44b86fe4898b9212ca7c973a2f4a4b27.jpg",
  username,
  email,
  point = "0"
) {
    
  //Tạo thuộc tính (properties) cho đối tượng
  // this là từ khoá đại diện cho đối tượng được tạo ra từ consturctor function
  this.username = username;
  this.email = email;
  this.avatar = avatar;
  this.point = point;

  // tạo phương thức (method) cho đối tượng
  async function addUser() {
    //get doc from firebase
    const postsRef = collection(firestore, "users");
    await setDoc(doc(postsRef), {
      username: this.username,
      email: this.email,
      avatar: this.avatar,
      point: this.point,
    });
  }

  async function getUser(uid) {
    // get doc from firestore
    const docRef = doc(firestore, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // declare some var for current post
      this.username = docSnap.data().username;
      this.email = docSnap.data().email;
      this.avatar = docSnap.data().avatar;
      this.point = docSnap.data().point;
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  //Trả về đối tượng user sau khi được quy định thuộc tính và phương thức
  return {
    username: this.username,
    email: this.email,
    avatar: this.avatar,
    point: this.point,
  };
}

//Tạo đối tượng
