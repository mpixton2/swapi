let titleH1 
let crawlSpan
let producerSpan 
let directorSpan 
let charctersUl
let planetsUl

addEventListener('DOMContentLoaded', () => {
    titleH1 = document.querySelector('h1#title');
    crawlSpan = document.querySelector('span#crawl');
    producerSpan = document.querySelector('span#producer');
    directorSpan = document.querySelector('span#director');
    charctersUl = document.querySelector('#characters>ul');
    planetsUl = document.querySelector('#planets>ul');
    const sp = new URLSearchParams(window.location.search)
    const id = sp.get('id')
    getFilm(id)
  });

async function getFilm(id) {  
    let film;
    try {
        film = await fetchFilm(id)
        film.characters = await fetchCharacters(id)
        film.planets = await fetchPlanets(id)
    }
    catch (ex) {
        console.error(`Error reading Films ${id} data.`, ex.message);
    }

    console.log("The Film was loaded successfully", film)
    renderFilm(film);
  }

async function fetchFilm(id) {
    let characterUrl = `https://swapi2.azurewebsites.net/api/films/${id}`;
    return await fetch(characterUrl)
      .then(res => res.json())
  }

async function fetchCharacters(id) {
    const url = `https://swapi2.azurewebsites.net/api/films/${id}/characters`;
    const characters = await fetch(url)
      .then(res => res.json())
    return characters;
  }

  async function fetchPlanets(id) {
    const url = `https://swapi2.azurewebsites.net/api/films/${id}/planets`;
    const planets = await fetch(url)
      .then(res => res.json())
    return planets;
  }

const renderFilm = film => {
    titleH1.textContent = film?.title;
    crawlSpan.textContent = film?.opening_crawl;
    producerSpan.textContent = film?.producer;
    directorSpan.textContent = film?.director;
    const charsLis = film?.characters?.map(character => `<li><a href="/character.html?id=${character.id}">${character.name}</li>`)
    charctersUl.innerHTML = charsLis.join("");
    const planetsLis = film?.planets?.map(planet => `<li><a href="/character.html?id=${planet.id}">${planet.name}</li>`)
    planetsUl.innerHTML = planetsLis.join("");
  }

