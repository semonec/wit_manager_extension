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


  function isUrlValid(url) {
    if (!url.endsWith('.png') && !url.endsWith('.jpg') && !url.endsWith('.jpeg') && !url.endsWith('.gif')) {
      alert("url은 png, jpg, jpeg, gif 확장자만 등록가능합니다");
      return false;
    }
    return /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url);
  }

  $('#ext-setting-btn-apply').click(() => {
    applyConfig(auto_vote_up.attr('id'), auto_vote_up.get(0).checked);
    applyConfig(article_header_import.attr('id'), article_header_import.get(0).checked);

    if (article_header_import.get(0).checked) {
      if (isUrlValid(article_header_import_path.val()))
        applyConfig(article_header_import_path.attr('id'), article_header_import_path.val());
      else
        alert('url 이 잘못되었습니다');
    }
  });
  $('#ext-setting-btn-reset').click(() => {
    init();
  });

  init();
});

//