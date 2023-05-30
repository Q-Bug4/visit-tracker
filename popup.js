document.addEventListener('DOMContentLoaded', function () {
    const whitelistRadio = document.querySelector('input[value="whitelist"]');
    const blacklistRadio = document.querySelector('input[value="blacklist"]');
    const noneRadio = document.querySelector('input[value="none"]');
    const saveButton = document.getElementById('saveBtn');
    const blacklistInput = document.getElementById('blacklistInput');
    const whitelistInput = document.getElementById('whitelistInput');

    // 加载保存的设置和名单内容
    chrome.storage.local.get(['listType', 'blacklist', 'whitelist'], function (data) {
        const savedListType = data.listType ?? 'none';
        const savedBlacklist = data.blacklist ?? '';
        const savedWhitelist = data.whitelist ?? '';

        if (savedListType) {
            if (savedListType === 'whitelist') {
                whitelistRadio.checked = true;
            } else if (savedListType === 'blacklist') {
                blacklistRadio.checked = true;
            } else {
                noneRadio.checked = true;
            }
        }

        blacklistInput.value = savedBlacklist;
        whitelistInput.value = savedWhitelist;
    });

    // 监听保存按钮点击事件
    saveButton.addEventListener('click', function () {
        let listType = whitelistRadio.checked || blacklistRadio.checked || 'none';

        const blacklist = blacklistInput.value;
        const whitelist = whitelistInput.value;

        // 保存设置和名单内容到 chrome.storage
        chrome.storage.local.set({ listType: listType, blacklist: blacklist, whitelist: whitelist }, function () {
            window.close()
        });
    });
});
