const cardPlaceholder = document.querySelector('.card-placeholder');
let dataArticles = [];

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

function checkCyrillic(str) {
    return str.split('').map(i => i.charCodeAt()).filter(i => i > 1040 && i < 1103).length > 3;
}

function renderCurrentNews(data) {
  data
  .slice(0, 200)
  .filter(obj => checkCyrillic(obj.title))
  .forEach(item => cardBuilder(item));
}

const newPostCreator = () => {
  const addNewPostModal = document.createElement('div');
  document.body.prepend(addNewPostModal);
  addNewPostModal.classList.add('add-new-post-modal');

  const subtitleInput = document.createElement('input');
  subtitleInput.classList.add('new-post-creator-input');
  addNewPostModal.append(subtitleInput);
  subtitleInput.placeholder = 'Subtitle text';

  const imgInput = document.createElement('input');
  imgInput.classList.add('new-post-creator-input');
  addNewPostModal.append(imgInput);
  imgInput.placeholder = 'Image link';

  const titleInput = document.createElement('input');
  titleInput.classList.add('new-post-creator-input');
  addNewPostModal.append(titleInput);
  titleInput.placeholder = 'Title link';

  const descriptionInput = document.createElement('input');
  descriptionInput.classList.add('new-post-creator-input');
  addNewPostModal.append(descriptionInput);
  descriptionInput.placeholder = 'Description text';

  const cancelBtn = document.createElement('button');
  cancelBtn.append(document.createTextNode('Cancel'));
  cancelBtn.classList.add('cancel-btn');
  addNewPostModal.append(cancelBtn);

  const applyBtn = document.createElement('button');
  applyBtn.append(document.createTextNode('Apply'));
  applyBtn.classList.add('apply-btn');
  addNewPostModal.append(applyBtn);

  cancelBtn.addEventListener('click', () => {
    addNewPostModal.remove();
  });

  applyBtn.addEventListener('click', () => {
    const newPost = {};
    newPost.author = subtitleInput.value;
    newPost.urlToImage = imgInput.value;
    newPost.title = titleInput.value;
    newPost.description = descriptionInput.value;
    dataArticles.unshift(newPost);
    console.log(dataArticles);
    addNewPostModal.remove();
    // document.location.reload();
    renderCurrentNews(dataArticles);
    dataArticles.forEach(i => carsdBuilder(i));
  });
};

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
          dataArticles = data.articles;
          renderCurrentNews(dataArticles);
        })
        .catch(error => console.log('ERROR', error));

document.querySelector('.reload-btn').addEventListener('click', () => {
  document.location.reload();
});

document.querySelector('.new-add-btn').addEventListener('click', newPostCreator);
