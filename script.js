const cardPlaceholder = document.querySelector('.card-placeholder');

const cardBuilder = obj => {
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
};

// http://universities.hipolabs.com/search?country=United+States
// console.log('thdhфуафуауаї 454кпуп ыы'.split('').filter(i => i.charCodeAt(0) > 1040 && i.charCodeAt(0) < 1103));

function checkCyrillic(str) {
    return str.split('').map(i => i.charCodeAt()).filter(i => i > 1040 && i < 1103).length > 3;
}

    fetch("https://newsapi.org/v2/top-headlines?country=ua&apiKey=c72e232594004f868b23074156aa6ec8")
        .then(res => {
            if ( res.ok ) {
                return res.json();
            } else {
                console.log('ERROR');
                throw Error;
            }
        })
        .then(data => {
            console.log(data.articles.slice(0, 30));
            // console.log(JSON.stringify(data));
            data.articles
                .slice(0, 200)
                .filter(obj => checkCyrillic(obj.title))
                .forEach(item => cardBuilder(item));
        })
        .catch(error => console.log('ERROR', error));
