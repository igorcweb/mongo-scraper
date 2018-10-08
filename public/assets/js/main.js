$('.scrape').on('click', function() {
  $.get('/scrape').then(() => {
    location.reload();
  });
});
$('.clear').on('click', function() {
  $.get('/clear').then(() => {
    location.reload();
  });
});
