let isLogged = false;
$(document).ready(() => {
  // do nothing.
  // should have to do at inherited scrips,
  // ex) runner-board.js, runner-write.js, etc.
  
  isLogged = !!$('.widget-box').find('.basic-outlogin').find('.profile').length;
  console.log('helper extension initializing... logged:', isLogged);
});
/* 
// extension sync it's data with storage
chrome.storage.sync.set({key: value}, function() {
  console.log('Value is set to ' + value);
});

chrome.storage.sync.get(['key'], function(result) {
  console.log('Value currently is ' + result.key);
});
*/