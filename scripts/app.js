const form = document.querySelector('#searchform');
const input = document.querySelector('#searchTerm');
const output = document.querySelector('#searchresults');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const config = {
        params: {
            q: input.value
        }
    }
    document.querySelector('#searchresults').innerHTML = null;
    const fetchMovieInfo = await axios.get('https://api.tvmaze.com/search/shows', config);
    const results = fetchMovieInfo.data;
    displayResults(results);
})

const displayResults = (results) => {
    const searchresults = document.getElementById('searchresults');
    searchresults.innerHTML = '';
    
    for (const result of results) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.style.width = '18rem';

        const img = document.createElement('img');
        img.src = result.show?.image?.medium || '../images/1.png';
        img.classList.add('card-img-top');
        img.alt = 'Show Image';

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title');
        cardTitle.textContent = result.show?.name || '-';

        const cardText = document.createElement('p');
        cardText.classList.add('card-text');
        cardText.textContent = result.show?.rating?.average ? `Rating: ${result.show.rating.average}/10` : 'No Ratings Available';

        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);

        card.appendChild(img);
        card.appendChild(cardBody);

        searchresults.appendChild(card);
    }
};