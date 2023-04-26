
function setCitation(author, citation) {
    document.getElementById('citation').innerHTML = `${citation}<br/>-${author}`
}

fetch('assets/db/citations.json')
  .then(response => response.json())
  .then(data => {
    const citations = data;
    const randomCitation = citations[Math.floor(Math.random() * citations.length)];
    setCitation(randomCitation.author, randomCitation.citation);
  })
  .catch(error => {
    console.error('Error fetching citations:', error);
    setCitation('Eric Roy', 'I can\'t load the citation :(')
  });
