 chrome.browserAction.onClicked.addListener( (activeTab) => {
  let newUrl = "http://witland.xyz";
  chrome.tabs.create({ url: newUrl });
  //chrome.tabs.insertCSS({file: "../css/mui.min.css"});
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.greeting == "hello")
      sendResponse({farewell: "goodbye"});

  switch(request.type) {
    case 'OPEN_OPTIONS_BOARD':
      chrome.runtime.openOptionsPage();
      break;
    default:
      break;
  }
});