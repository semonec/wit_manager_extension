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
        <li><a class="btn-floating blue-grey lighten-1 ext-settings" alt="글 쓰기 설정"><i class="material-icons">settings</i></a></li> \
      </ul> \
    </div>`);
  // initialize FAB
  const elems = document.querySelectorAll('.fixed-action-btn');
  const instances = M.FloatingActionButton.init(elems, {
    direction: 'left',
    hoverEnabled: false
  });

  // go to settings
  $('.ext-settings').click(() => {
    chrome.runtime.sendMessage({type: "OPEN_OPTIONS_BOARD"});
  });
  // automatically paste preset
  // oEditors.getById["wr_content"].exec("LOAD_CONTENTS_FIELD");

  // oEditors.getById["wr_content"].getIR(); // get contents from smarteditor

  function readConfig(item) {
    return new Promise(function (resolve, reject) {
      chrome.storage.sync.get([item], function(result) {
        console.log('readConfig>> ', result);
        resolve(result[item]);
      });
    });
  }

  readConfig('setting-article-header-import')
    .then(function(result) {
      if (result) {
        return readConfig('setting-article-header-import-path');
      }
    })
    .then(function(result) {
      if (result !== undefined ) {
        const imgTagBlock = '`<img src="' + result + '">`';
        // automatically paste 짤
        $('body').append(` \
          <script> \
            $('#wr_content').text(${imgTagBlock}); \
            oEditors.getById["wr_content"].exec("LOAD_CONTENTS_FIELD"); \
          </script> \
        `);
      }
    });
});