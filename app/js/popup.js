$(document).on('DOMContentLoaded', () => {
  $("#pressme").click(() => chrome.runtime.openOptionsPage());
  $('#go').click(() => chrome.tabs.create({ 
    url: 'http://witland.xyz'
  }))
});
