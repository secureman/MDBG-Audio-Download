let promptedFiles = new Set();

browser.runtime.onMessage.addListener((message) => {
  if (message.action === "showPrompt") {
    const { url, filename } = message;
    if (!promptedFiles.has(url)) {
      if (confirm(`MP3 file detected.\n\nFilename: ${filename}\n\nFull URL: ${url}\n\nDo you want to download it?`)) {
        browser.runtime.sendMessage({
          action: "download",
          url: url,
          filename: filename
        });
      }
      promptedFiles.add(url);
      
      // Clear the set after 5 minutes
      setTimeout(() => {
        promptedFiles.delete(url);
      }, 5 * 60 * 1000);
    }
  }
});