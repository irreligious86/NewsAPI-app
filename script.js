const newsStorage = window.localStorage;
const reloadBtn = document.querySelector('.reload-btn');
const createPostBtn = document.querySelector('.create-post-btn');
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
            return res;
        })
        .then(res => renderAllNews(res))
        .catch(error => console.log('ERROR', error));
}

getFetchData(newsServerLink);

// console.log(newsStorage);
// console.log(localStorage.getItem('res'));

const modalWindowCreator = () => {
    const modalWindow = document.createElement('div');
    modalWindow.classList.add('modal-window');
    document.body.prepend(modalWindow);

    const titleInput = document.createElement('input');
    titleInput.classList.add('modal-input');
    
    titleInput.placeholder = 'Type title text here';

    const authorInput = document.createElement('input');
    authorInput.classList.add('modal-input');
    authorInput.placeholder = 'Type author here';

    const imgInput = document.createElement('textarea');
    imgInput.classList.add('modal-input');
    imgInput.placeholder = 'Type image link here';

    const sourceLinkInput = document.createElement('textarea');
    sourceLinkInput.classList.add('modal-input');
    sourceLinkInput.placeholder = 'Type source link here';

    const descriptionInput = document.createElement('textarea');
    descriptionInput.classList.add('modal-input');
    descriptionInput.placeholder = 'Type source link here';

    modalWindow.append(titleInput);
    modalWindow.append(authorInput);
    modalWindow.append(imgInput);
    modalWindow.append(sourceLinkInput);
    modalWindow.append(descriptionInput);

    const cancelBtn = document.createElement('button');
    modalWindow.append(cancelBtn);
    cancelBtn.classList.add('cancel-btn');
    cancelBtn.append(document.createTextNode('Cancel'));

    const applyBtn = document.createElement('button');
    modalWindow.append(applyBtn);
    applyBtn.classList.add('apply-btn');
    applyBtn.append(document.createTextNode('Apply'));

    const cancelBtnHandler = () => modalWindow.remove();
    const applyBtnHandler = () => {
      alert('appply');
      const newPostData = {};
      newPostData.title = titleInput.value;
      newPostData.author = authorInput.value;
      newPostData.publishedAt = 'unknown date';
      newPostData.urlToImage = imgInput.value;
      newPostData.url = sourceLinkInput.value;
      newPostData.description = descriptionInput.value;

      console.log(newPostData);
    };

    cancelBtn.addEventListener('click', cancelBtnHandler);
    applyBtn.addEventListener('click', applyBtnHandler);
}

const createPostBtnHandler = () => {
  modalWindowCreator();
};

reloadBtn.addEventListener('click', () => document.location.reload());
createPostBtn.addEventListener('click', createPostBtnHandler);