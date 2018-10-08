$('.scrape').on('click', function() {
  $.get('/api/scrape', () => {
    location.reload();
  });
});
