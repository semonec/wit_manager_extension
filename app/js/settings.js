// send message to developer
$("#wit-btn-send-msg-to-dev").click(function(){ 
  const new_win = window.open(
    "http://witland.xyz/bbs/memo_form.php?me_recv_mb_id=google_a07f09e3",
    'win_memo',
    'left=100,top=100,width=620,height=500,scrollbars=1');
  new_win.focus();
});