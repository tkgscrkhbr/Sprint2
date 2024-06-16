'use strict'

var gFilter

function onInit() {
    renderGallery()
    renderSavedImgs()
    renderGalleryFilterDatalist()
    renderFonts()
}

function renderGallery() {
    var imgs = getImgs(gFilter)
    var strHTML = imgs.map(img =>
        `<img class='meme-img' src='${img.url}'></img>`
    )
    const elGallery = document.querySelector('.images-container')
    elGallery.innerHTML = strHTML.join('')
    addImageEventListeners(imgs)
}

function renderSavedImgs() {
    var imgs = getSavedImgs()
    if (!imgs) return
    var strHTML = imgs.map(img =>
        `<img class='saved-img meme-img' src='${img.url}'></img>`
    )
    const elSavedGallery = document.querySelector('.saved-memes-container')
    elSavedGallery.innerHTML = strHTML.join('')
    addImageEventListeners(imgs, true)
}

function renderGalleryFilterDatalist() {
    var imgs = getImgs()
    const uniqueKeywords = [...new Set(imgs.flatMap(img => img.keywords))];
    var strHTML = uniqueKeywords.map(keyword =>
        `<option value="${keyword}"></option>`
    )
    document.querySelector('.gallery-filter-datalist').innerHTML = strHTML.join('')
}

function addImageEventListeners(imgs, saved = false) {
    var imgList = saved ? document.querySelectorAll('.saved-img') : document.querySelectorAll('.meme-img');
    imgList.forEach((img, idx) => {
        var url = saved ? imgs[idx].cleanImgUrl : imgs[idx].url;
        img.addEventListener('click', function () {
            renderPage('meme-editor')
            renderCanvas(url, false, saved, imgs[idx].lines)
            changeSelectedMeme(imgs[idx].id)
        })
    })
}





function onFlexible() {
    const imgs = getImgs()
    const randImg = getRandomInt(0, imgs.length)
    renderPage('meme-editor')
    changeSelectedMeme(imgs[randImg].id)
    renderCanvas(imgs[randImg].url, true)
}

function renderPage(elPage) {
    const pageValue = elPage.toLowerCase()
    const pageToRender = document.querySelector(`.${pageValue}`)
    const allPages = document.querySelectorAll('.page')
    for (var i = 0; i < allPages.length; i++) {
        allPages[i].style.display = 'none'
    }
    pageToRender.style.display = 'block'
    if (pageValue !== 'meme-editor') {
        document.querySelector('.meme-edit-container').style.display = 'none'
        document.querySelector('.line-text').value = ''
        document.querySelector('.font-family-select').selectedIndex = 0
        updateToDefault()
    }
}

function onFilter(value) {
    gFilter = value
    getImgs(value)
    renderGallery()
}

function onClearFilter() {
    document.querySelector('.search-input').value = ''
    gFilter = ''
    renderGallery()
}
