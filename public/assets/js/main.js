$('.scrape').on('click', function() {
  $.get('/', function() {
    console.log('scraping');
  });
});
