document.getElementById('extractTextButton').addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.scripting.executeScript({
            target: {tabId: tabs[0].id},
            files: ['content.js']
        });
    });
});

function followUser(){

let target = document.getElementById("userInput").value 
    alert(input)

}