document.addEventListener('DOMContentLoaded', () => {
  const disableSitesInput = document.getElementById('disableSites');
  const saveButton = document.getElementById('saveButton');

  // 从 storage 中加载禁用网站列表
  chrome.storage.sync.get(['disableSites'], (result) => {
    if (result.disableSites) {
      disableSitesInput.value = result.disableSites.join('\n');
    }
  });

  // 保存禁用网站列表
  saveButton.addEventListener('click', () => {
    const sites = disableSitesInput.value.split('\n').map(site => site.trim()).filter(site => site.length > 0);
    chrome.storage.sync.set({ disableSites: sites }, () => {
      alert('Settings saved and will take effect immediately.');
    });
  });
});
