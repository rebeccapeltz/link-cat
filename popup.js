//location.reload(true)
let activeUrl = '';
let activeTitle = '';
chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    console.log(tabs[0].url);
    activeUrl = tabs[0].url || "xx";
    activeTitle = tabs[0].title || 'Title';
    document.querySelector('#link').innerHTML = activeTitle;
});


document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");
    chrome.storage.sync.get(['defaultRecipient', 'categories', 'customMailtoUrl'], function (items) {
        console.log(items.defaultRecipient);
        console.log("categories",items.categories);
        document.querySelector('#defaultRecipient').value = items.defaultRecipient || "";
        // document.querySelector('#categories').innerHTML = items.categories || "";
        let mailto = items.customMailtoUrl ? 'gmail' : 'mail to';
        document.querySelector('#mailto').innerHTML = mailto;

        //add options for category selection
        let cats = items.categories.split(',');
        let selectEl = document.querySelector('#category-select');
        cats.forEach((cat)=>{
            selectEl.options[selectEl.options.length] = new Option(cat,cat);
        });
        
    });
  });
