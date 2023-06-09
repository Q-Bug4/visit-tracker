const initLinks = document.getElementsByTagName('a');
for (let i = 0; i < initLinks.length; i++) {
  bindLink(initLinks[i]);
}
// 创建一个 MutationObserver 实例
const observer = new MutationObserver(function (mutations) {
  console.log("observer start");
  mutations.forEach(function (mutation) {
    if (mutation.type === 'childList') {
      // 监听到子元素变化
      const addedNodes = mutation.addedNodes;
      addedNodes.forEach(function (node) {
        if (node.nodeType === Node.ELEMENT_NODE && node.matches('a')) {
          // 新增的节点是 <a> 元素
          bindLink(node)
        }
      });
    }
  });
});

function bindLink(link) {
  link.addEventListener('mouseover', handleMouseOver);
  link.addEventListener('mouseout', handleMouseOut);
  link.addEventListener('mouseenter', handleMouseEnter);
  link.addEventListener('mouseleave', handleMouseLeave);
}
function handleMouseEnter(event) {
  const target = event.target;
  console.log("enter mouse")
  // 处理鼠标进入事件
  handleMouseOver(event)
}

function handleMouseLeave(event) {
  const target = event.target;
  console.log("leave mouse")
  // 处理鼠标离开事件
  handleMouseOut(event)
}

// 监听整个 document 内容的变化
observer.observe(document, { childList: true, subtree: true });

let tooltip = null;
console.log("top!");

function handleMouseOver(event) {
  const link = event.target;
  chrome.runtime.sendMessage({ action: 'checkHistory', url: link.href }, function (response) {
    console.log(response);
    if (response && response.visitCount > 0) {
      const visitCount = response.visitCount;
      const lastVisitTime = response.lastVisitTime;
      if (tooltip) {
        tooltip.remove();
      }
      tooltip = showTooltip(link, visitCount, lastVisitTime);
      console.log("visited !!")
    }
  });
}

function handleMouseOut(event) {
  const link = event.target;
  if (tooltip && link.dataset.tooltipId === tooltip.dataset.tooltipId) {
    tooltip.remove();
    tooltip = null;
  }
}

function showTooltip(element, visitCount, lastVisitTime) {
  const tooltip = document.createElement('div');
  const visitCountText = document.createElement('div');
  visitCountText.textContent = `访问次数: ${visitCount}次`;
  tooltip.appendChild(visitCountText);

  const lastVisitTimeText = document.createElement('div');
  lastVisitTimeText.textContent = `最近访问时间: ${lastVisitTime}`;
  tooltip.appendChild(lastVisitTimeText);

  tooltip.style.position = 'absolute';
  tooltip.style.zIndex = '9999';
  tooltip.style.backgroundColor = '#333';
  tooltip.style.color = '#fff';
  tooltip.style.padding = '5px';
  tooltip.style.fontSize = '14px';
  tooltip.style.borderRadius = '3px';
  tooltip.style['box-shadow'] = '2px 2px 6px rgba(0, 0, 0, 0.3)';
  tooltip.style['border'] = '2px solid #000';

  const rect = element.getBoundingClientRect();
  const top = rect.top + window.pageYOffset + rect.height + 5;
  const left = rect.left + window.pageXOffset + rect.width - 150;

  tooltip.style.top = top + 'px';
  tooltip.style.left = left + 'px';

  document.body.appendChild(tooltip);

  element.dataset.tooltipId = tooltip.dataset.tooltipId = Date.now().toString();
  return tooltip;
}