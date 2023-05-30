document.addEventListener('DOMContentLoaded', function () {
    const whitelistRadio = document.querySelector('input[value="whitelist"]');
    const blacklistRadio = document.querySelector('input[value="blacklist"]');
    const saveButton = document.getElementById('saveBtn');
    const blacklistInput = document.getElementById('blacklistInput');
    const whitelistInput = document.getElementById('whitelistInput');

    // 加载保存的设置和名单内容
    chrome.storage.local.get(['listType', 'blacklist', 'whitelist'], function (data) {
        const savedListType = data.listType ?? 'blacklist';
        const savedBlacklist = data.blacklist ?? '';
        const savedWhitelist = data.whitelist ?? '';

        if (savedListType) {
            if (savedListType === 'whitelist') {
                whitelistRadio.checked = true;
            } else if (savedListType === 'blacklist') {
                blacklistRadio.checked = true;
            }
        }

        blacklistInput.value = savedBlacklist;
        whitelistInput.value = savedWhitelist;
    });

    // 监听保存按钮点击事件
    saveButton.addEventListener('click', function () {
        let listType = whitelistRadio.checked ? 'whitelist' : 'blacklist';

        const blacklist = blacklistInput.value;
        const whitelist = whitelistInput.value;

        // 保存设置和名单内容到 chrome.storage
        chrome.storage.local.set({ listType: listType, blacklist: blacklist, whitelist: whitelist }, function () {
        });
    });
});
