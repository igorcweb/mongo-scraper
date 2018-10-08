$(document).on('click', '.scrape', function() {
  $.post('/scrape')
    .then(() => {
      location.reload();
    })
    .catch(err => console.log(err));
});

$(document).on('click', '.clear', function() {
  $.get('/clear')
    .then(() => {
      location.reload();
    })
    .catch(err => console.log(err));
});

$(document).on('click', '.save', function() {
  $.post('/saved/' + $(this).data('id'))
    .then(() => {
      location.reload();
    })
    .catch(err => console.log(err));
});

$(document).on('click', '.remove', function() {
  $.post('/saved/remove/' + $(this).data('id')).then(() => {
    location.reload();
  });
});

$(document).on('click', '.notes', function() {
  $('.modal-title').text($(this).data('title'));
  console.log($(this)[0].dataset.id);
  $('.save-note').attr({
    'data-id': $(this)[0].dataset.id,
    'data-title': $(this)[0].dataset.title
  });
});

$(document).on('click', '.save-note', function() {
  const id = this.dataset.id;
  const title = this.dataset.title;
  const note = $('#noteText').val();

  $.post('/saved/note/' + id, { note, title });
});
