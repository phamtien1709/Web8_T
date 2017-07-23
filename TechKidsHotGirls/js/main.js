$(document).ready(function(){
  function loadNewPage(){
    if(isLoading) return;
    isLoading = true;

    $.ajax({
      method: "get",
      url   : "./imagesData.json"
    }).then(function(data){
      var listContent = girlTemplate(data);

      var $listContent = $(listContent);
      $('#girl_list').append($listContent);
      $('#girl_list').masonry('appended', $listContent).masonry('layout');

      $('#girl_list').imagesLoaded().progress( function() {
        $('#girl_list').masonry('layout');
      });
    }).fail(function(err){
      console.error(err);
    }).always(function(){
      isLoading = false;
    });
  }

  var source   = $("#girl_item_template").html();
  var girlTemplate = Handlebars.compile(source);


  $('#girl_list').masonry({
    itemSelector: '.item_container',
    columnWidth: '.item_container',
    percentPosition: true
  });

  loadNewPage();

  var throtte = false;
  var isLoading = false;
  $(window).on('scroll', function(){
    if(throtte) return;
    throtte = true;
    setTimeout(function(){ throtte = false; }, 50);

    if($(document).height() < $(window).height() + $(window).scrollTop() + 200){
      loadNewPage();
    }
  });
});
