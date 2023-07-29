```javascript
document.addEventListener('DOMContentLoaded', function() {
    getComments();
});

function getComments() {
    chrome.runtime.sendMessage({type: "GET_COMMENTS"}, function(response) {
        renderComments(response.comments);
    });
}

function renderComments(comments) {
    const commentList = document.getElementById('commentList');
    commentList.innerHTML = '';
    comments.forEach(function(comment) {
        const listItem = document.createElement('li');
        listItem.textContent = `${comment.text} (on ${comment.url} at ${new Date(comment.timestamp).toLocaleString()})`;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function() {
            deleteComment(comment);
        });
        listItem.appendChild(deleteButton);
        commentList.appendChild(listItem);
    });
}

function deleteComment(comment) {
    chrome.runtime.sendMessage({type: "DELETE_COMMENT", comment: comment}, function(response) {
        getComments();
    });
}
```