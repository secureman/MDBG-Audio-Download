// background.js
let promptedFiles = new Set();

chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    if (details.url.endsWith('.mp3') && !promptedFiles.has(details.url)) {
      // Extract the filename from the URL
      const filename = details.url.split('/').pop();
      
      if (confirm(`MP3 file detected.\n\nFilename: ${filename}\n\nFull URL: ${details.url}\n\nDo you want to download it?`)) {
        chrome.downloads.download({
          url: details.url,
          filename: filename // Use the original filename
        });
      }
      
      // Add the URL to the set of prompted files
      promptedFiles.add(details.url);
      
      // Clear the set after 5 minutes to allow re-prompting for the same file later
      setTimeout(() => {
        promptedFiles.delete(details.url);
      }, 5 * 60 * 1000);
    }
  },
  {urls: ["https://www.mdbg.net/*"]},
  ["blocking"]
);