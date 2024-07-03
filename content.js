// 创建提示框的HTML模板
const createPopup = (lastVisitTime, visitCount) => {
    let popup = document.createElement('div');
    popup.style.position = 'absolute';
    popup.style.backgroundColor = 'white';
    popup.style.border = '1px solid black';
    popup.style.padding = '10px';
    popup.style.zIndex = 1000;
    popup.innerHTML = `
      <p>Last visited: ${new Date(lastVisitTime).toLocaleString()}</p>
      <p>Visit count: ${visitCount}</p>
    `;
    return popup;
  };
  
  // 监听鼠标悬浮事件
  document.addEventListener('mouseover', (event) => {
    let target = event.target.closest('a');
    if (target) {
      let url = target.href;
  
      // 调用自定义转换方法
      url = customTransform(url);
  
      // 发送消息到 background.js 查询历史记录
      chrome.runtime.sendMessage({ action: 'checkHistory', url }, (response) => {
        if (response.lastVisitTime) {
          let popup = createPopup(response.lastVisitTime, response.visitCount);
          document.body.appendChild(popup);
  
          // 定位提示框
          let rect = target.getBoundingClientRect();
          popup.style.top = `${rect.bottom + window.scrollY}px`;
          popup.style.left = `${rect.left + window.scrollX}px`;
  
          // 移除提示框
          target.addEventListener('mouseout', () => {
            document.body.removeChild(popup);
          }, { once: true });
        }
      });
    }
  });
  
  // 自定义转换方法
  const customTransform = (url) => {
    // 在此添加自定义转换逻辑，目前直接返回传入的URL
    return url;
  };
  