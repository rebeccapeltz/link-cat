
chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    console.log(tabs[0].url);
    let activeUrl = tabs[0].url || "xx";
    document.querySelector('#link').innerHTML = activeUrl;
});


document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");
    chrome.storage.sync.get(['defaultRecipient', 'categories', 'customMailtoUrl'], function (items) {
        console.log(items.defaultRecipient);
        console.log("categories",items.categories);
        document.querySelector('#defaultRecipient').value = items.defaultRecipient || "";
        document.querySelector('#categories').innerHTML = items.categories || "";
        document.querySelector('#mailto').innerHTML = items.customMailtoUrl || "mail to";
        
    });
  });
