console.log("popup js!");
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const currentTab = tabs[0];
    const url = currentTab.url;
    console.log("url: " + url)
    chrome.history.search({ text: url }, function (results) {
        let visitCount = 0;
        let lastVisitTime = null;
        if (results.length > 0) {
          const historyItem = results[0];
          visitCount = historyItem.visitCount;
          lastVisitTime = new Date(historyItem.lastVisitTime).toLocaleString();
        } 
        document.getElementById('visit-count').textContent += ` ${visitCount}次`;
        document.getElementById('last-visit-time').textContent += ` ${lastVisitTime}`;
    });
  });
  