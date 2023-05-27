// 监听页面上的链接
document.addEventListener("mouseover", function(event) {
    var target = event.target;
  
    // 检查是否为链接
    if (target.tagName.toLowerCase() === "a") {
      var url = target.href;
  
      // 检查链接是否已访问过
      checkIfVisited(url, function(visited) {
        if (visited) {
          // 链接已访问过
          console.log("已访问过该链接");
          // 在此处添加你自定义的操作，例如在链接旁边显示一个图标或样式
        } else {
          // 链接未访问过
          console.log("未访问过该链接");
          // 在此处添加你自定义的操作，例如在链接旁边显示一个图标或样式
        }
      });
    }
  });
  
  function checkIfVisited(url, callback) {
    // 使用浏览器历史记录API检查链接是否已访问过
    chrome.history.search({ text: url, maxResults: 1 }, function(data) {
      var visited = data.length > 0;
      callback(visited);
    });
  }
  