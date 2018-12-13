//Pure JS code with jQuery implementation
document.addEventListener('DOMContentLoaded', function() {
  const Button = document.getElementById('pressme');
  Button.addEventListener('click', function() { 
    chrome.runtime.openOptionsPage(function(){});
  });
}, false);
