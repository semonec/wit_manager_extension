$(document).on('DOMContentLoaded', () => {
  $("#pressme").click(() => chrome.runtime.openOptionsPage());
});
