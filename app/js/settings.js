// send message to developer
$("#wit-btn-send-msg-to-dev").click(function(){ 
  const new_win = window.open(
    "http://witland.xyz/bbs/memo_form.php?me_recv_mb_id=google_a07f09e3",
    'win_memo',
    'left=100,top=100,width=620,height=500,scrollbars=1');
  new_win.focus();
});

const auto_vote_up = $('#setting-auto-vote-up');
const article_header_import = $('#setting-article-header-import');
const article_header_import_path = $('#setting-article-header-import-path');

function readConfig(item) {
  const key = item.attr('id');
  return new Promise(function (resolve, reject) {
    chrome.storage.sync.get([key], function(result) {
      console.log('readConfig>> ', result);
      $(`#${key}`).get(0).checked = result[key];
      resolve(result[key]);
    });
  });
}

function applyConfig(key, value) {
  let item = {};
  item[key] = value;
  chrome.storage.sync.set(item, function() {
    console.log('applyConfig>>', key, value);
  });
}

// jjal
function togglePath(show) {
  const disable = 'disabled-hidden';
  if (show)
    $('#article-header-import-path').removeClass(disable);
  else
    $('#article-header-import-path').addClass(disable);
}

function init() {
  readConfig(auto_vote_up);
  readConfig(article_header_import)
    .then(function(result) {
      togglePath(result);
    });
  readConfig(article_header_import_path)
    .then(function(result) {
      if (result) {
        const key = 'setting-article-header-import-path';
        chrome.storage.sync.get([key], function(result) {
          console.log('readConfig>> ', result);
          if (result[key] !== undefined)
            $(`#${key}`).val(result[key]);
            M.updateTextFields();
        });
      }
    });
}


document.addEventListener('DOMContentLoaded', () => {
  auto_vote_up.change(() => {
    const checked = auto_vote_up.get(0).checked;
    console.log('changed>> ', 'auto_vote_up::', checked);
  });
  article_header_import.change(() => {
    const checked = article_header_import.get(0).checked;
    console.log('changed>> ', 'article_header_import::', checked);
    togglePath(checked);
  });



  $('#ext-setting-btn-apply').click(() => {
    applyConfig(auto_vote_up.attr('id'), auto_vote_up.get(0).checked);
    applyConfig(article_header_import.attr('id'), article_header_import.get(0).checked);
    applyConfig(article_header_import_path.attr('id'), article_header_import_path.val());

  });
  $('#ext-setting-btn-reset').click(() => {
    init();
  });

  init();
});

//