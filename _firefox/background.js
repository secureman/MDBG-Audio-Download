browser.webRequest.onBeforeRequest.addListener(
  function(details) {
    if (details.url.endsWith('.mp3')) {
      const filename = details.url.split('/').pop();
      browser.tabs.query({active: true, currentWindow: true}).then((tabs) => {
        browser.tabs.sendMessage(tabs[0].id, {
          action: "showPrompt",
          url: details.url,
          filename: filename
        });
      });
    }
  },
  {urls: ["https://www.mdbg.net/*"]},
  ["blocking"]
);

browser.runtime.onMessage.addListener((message) => {
  if (message.action === "download") {
    browser.downloads.download({
      url: message.url,
      filename: message.filename
    });
  }
});