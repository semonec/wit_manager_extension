let isLogged = false;
$(document).ready(() => {
  // do nothing.
  // should have to do at inherited scrips,
  // ex) runner-board.js, runner-write.js, etc.
  
  isLogged = !!$('.widget-box').find('.basic-outlogin').find('.profile').length;
  console.log('helper extension initializing... logged:', isLogged);
});