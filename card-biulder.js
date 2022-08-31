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