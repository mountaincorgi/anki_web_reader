chrome.runtime.onInstalled.addListener(function() {
    console.log("Installed successfully");
});

const xhr = new XMLHttpRequest();
xhr.open('POST', 'http://localhost:8765');
xhr.send();
