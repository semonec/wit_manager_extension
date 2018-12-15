var feedback = function(res) {
    if (res.success === true) {
        var get_link = res.data.link.replace(/^http:\/\//i, 'https://');
        document.querySelector('.status').classList.add('bg-success');
        $('#setting-article-header-import-path').val(get_link);
        M.updateTextFields();
        document.querySelector('.status').innerHTML =
            '<br>' + '<img class="img" alt="Imgur-Upload" src=\"' + get_link + '\"/>';
    }
};

new Imgur({
    clientid: '81dca1140b62b71', //You can change this ClientID
    callback: feedback
});