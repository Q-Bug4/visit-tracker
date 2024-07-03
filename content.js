// 创建提示框的HTML模板
const createPopup = (lastVisitTime, visitCount) => {
    let popup = document.createElement('div');
    popup.style.position = 'absolute';
    popup.style.backgroundColor = 'white';
    popup.style.border = '1px solid black';
    popup.style.padding = '10px';
    popup.style.zIndex = 1000;
    popup.innerHTML = `
      <div style="text-align: right;">
        <button style="background: none; border: none; cursor: pointer; font-size: 16px;">&times;</button>
      </div>
      <p>Last visited: ${new Date(lastVisitTime).toLocaleString()}</p>
      <p>Visit count: ${visitCount}</p>
    `;
  
    // 关闭按钮事件
    popup.querySelector('button').addEventListener('click', () => {
      document.body.removeChild(popup);
    });
  
    return popup;
  };
  
  // 自定义转换方法
  const customTransform = (url) => {
    // 在此添加自定义转换逻辑，目前直接返回传入的URL
    return url;
  };
  
  // 定义禁用网站列表
  let disableSites = [];
  
  // 加载禁用网站列表
  const loadDisableSites = () => {
    chrome.storage.sync.get(['disableSites'], (result) => {
      disableSites = result.disableSites || [];
    });
  };
  
  // 初始化加载禁用网站列表
  loadDisableSites();
  
  // 监听禁用网站列表的变化
  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName === 'sync' && changes.disableSites) {
      disableSites = changes.disableSites.newValue || [];
    }
  });
  
  // 监听鼠标悬浮事件
  document.addEventListener('mouseover', (event) => {
    let target = event.target.closest('a');
    if (target) {
      let url = target.href;
      let currentSite = window.location.hostname;
  
      // 检查当前网站是否在禁用列表中
      for (let regex of disableSites) {
        if (new RegExp(regex).test(currentSite)) {
          return;
        }
      }
  
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
  
          // 隐藏或销毁提示框
          target.addEventListener('mouseout', () => {
            if (popup && popup.parentNode) {
              document.body.removeChild(popup);
            }
          }, { once: true });
        }
      });
    }
  });
  