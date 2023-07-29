```javascript
// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'GET_COMMENTS') {
    const url = request.url;
    chrome.storage.sync.get(url, (data) => {
      sendResponse({comments: data[url]});
    });
    return true;  // Will respond asynchronously.
  }
});
```