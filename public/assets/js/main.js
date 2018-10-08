$('.scrape').on('click', function() {
  $.post('/scrape').then(() => {
    location.reload();
  });
});

$('.clear').on('click', function() {
  $.get('/clear').then(() => {
    location.reload();
  });
});

$('.save').on('click', function() {
  $.post('/saved/' + $(this).data('id')).then(() => {
    location.reload();
  });
});

$('.remove').on('click', function() {
  $.post('/saved/remove/' + $(this).data('id')).then(() => {
    location.reload();
  });
});
