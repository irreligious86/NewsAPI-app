let newsStorage = window.localStorage;
const reloadBtn = document.querySelector('.reload-btn');
const clrLsBtn = document.querySelector('.clear-ls-btn');
const createPostBtn = document.querySelector('.create-post-btn');
const cardPlaceholder = document.querySelector('.card-placeholder');

let newsServerLink = "https://newsapi.org/v2/top-headlines?country=ua&apiKey=c72e232594004f868b23074156aa6ec8";

const updateLocalStorage = (key, value) => {
    localStorage.setItem(key, value);
    // console.log(localStorage.getItem(key));
}

const checkCyrillic = (str) => {
    return str.split('').map(i => i.charCodeAt()).filter(i => i > 1040 && i < 1103).length > 3;
}

const renderAllNews = (data) => {
    JSON.parse(localStorage.getItem('articles'))
        .slice(0, 200)
        // .filter(obj => checkCyrillic(obj.title))
        .forEach(item => cardBuilder(item));
}

const getFetchData = (url) => {
    fetch(url)
        .then(res => {
            if ( res.ok ) {
                return res.json();
            } else {
                console.log('ERROR');
                throw Error;
            }
        })
        .then(res => {
            // console.log(JSON.stringify(res.articles));
            return res;
        })
        .then(res => updateLocalStorage('articles', JSON.stringify(res.articles)))
        .catch(error => console.log('ERROR', error));
}

const createPostBtnHandler = () => {
  const newPost = modalWindowCreator();
}

getFetchData(newsServerLink);

renderAllNews(localStorage);

reloadBtn.addEventListener('click', () => document.location.reload());
clrLsBtn.addEventListener('click', () => localStorage.clear());
createPostBtn.addEventListener('click', createPostBtnHandler);
