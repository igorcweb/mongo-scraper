//Scrape button
$(document).on('click', '.scrape', function() {
  $.post('/scrape')
    .then(() => {
      setTimeout(() => location.reload(), 1000);
    })
    .catch(err => console.log(err));
});

//Clear button
$(document).on('click', '.clear', function() {
  $.get('/clear')
    .then(() => {
      location.reload();
    })
    .catch(err => console.log(err));
});

//Save article
$(document).on('click', '.save', function() {
  $.post('/saved/' + $(this).data('id'))
    .then(() => {
      location.reload();
    })
    .catch(err => console.log(err));
});

//Remove from saved
$(document).on('click', '.remove', function() {
  $.post('/saved/remove/' + $(this).data('id')).then(() => {
    location.reload();
  });
});

//Article notes button
$(document).on('click', '.notes', function() {
  $('.modal-title').text($(this).data('title'));
  const id = $(this)[0].dataset.id;
  console.log(id);
  $('.save-note').attr({
    'data-id': id,
    'data-title': $(this)[0].dataset.title
  });
  $.get('/saved/notes/' + id).then(result => {
    const { notes } = result;
    if (!notes || !notes.length) {
      $('ul.notes').empty().append(`
        <li class="list-group-item mb-3 pl-2 no-notes">No notes for this article yet</li>`);
    } else {
      $('ul.notes').empty();
      Array.from(notes).forEach(note => {
        $('ul.notes').append(`
        <li class="list-group-item mb-3 pl-2">${
          note.body
        }<i class="fas fa-times" data-noteid="${note._id}"></i></li>
      `);
      });
    }
  });
});

//Save note button
$(document).on('click', '.save-note', function() {
  const id = this.dataset.id;
  const title = this.dataset.title;
  const note = $('#noteText')
    .val()
    .trim();
  if (note) {
    $.post('/saved/note/' + id, { note, title, id });
    $('#noteText').val('');
    $('li.no-notes').addClass('d-none');
    $('ul.notes').append(
      `<li class="list-group-item mb-3 pl-2">${note}<i class="fas fa-times"></i></li>`
    );
    location.reload();
  }
});

//Delete note button
$('.notes').on('click', '.fa-times', function(e) {
  e.stopPropagation();
  const noteId = $(this).data('noteid');
  const li = $(this).parent();
  $(li).remove();
  $.get('/saved/note/remove/' + noteId).then(() => console.log('note removed'));
});
