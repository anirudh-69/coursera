```javascript
let comments = [];

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('saveButton').addEventListener('click', saveComment);
    getComments();
});

function saveComment() {
    let commentInput = document.getElementById('commentInput');
    let comment = {
        url: window.location.href,
        timestamp: new Date().getTime(),
        text: commentInput.value
    };
    chrome.runtime.sendMessage({type: 'ADD_COMMENT', comment: comment}, function(response) {
        comments = response.comments;
        renderComments();
    });
    commentInput.value = '';
}

function getComments() {
    chrome.runtime.sendMessage({type: 'GET_COMMENTS', url: window.location.href}, function(response) {
        comments = response.comments;
        renderComments();
    });
}

function renderComments() {
    let commentList = document.getElementById('commentList');
    commentList.innerHTML = '';
    comments.forEach(function(comment) {
        let listItem = document.createElement('li');
        listItem.textContent = `${new Date(comment.timestamp).toLocaleString()}: ${comment.text}`;
        commentList.appendChild(listItem);
    });
}
```