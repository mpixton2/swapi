

addEventListener('DOMContentLoaded', () => {
    titleH1 = document.querySelector('h1#title');
    crawlSpan = document.querySelector('span#crawl');
    producerSpan = document.querySelector('span#producer');
    directorSpan = document.querySelector('span#director');
    // homeworldSpan = document.querySelector('span#homeworld');
    // filmsUl = document.querySelector('#films>ul');
    const sp = new URLSearchParams(window.location.search)
    const id = sp.get('id')
    getFilm(id)
  });

async function getFilm(id) {
    let urlFilms = 'https://swapi2.azurewebsites.net/api/films/${id}';
  
    try {
      const fetchedFilm = await fetch(urlFilms)
        .then(res => res.json())
    }
    catch (ex) {
      console.error("Error reading film.", ex.message);
    }
    console.log("The Film was loaded successfully", fetchedFilm)
    renderFilm(fetchedFilm);
  }

const renderFilm = fetchedFilm => {
    titleH1.textContent = fetchedFilm?.title;
    crawlSpan.textContent = fetchedFilm?.opening_crawl;
    producerSpan.textContent = fetchedFilm?.producer;
    directorSpan.textContent = fetchedFilm?.director;
  }

