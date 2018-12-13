chrome.browserAction.onClicked.addListener( (activeTab) => {
  let newUrl = "http://witland.xyz";
  chrome.tabs.create({ url: newUrl });
  //chrome.tabs.insertCSS({file: "../css/mui.min.css"});
});