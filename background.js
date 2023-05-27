chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'checkHistory') {
      const url = request.url;
  
      chrome.history.search({ text: url }, function (results) {
        const visited = results && results.length > 0;
        sendResponse({ visited: visited });
      });
  
      return true; // 保持长连接以异步发送响应
    }
  });