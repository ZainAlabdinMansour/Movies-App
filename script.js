const APIURL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1';
const IMGURL = 'https://image.tmdb.org/t/p/w1280';
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

// initially get top 20 movies
getMovies(APIURL);

async function getMovies(url){

    const resp = await fetch(url);
    const respData = await resp.json();

    showMovies(respData.results);
};

async function showMovies(movies){
    // clear main
    main.innerHTML = '';

    movies.forEach(movie => {
        const {poster_path, title, vote_average, overview} = movie;   // so now we can type (title) instead of (movie.title) for example
        if(!poster_path)return;
        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");
        movieEl.innerHTML = `
            <img src="${IMGURL + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h4>Overview</h4>
                ${overview}
            </div>
        `
        main.appendChild(movieEl);
    });
};

form.addEventListener("submit", (e) =>{
    e.preventDefault();
    const searchTerm = search.value;
    if(searchTerm){
        let s = SEARCHAPI + searchTerm;
        getMovies(s);
        search.value = '';
    }
})


function getClassByRate (vote) {
    if(vote>=8)return 'green';
    if(vote>=5)return 'orange';
    return 'red';
}