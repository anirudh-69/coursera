```javascript
let comments = [];

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ comments: [] });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "GET_COMMENTS") {
    chrome.storage.sync.get(["comments"], (result) => {
      comments = result.comments;
      sendResponse({ comments: comments.filter(comment => comment.url === request.url) });
    });
  } else if (request.type === "ADD_COMMENT") {
    comments.push(request.comment);
    chrome.storage.sync.set({ comments: comments });
  } else if (request.type === "DELETE_COMMENT") {
    comments = comments.filter(comment => comment.timestamp !== request.timestamp);
    chrome.storage.sync.set({ comments: comments });
  }
  return true;
});

function saveComment(comment) {
  comments.push(comment);
  chrome.storage.sync.set({ comments: comments });
}

function deleteComment(timestamp) {
  comments = comments.filter(comment => comment.timestamp !== timestamp);
  chrome.storage.sync.set({ comments: comments });
}

function getComments(url) {
  return comments.filter(comment => comment.url === url);
}
```