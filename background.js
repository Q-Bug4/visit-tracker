chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'checkHistory') {
      let url = request.url;
      
      // 查询全部历史记录
      chrome.history.search({ text: url, startTime: 0 }, (results) => {
        let visits = results.filter(result => result.url === url);
        if (visits.length > 0) {
          let lastVisitTime = visits[0].lastVisitTime;
          let visitCount = visits.length;
          sendResponse({ lastVisitTime, visitCount });
        } else {
          sendResponse({ lastVisitTime: null, visitCount: 0 });
        }
      });
      // 由于 chrome.runtime.onMessage.addListener 是异步的，需要返回 true 以表明我们会在异步操作完成后发送响应
      return true;
    }
  });
  