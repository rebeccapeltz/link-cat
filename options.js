const gmail = "https://mail.google.com/mail/?extsrc=mailto&url=%s";
const defaultRecipient = "";
const defaultCategories = "JS,ML,layout,fun,news";

function toggle(radioButton) {

  if (chrome.storage == null) {
    alert('Permission for chrome storage is required.');
    return;
  }
  if (document.getElementById('gmail').checked) {
    chrome.storage.sync.set({
      'customMailtoUrl': gmail
    });
  } else {
    chrome.storage.sync.set({
      'customMailtoUrl': ""
    });
  }
}

function changeRecipient(recipientInput) {
  let newRecipient = document.getElementById('recipient').value;
  if (newRecipient.length > 0) {
    chrome.storage.sync.set({
      'defaultRecipient': newRecipient
    });
  } else {
    chrome.storage.sync.set({
      'defaultRecipient': ""
    });
  }
}

function changeCategories(categoryInput) {
  let newCategories = document.getElementById('categories').value;
  console.log("options", JSON.stringify(newCategories));
  if (newCategories.length > 0) {
    chrome.storage.sync.set({
      'categories': newCategories
    });
  } else {
    chrome.storage.sync.set({
      'categories': ""
    });
  }
}

/**
 * Function to initialize option values and load option form
 */
function main() {
  if (chrome.storage == null) {
    alert("Permission for chrome storage must be enabled for changing options.");
    document.querySelector('#default').disabled = true;
    document.querySelector('#gmail').disabled = true;
    return;
  }

  chrome.storage.sync.get(['defaultRecipient', 'categories','customMailtoUrl'], function (items) {
    console.log('sync get', items)
    if (items.customMailtoUrl == gmail){
      document.querySelector('#gmail').checked = true;
    }
    document.querySelector('#recipient').value = items.defaultRecipient || defaultRecipient;
    if (!items.categories) {
      document.querySelector('#categories').value = defaultCategories;
      chrome.storage.sync.set({
        'categories': defaultCategories
      });
    } else {
      document.querySelector('#categories').value = items.categories;
    }
  });


}

document.addEventListener('DOMContentLoaded', function () {
  main();
  document.querySelector('#default').addEventListener('click', toggle);
  document.querySelector('#gmail').addEventListener('click', toggle);
  document.querySelector('#recipient').addEventListener('input', changeRecipient);
  document.querySelector('#categories').addEventListener('input', changeCategories);
});