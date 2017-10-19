

chrome.storage.sync.get(['defaultRecipient','categories'], function (items) {
    console.log(items.defaultRecipient);
    document.getElementById('defaultRecipient').value = items.defaultRecipient || "";
    document.getElementById('categories').value = items.categories || "";
    // document.getElementById('link').text(items.currentTab.url);
});