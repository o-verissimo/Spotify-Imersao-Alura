const searchInput = document.getElementById('search-input');
const resultArtist = document.getElementById('result-artist');
const resultPlaylist = document.getElementById('result-playlists');

function requestApi(searchTerm) {
    const url = `http://localhost:3000/artists?name_like=Foo`;
    fetch(url)
        .then((response) => response.json())
        //.then((result) => displayResults(result))
        .catch((error) => console.error('Erro ao acessar a API:', error));
}

function displayResults(results) {
    resultPlaylist.classList.add("hidden");

    // Limpa resultados anteriores
    resultArtist.innerHTML = '';

    results.forEach(element => {
        const artistCard = document.createElement('div');
        artistCard.classList.add('artist-card');

        const cardImg = document.createElement('div');
        cardImg.classList.add('card-img');

        const artistImg = document.createElement('img');
        artistImg.classList.add('artist-img');
        artistImg.src = element.urlImg;

        const playButton = document.createElement('div');
        playButton.classList.add('play');
        playButton.innerHTML = '<span class="fa fa-play"></span>';

        cardImg.appendChild(artistImg);
        cardImg.appendChild(playButton);

        const cardText = document.createElement('div');
        cardText.classList.add('card-text');

        const artistName = document.createElement('span');
        artistName.classList.add('artist-name');
        artistName.textContent = element.name;

        const artistCategory = document.createElement('span');
        artistCategory.classList.add('artist-categorie');
        artistCategory.textContent = 'Artista';

        cardText.appendChild(artistName);
        cardText.appendChild(artistCategory);

        artistCard.appendChild(cardImg);
        artistCard.appendChild(cardText);

        // Adiciona o card do artista à seção de resultados
        resultArtist.appendChild(artistCard);
    });

    // Exibe os resultados
    resultArtist.classList.remove('hidden');
}


document.addEventListener('input', function () {
    
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm === '') {
        resultPlaylist.classList.add('hidden');
        resultArtist.classList.remove('hidden');
        return
    }
    requestApi(searchTerm);
})