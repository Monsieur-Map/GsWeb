const likeButton = document.getElementById('like-button');
const likeCount = document.getElementById('like-count');

let liked = false;

likeButton.addEventListener('click', () => {
  liked = !liked;

  if (liked) {
    likeButton.classList.add('liked');
    likeCount.textContent = parseInt(likeCount.textContent) + 1;
  } else {
    likeButton.classList.remove('liked');
    likeCount.textContent = parseInt(likeCount.textContent) - 1;
  }
});
  
const dislikeButton = document.getElementById('dislike-button');
const dislikeCount = document.getElementById('dislike-count');

let disliked = false;

dislikeButton.addEventListener('click', () => {
  disliked = !disliked;

  if (disliked) {
    dislikeButton.classList.add('disliked');
    dislikeCount.textContent = parseInt(dislikeCount.textContent) + 1;
  } else {
    dislikeButton.classList.remove('disliked');
    dislikeCount.textContent = parseInt(dislikeCount.textContent) - 1;
  }
});