//location.reload(true)
let activeUrl = '';
let activeTitle = '';
let activeId = '';

chrome.tabs.query({
    currentWindow: true,
    active: true
}, function (tabs) {
    console.log(tabs[0].url);
    activeUrl = tabs[0].url || "Error extracting URL";
    activeTitle = tabs[0].title || 'Title';
    activeId = tabs[0].id;
    document.querySelector('#link').innerHTML = activeTitle;
});


function executeMailto() {
    chrome.storage.sync.get(['defaultRecipient','customMailtoUrl','selectedCategory'], function (item) {
        let customMailtoUrl = item.customMailtoUrl;
        let recipient = item.defaultRecipient;
        let selectedCategory = item.selectedCategory;
        let subjectCat = selectedCategory.length > 0 ? encodeURIComponent(selectedCategory.toUpperCase() + ': ') : "";
        let defaultHandler = customMailtoUrl == null ? true : (customMailtoUrl.length == 0 ? true : false);
        let actionUrl = "mailto:?";
        if (activeTitle.length > 0) {
            actionUrl += "subject=" + subjectCat + encodeURIComponent(activeTitle) + "&";
        }
        if (activeUrl.length > 0 && activeUrl !== "Error extracting URL") {
            actionUrl += "body=" + encodeURIComponent(activeUrl) + "&"; 
        }
        if (recipient.length > 0){
            actionUrl += "to=" + encodeURIComponent(recipient);
        }

        if (!defaultHandler) {
            // separate tab
            let customUrl = customMailtoUrl;
            actionUrl = customUrl.replace("%s", encodeURIComponent(actionUrl));
            actionUrl = actionUrl.replace("%t",encodeURIComponent(defaultRecipient))
            console.log('Custom url: ' + actionUrl);
            chrome.tabs.create({
                url: actionUrl
            });
        } else {
            // mailto
            console.log('Action url: ' + actionUrl);
            chrome.tabs.update(activeId, {
                url: actionUrl
            });
        }
    });
}

function setCategory(){
   let selectedCat =  document.querySelector("#category-select").value;
    chrome.storage.sync.set({'selectedCategory': selectedCat});
}


document.addEventListener("DOMContentLoaded", function (event) {
    console.log("DOM fully loaded and parsed");
    
    chrome.storage.sync.get(['defaultRecipient', 'categories', 'customMailtoUrl'], function (items) {
        console.log(items.defaultRecipient);
        console.log("categories", items.categories);
        document.querySelector('#defaultRecipient').value = items.defaultRecipient || "";
        // document.querySelector('#categories').innerHTML = items.categories || "";
        let mailto = items.customMailtoUrl ? 'gmail' : 'mail to';
        document.querySelector('#mailto').innerHTML = mailto;

        //add options for category selection
        let cats = items.categories.split(',');
        let selectEl = document.querySelector('#category-select');
        cats.forEach((cat) => {
            selectEl.options[selectEl.options.length] = new Option(cat, cat);
        });
        let submitButton = document.querySelector('input[type="submit"]');
        submitButton.addEventListener('click',(event)=>{
            setCategory();
            executeMailto();
        },false);
    });
});