function toggleComments(commentSectionId) {
    const section = document.getElementById(commentSectionId);
    section.style.display = section.style.display === 'none' ? 'block' : 'none';
}

function addComment(cardId) {
    const input = document.getElementById(`input-${cardId}`);
    const commentList = document.getElementById(`comment-list-${cardId}`);

    if (input.value.trim() !== '') {
        const newComment = document.createElement('div');
        newComment.className = 'comment';
        newComment.innerHTML = `<p>${input.value}</p>`;
        commentList.appendChild(newComment);
        input.value = '';
    }
}