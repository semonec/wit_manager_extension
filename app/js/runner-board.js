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
          <li><a class="btn-floating cyan ext-go-to-comment" alt="코멘트로 이동"><i class="material-icons">comment</i></a></li> \
          <li><a class="btn-floating light-blue ext-thumb-up" alt="추천하기"><i class="material-icons">thumb_up</i></a></li> \
          <li><a class="btn-floating red ext-thumb-down" alt="비추천하기"><i class="material-icons">thumb_down</i></a></li> \
          <li><a class="btn-floating red ext-prev" alt="이전 게시글"><i class="material-icons">keyboard_arrow_left</i></a></li> \
          <li><a class="btn-floating red ext-nextn" alt="다음 게시글"><i class="material-icons">keyboard_arrow_right</i></a></li> \

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
    }, 2000);
  });

  // thumb up
  $('.ext-thumb-up').click(() => {
    $('.print-hide.view-good-box').find('.view-good').find('a').click();
  });

  // thumb down
  $('.ext-thumb-down').click(() => {
    $('.print-hide.view-good-box').find('.view-nogood').find('a').click();
  });
});