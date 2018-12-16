function readConfig(item) {
  return new Promise(function (resolve, reject) {
    chrome.storage.sync.get([item], function(result) {
      console.log('readConfig>> ', result);
      resolve(result[item]);
    });
  });
}

$(document).ready(() => {
  const floatButton = $('<div></div>')
    .addClass('ext-floating')
    .insertBefore('.at-go')
    .append(` \
      <div class="fixed-action-btn"> \
        <a class="btn-floating btn-large indigo" alt="클릭해서 메뉴를 선택하세요"> \
          <i class="medium material-icons">menu</i> \
        </a> \
        <ul> \
          <li><a class="btn-floating blue-grey lighten-1 ext-settings" alt="글 읽기 설정"><i class="material-icons">settings</i></a></li> \
          <li><a class="btn-floating light-blue ext-thumb-up" alt="추천하기"><i class="material-icons">thumb_up</i></a></li> \
          <li><a class="btn-floating red ext-thumb-down" alt="비추천하기"><i class="material-icons">thumb_down</i></a></li> \
          <li><a class="btn-floating cyan ext-go-to-comment" alt="코멘트로 이동"><i class="material-icons">comment</i></a></li> \
        </ul> \
      </div>`);
  // initialize FAB
  const elems = document.querySelectorAll('.fixed-action-btn');
  const instances = M.FloatingActionButton.init(elems, {
    direction: 'left',
    hoverEnabled: false
  });

  // scroll to comment
  $('.ext-go-to-comment').click(() => {
    $([document.documentElement, document.body]).animate({
      scrollTop: $('.comment-box').offset().top
    }, 300);
  });

  // thumb up
  $('.ext-thumb-up').click(() => {
    $('.print-hide.view-good-box').find('.view-good').find('a').get(0).click();
  });

  // thumb down
  $('.ext-thumb-down').click(() => {
    $('.print-hide.view-good-box').find('.view-nogood').find('a').get(0).click();
  });

  // go to settings
  $('.ext-settings').click(() => {
    chrome.runtime.sendMessage({type: "OPEN_OPTIONS_BOARD"});
  });

  readConfig('setting-auto-vote-up')
    .then(function (result) {
      if (result) {
        $('.print-hide.view-good-box').find('.view-good').find('a').get(0).click();
      }
    });
});