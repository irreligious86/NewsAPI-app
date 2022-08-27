const newsStorage = window.localStorage;
const cardPlaceholder = document.querySelector('.card-placeholder');
let newsServerLink = "https://newsapi.org/v2/top-headlines?country=ua&apiKey=c72e232594004f868b23074156aa6ec8";

localStorage.clear();

const updateLocalStorage = (key, value) => {
    localStorage.setItem(key, value);
    console.log(localStorage.getItem(key));
}

const checkCyrillic = (str) => {
    return str.split('').map(i => i.charCodeAt()).filter(i => i > 1040 && i < 1103).length > 3;
}

const cardBuilder = (obj) => {
    const newCard = document.createElement('div');
    newCard.classList.add('card');
    const cardTitle = document.createElement('h3');
    cardTitle.classList.add('card-title');
    cardTitle.innerText = obj.title;
    const cardLink = document.createElement('a');
    cardLink.classList.add('card-link');
    cardLink.href = obj.url;
    cardLink.target = "_blank";
    const cardImg = document.createElement('img');
    cardImg.classList.add('card-image');
    cardImg.src = obj.urlToImage;
    const cardSubtitle = document.createElement('h4');
    cardSubtitle.classList.add('card-subtitle');
    cardSubtitle.innerText = `${obj.author}\n ${obj.publishedAt}`;
    const cardDescription = document.createElement('p');
    cardDescription.classList.add('card-description');
    cardDescription.innerText = obj.description;

    if (obj.author && obj.publishedAt && obj.urlToImage) {
        cardPlaceholder.append(newCard);
        newCard.append(cardSubtitle);
        newCard.append(cardImg);
        newCard.append(cardLink);
        cardLink.append(cardTitle);
        newCard.append(cardDescription);
    }
}

const renderAllNews = (data) => {
    // console.log(data.articles.slice(0, 31));
    data.articles
        .slice(0, 200)
        .filter(obj => checkCyrillic(obj.title))
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
            console.log(res.articles);
            // localStorage.setItem('res', 12345);
            return res;
        })
        .then(res => renderAllNews(res))
        .catch(error => console.log('ERROR', error));
}

getFetchData(newsServerLink);

console.log(newsStorage);

console.log(localStorage.getItem('res'));

const modalWindowCreator = (data, func, parent) => {
    const modalWindow = document.createElement('div');
    modalWindow.classList.add('modal-window');
    parent.prepend(modalWindow);

    const cancelBtn = document.createElement('button');
    modalWindow.append(cancelBtn);
    cancelBtn.classList.add('cancel-btn');
    document.createTextNode('Cancel');

    const applyBtn = document.createElement('button');
    modalWindow.append(applyBtn);
    applyBtn.classList.add('apply-btn');
    document.createTextNode('Apply');

    cancelBtn.addEventListener('click', )

    applyBtn.addEventListener('click', )
}
