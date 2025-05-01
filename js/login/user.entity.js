import { firestore } from "../home/firebase.js";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  getDoc,
  query,
  serverTimestamp,
  where,
  addDoc,
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore-lite.js";

// User constructor
export default function User(email, username, cart = [], orders = []) {
  this.email = email;
  this.username = username;
  this.cart = cart;
  this.orders = orders;
  return this;
}

// Local cache
let users = [];

// Lấy danh sách người dùng
export async function getUserList() {
  const usersRef = collection(firestore, "users");
  const querySnapshot = await getDocs(usersRef);
  users = []; // clear previous cache
  querySnapshot.forEach((docSnap) => {
    const data = docSnap.data();
    // Chỉ lấy các trường cần thiết => doi thanh object JS 
    const userObject = new User(
      data.email,
      data.username,
      data.cart,
      data.orders
    );
    users.push(userObject);
  });
  console.log(users);
}

// Thêm người dùng mới
export async function addUser(email, username) {
  const usersRef = collection(firestore, "users");
  const userData = {
    email,
    username,
    cart: [],
    orders: [],
    createdAt: serverTimestamp(),
  };
  try {
    await addDoc(usersRef, userData);
    console.log(`User ${email} created.`);
  } catch (error) {
    console.error("Error adding user: ", error);
  }
}

// Lấy user theo email (và trả cả docId để update)
export async function getUserByEmail(email) {
  const q = query(collection(firestore, "users"), where("email", "==", email));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const docSnap = querySnapshot.docs[0];
    return { id: docSnap.id, ...docSnap.data() }; // return full object with docId
  } else {
    console.log("No such user!");
    return null;
  }
}

// Cập nhật giỏ hàng người dùng
export async function updateUserCart(email, newCart) {
  const q = query(collection(firestore, "users"), where("email", "==", email));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const userDoc = querySnapshot.docs[0];
    const userRef = userDoc.ref;

    try {
      // merge true: chỉ cập nhật các trường đã có, không xóa các trường khác
      // merge false: xóa các trường không có trong object mới
      await setDoc(userRef, { cart: newCart }, { merge: true });
      console.log(`Cart updated for user ${email}.`);
    } catch (error) {
      console.error("Error updating cart: ", error);
    }
  } else {
    console.error(`User with email ${email} not found.`);
  }
}

// Cập nhật đơn hàng người dùng
export async function updateUserOrders(email, newOrders) {
  const q = query(collection(firestore, "users"), where("email", "==", email));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const userDoc = querySnapshot.docs[0];
    const userRef = userDoc.ref;
    console.log(userRef);
    try {
      await setDoc(userRef, { orders: newOrders }, { merge: true });
      console.log(`Orders updated for user ${email}.`);
    } catch (error) {
      console.error("Error updating orders: ", error);
    }
  } else {
    console.error(`User with email ${email} not found.`);
  }
}
