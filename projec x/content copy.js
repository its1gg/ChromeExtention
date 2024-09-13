// Function to extract text from elements with a specific class
function extractTextByClassName(className) {
    const elements = document.getElementsByClassName(className); // Change this if you want to use a different selector
    const texts = Array.from(elements).map(element => element.textContent.trim());
    return texts;
}

// Function to convert array of texts to CSV format and trigger download
function downloadAsCSV(texts, filename = 'extracted_texts.csv') {
    const csvContent = "data:text/csv;charset=utf-8," 
        + texts.map(e => `"${e.replace(/"/g, '""')}"`).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Main function to execute on button click from popup
function executeExtraction() {
    const className = 'example-class'; // Modify this with the actual class name or use a parameter
    const extractedTexts = extractTextByClassName(className);
    if (extractedTexts.length > 0) {
        downloadAsCSV(extractedTexts);
    } else {
        console.error('No elements found with the class:', className);
    }
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.action === "extractText") {
            executeExtraction();
        }
    }
);
