chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'checkHistory') {
    const url = request.url;

    chrome.history.search({ text: url, startTime: 0 }, function (results) {
      let matchResults = results.filter(res => res.url === url)
      if (results.length == 0 || matchResults.length == 0) {
        sendResponse({ visitCount: 0, lastVisitTime: null });
        return ;
      }
      const historyItem = matchResults[0];
      const visitCount = historyItem.visitCount;
      const lastVisitTime = new Date(historyItem.lastVisitTime);
      sendResponse({
        visitCount: visitCount,
        lastVisitTime: lastVisitTime.toLocaleString()
      });
    });

    return true; // 保持长连接以异步发送响应
  }
});