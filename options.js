const gmail = "https://mail.google.com/mail/?extsrc=mailto&url=%s";
const defaultRecipient = "";
const defaultCategories = "JS,ML,layout,fun,news";

function toggle(radioButton) {
  if (window.localStorage == null) {
    alert('Local storage is required for changing providers');
    return;
  }
  if (document.getElementById('gmail').checked) {
    window.localStorage.customMailtoUrl = gmail;
  } else {
    window.localStorage.customMailtoUrl = "";
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
  if (window.localStorage == null) {
    alert("LocalStorage must be enabled for changing options.");
    document.getElementById('default').disabled = true;
    document.getElementById('gmail').disabled = true;
    return;
  }

  // Default handler is checked. If we've chosen another provider, we must
  // change the checkmark.
  if (window.localStorage.customMailtoUrl == gmail)
    document.getElementById('gmail').checked = true;

  chrome.storage.sync.get(['defaultRecipient', 'categories'], function (items) {
    console.log('sync get', items)
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