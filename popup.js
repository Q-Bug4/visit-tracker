document.addEventListener('DOMContentLoaded', function () {
    // 在DOM加载完成后执行以下代码
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const currentTab = tabs[0];
      const url = currentTab.url;
  
      chrome.history.search({ text: url + "" }, function (results) {
        const resultDiv = document.getElementById('result');
  
        if (results && results.length > 0) {
          resultDiv.innerText = '该页面在浏览器的历史记录中访问过。';
        } else {
          resultDiv.innerText = '该页面未在浏览器的历史记录中访问过。';
        }
      });
    });
  });
  