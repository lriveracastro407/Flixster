//Global Constants
/* HTML to JS connectors */
const movieForm = document.querySelector('form')
const movieArea = document.querySelector('#movie-area')
const loadButton = document.querySelector('#loader')
const searchinput = document.querySelector('#searchinput')
const searchForm = document.querySelector('#searchform')
const clearbutton = document.querySelector('#clear')

/** API variables */
const api_key = '765ece2c111fb5c30abfeb28d365ac2c'
var pageNum = 1
var whichload

//Load Popular Movies
async function popMovies() {
    whichload = 0 //loadbutton uses popMovies
    const response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=' + api_key + '&language=en-US&page=' + pageNum)
    const responseData =  await response.json()
    getMovieinfo(responseData)
}
//Search movies
async function searchMovies(input) {
    const searchRes = await fetch('https://api.themoviedb.org/3/search/movie?api_key=' + api_key + '&language=en-US&query=' + input +'&page=' + pageNum + '&include_adult=false')
    const searchData = await searchRes.json()
    return searchData
}
//Grabs movie information from API
function getMovieinfo(data) {
    data.results.forEach(movie => {
        let title = movie.title
        let rating = movie.vote_average
        let poster = 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/' + movie.poster_path
        addMovies(title, rating, poster)
    });
}
function addMovies(title, rating, poster) {
    movieArea.innerHTML += `
    <div class='movies'> 
    <img src=${poster} width=200px alt=${title}>
    <div class='tr'>
        <p>${title}</p>
        <p id='rating'>${rating}</p>
    </div>
    </div>
    `
}
async function loadMore(event) {
    event.preventDefault()
    pageNum++
    if (whichload == 0) {
        popMovies()
    } else {
        const result = await searchMovies(currSearch)
        getMovieinfo(result)
    }
    
}
async function handleFormSubmit(event) {
    event.preventDefault()
    movieArea.innerHTML = ''
    currSearch = searchinput.value
    pageNum = 1
    whichload = 1 //loadbutton loads search
    const result = await searchMovies(currSearch)
    getMovieinfo(result)
    searchinput.value = ''

    
}

async function homescreen() {
    movieArea.innerHTML = ''
    pageNum = 1
    popMovies() 

}

clearbutton.addEventListener('click', homescreen)
loadButton.addEventListener('click', loadMore)
searchForm.addEventListener('submit', handleFormSubmit)
popMovies()

