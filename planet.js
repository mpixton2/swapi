let residentslist;
let residentsUl;
let filmsList;
const baseUrl = `https://swapi2.azurewebsites.net/api`;


// Runs on page load
addEventListener('DOMContentLoaded', () => {
    nameH1 = document.querySelector('h1#name');
    rotation = document.querySelector('span#rotation_period');
    orbital = document.querySelector('span#orbital_period');
    diameter = document.querySelector('span#diameter');
    climate = document.querySelector('span#climate');
    gravity = document.querySelector('span#gravity');
    terrain = document.querySelector('span#terrain');
    surface_water = document.querySelector('span#surface_water');
    population = document.querySelector('span#population');
    residentsUl = document.querySelector('#residents>ul');
    filmsUl = document.querySelector('#films>ul');
    testfilm = document.querySelector('span#film');
    testresidents = document.querySelector('span#residents');

    const sp = new URLSearchParams(window.location.search)
    const id = sp.get('id')
    getPlanet(id)
  });

async function getPlanet(id) {
  let planet;
  try {
    planet = await fetchPlanet(id)
    planet.residents = await fetchResidents(id)
    planet.films = await fetchFilms(id)
  }
  catch (ex) {
    console.error(`Error reading planet ${id} data.`, ex.message);
  }
  renderPlanet(planet);

}

async function fetchPlanet(id) {
    let planetURL = `${baseUrl}/planets/${id}`;
    let response = await fetch(planetURL)
    return await response.json()
  }

  
async function fetchResidents(id) {
  const url = `${baseUrl}/planets/${id}/characters`;
  let residents = await fetch(url)
    return await residents.json()
}

async function fetchFilms(id) {
  const url = `${baseUrl}/planets/${id}/films`;
  let films = await fetch(url)
    return await films.json()
}






const renderPlanet = planet => {
  document.title = `SWAPI - ${planet?.name}`;  // Just to make the browser tab say their name
  
  // General information
  nameH1.textContent = planet?.name;
  rotation.textContent = planet?.rotation_period;
  orbital.textContent = planet?.orbital_period;
  diameter.textContent = planet?.diameter;
  climate.textContent = planet?.climate;
  gravity.textContent = planet?.gravity;
  terrain.textContent = planet?.terrain;
  surface_water.textContent = planet?.surface_water;
  population.textContent = planet?.population;


  // Resident and Film list
  const residentslist = planet?.residents?.map(character => `<li><a href="/character.html?id=${character.id}">${character.name}</li>`)
  residentsUl.innerHTML = residentslist.join("");
  const filmsList = planet?.films?.map(film => `<li><a href="/film.html?id=${film.id}">${film.title}</li>`)
  filmsUl.innerHTML = filmsList.join("");
}
      
    