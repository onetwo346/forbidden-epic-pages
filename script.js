document.getElementById('story-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const genre = document.getElementById('genre').value;
  const character = document.getElementById('character').value;
  const setting = document.getElementById('setting').value;

  // Generate a placeholder story
  const story = `Once upon a time, in a ${setting}, there was a ${character} who embarked on an epic ${genre} adventure...`;

  document.getElementById('generated-story').textContent = story;
  document.getElementById('story-preview').classList.remove('hidden');
});

document.getElementById('download-pdf').addEventListener('click', function () {
  const story = document.getElementById('generated-story').textContent;

  fetch('/generate-pdf', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ story }),
  })
    .then((response) => response.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'epic-story.pdf';
      a.click();
    });
});
