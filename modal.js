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
        const defVals = {
            'defTitle': 'JavaScript self-education',
            'defImg': 'https://mate-academy-images.s3.eu-central-1.amazonaws.com/64047cd018874286835b923a562f903d.png',
            'defUrl': 'https://learn.javascript.ru/',
            'defDescr': 'JavaScript — мультипарадигменный язык программирования. Поддерживает объектно-ориентированный, императивный и функциональный стили. Является реализацией спецификации ECMAScript. ',
            'defPublished': 'unknown date',
            'defAuthor': 'unknown author',
        };
        const newPostData = {};
        newPostData.title = titleInput.value || defVals.defTitle;
        newPostData.author = authorInput.value || defVals.defAuthor;
        newPostData.urlToImage = imgInput.value || defVals.defImg;
        newPostData.url = sourceLinkInput.value || defVals.defUrl;
        newPostData.publishedAt = defVals.defPublished;
        newPostData.description = descriptionInput.value || defVals.defDescr;

        modalWindow.remove();
        const tempData = JSON.parse(localStorage.getItem('articles'));
        tempData.unshift(newPostData);
        localStorage.setItem('articles', JSON.stringify(tempData));

        console.log( JSON.parse(localStorage.getItem('articles')) );
        console.log( localStorage );
        renderAllNews(localStorage);
    };

    cancelBtn.addEventListener('click', cancelBtnHandler);
    applyBtn.addEventListener('click', applyBtnHandler);
}