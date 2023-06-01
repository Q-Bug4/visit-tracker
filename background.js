chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'checkHistory') {
    const url = request.url;
    let savedListType
    let savedBlacklist
    let savedWhitelist
    chrome.storage.local.get(['listType', 'blacklist', 'whitelist'], function (data) {
      savedListType = data.listType ?? 'blacklist';
      savedBlacklist = data.blacklist ?? '';
      savedWhitelist = data.whitelist ?? '';
      if (savedListType === 'none') {
        shouldAbort = false;
      } else {
        shouldAbort = (savedListType == 'blacklist')
          ? savedBlacklist !== '' && !!savedBlacklist.split("\n").find(rule => new RegExp(rule).test(url))
          : savedWhitelist !== '' && !savedWhitelist.split("\n").find(rule => new RegExp(rule).test(url))
      }
      if (shouldAbort) {
        return;
      }
      chrome.history.search({ text: url, startTime: 0, maxResults: 999999 }, function (results) {
        let matchResults = results.filter(res => res.url === url)
        if (results.length == 0 || matchResults.length == 0) {
          sendResponse({ visitCount: 0, lastVisitTime: null, results });
          return;
        }
        const historyItem = matchResults[0];
        const visitCount = historyItem.visitCount;
        const lastVisitTime = new Date(historyItem.lastVisitTime);
        sendResponse({
          visitCount: visitCount,
          results,
          lastVisitTime: lastVisitTime.toLocaleString()
        });
      });
    })

    return true; // 保持长连接以异步发送响应
  }
});