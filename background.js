chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'checkHistory') {
      const url = request.url;
  
      chrome.history.search({ text: url }, function (results) {
        if (results.length > 0) {
          const historyItem = results[0];
          const visitCount = historyItem.visitCount;
          const lastVisitTime = new Date(historyItem.lastVisitTime);
          const response = {
            visitCount: visitCount,
            lastVisitTime: lastVisitTime.toLocaleString()
          };
          sendResponse(response);
        } else {
          sendResponse({ visitCount: 0, lastVisitTime: null });
        }
      });
  
      return true; // 保持长连接以异步发送响应
    }
  });