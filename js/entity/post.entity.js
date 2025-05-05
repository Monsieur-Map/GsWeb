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
  deleteDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore-lite.js";

///////////////////////////////////////////////////////
// POST MODEL & FUNCTIONS
///////////////////////////////////////////////////////

// random like and cmt
function rnd() {
  return Math.floor(Math.random() * 10); // random tu 0 -> 9
}

// Constructor for blog post
export function Post(
  email,
  title,
  content,
  tag,
  cover_ava_url,
  likes = rnd(),
  comments = rnd()
) {
  this.created_by = email;
  this.created_at = new Date().toISOString();
  this.title = title;
  this.content = content;
  this.tag = tag;
  this.cover_ava_url = cover_ava_url;
  this.likes = likes;
  this.comments = comments;
  return { ...this };
}

// Add a new post
export async function addPost(email, title, content, tag, cover_ava_url) {
  const postRef = collection(firestore, "posts");
  const postData = new Post(email, title, content, tag, cover_ava_url);

  try {
    const docRef = await addDoc(postRef, postData);
    const postId = docRef.id;

    // Optionally store post_id (document ID)
    await setDoc(docRef, { ...postData, post_id: postId });

    console.log("Post added with ID:", postId);
  } catch (error) {
    console.error("Error adding post: ", error);
  }
}

// Get all posts by user
export async function getPostsByEmail(email) {
  const q = query(
    collection(firestore, "posts"),
    where("created_by", "==", email)
  );
  const querySnapshot = await getDocs(q);

  const postList = [];
  querySnapshot.forEach((docSnap) => {
    postList.push({ id: docSnap.id, ...docSnap.data() });
  });

  return postList;
}

// Get all posts by tag
export async function getPostsByTag(tag) {
  const q = query(collection(firestore, "posts"), where("tag", "==", tag));
  const querySnapshot = await getDocs(q);

  const postList = [];
  querySnapshot.forEach((docSnap) => {
    postList.push({ id: docSnap.id, ...docSnap.data() });
  });

  return postList;
}

// Get all posts (for everyone)
export async function getAllPosts() {
  const colRef = collection(firestore, "posts");
  const snapshot = await getDocs(colRef);

  const postList = [];
  snapshot.forEach((docSnap) => {
    postList.push({ id: docSnap.id, ...docSnap.data() });
  });
  return postList;
}

// DELETE post by ID
export async function deletePostById(postId) {
  try {
    const postRef = doc(firestore, "posts", postId);
    await deleteDoc(postRef);
    console.log("Post deleted successfully:", postId);
  } catch (error) {
    console.error("Error deleting post:", error);
  }
}

/**
 * Update like count of a post
 * @param {string} postId - Firestore document ID
 * @param {number} delta - +1 to like, -1 to unlike
 */
export async function updateLikeCount(postId, delta) {
  try {
    const postRef = doc(firestore, "posts", postId);
    const snapshot = await getDoc(postRef);

    if (!snapshot.exists()) {
      console.error("Post not found:", postId);
      return;
    }

    const currentLikes = snapshot.data().likes || 0;
    const newLikes = Math.max(0, currentLikes + delta); // prevent negative likes

    await updateDoc(postRef, { likes: newLikes });
    console.log("Likes updated:", newLikes);
  } catch (err) {
    console.error("Error updating like count:", err);
  }
}

deletePostById("XBHrhMvDfS9gRdWrHHCg");
