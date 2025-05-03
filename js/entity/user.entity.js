import { firestore } from "../firebase.js";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  getDoc,
  query,
  where,
  addDoc,
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore-lite.js";

// User constructor
export default function User(phoneNum, username, email, birthdate, fullName) {
  this.phoneNum = phoneNum;
  this.username = username;
  this.email = email;
  this.birthdate = birthdate;
  this.fullName = fullName;
  return { ...this };
}

// Local cache
let users = [];

// Get all users
export async function getUserList() {
  const usersRef = collection(firestore, "users");
  const querySnapshot = await getDocs(usersRef);
  users = []; // clear cache

  querySnapshot.forEach((docSnap) => {
    const data = docSnap.data();
    const userObject = new User({
      phoneNum: data.phoneNum || "",
      username: data.username || "",
      email: data.email || "",
      birthdate: data.birthdate || "",
      fullName: data.fullName || "",
    });
    users.push(userObject);
  });

  console.log(users);
}

// Add new user
export async function addUser({
  phoneNum,
  username,
  email,
  birthdate,
  fullName,
}) {
  const usersRef = collection(firestore, "users");
  const userData = new User(phoneNum, username, email, birthdate, fullName);

  try {
    await addDoc(usersRef, userData);
    console.log(`User ${email} created.`);
  } catch (error) {
    console.error("Error adding user: ", error);
  }
}

// Get a user by email (with document ID)
export async function getUserByEmail(email) {
  const q = query(collection(firestore, "users"), where("email", "==", email));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const docSnap = querySnapshot.docs[0];
    return { id: docSnap.id, ...docSnap.data() };
  } else {
    console.log("No such user!");
    return null;
  }
}

// Update user profile (pass an object with fields to update)
export async function updateUserProfile(email, updatedData) {
  const q = query(collection(firestore, "users"), where("email", "==", email));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const userDoc = querySnapshot.docs[0];
    const userRef = userDoc.ref;
    try {
      await setDoc(userRef, updatedData, { merge: true });
      console.log(`User profile updated for ${email}.`);
    } catch (error) {
      console.error("Error updating user: ", error);
    }
  } else {
    console.error(`User with email ${email} not found.`);
  }
}
