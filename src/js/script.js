import API from './api';

// ? 1. Adaugam axios
// ? 2. adaugam paginare
// ? 3. adaugam clase pt api si paginare

const form = document.getElementById('form');

// * eventListener care adauga articole
form.addEventListener('submit', onSubmit);

// * functie care apeleaza api
function onSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const inputValue = form.elements.news.value;
  API.getNews(inputValue)
    .then(res => {
      const { articles } = res;
      if (articles.length === 0) throw new Error('Nu exista nici un articol');

      return articles.reduce((markup, article) => {
        return createMarkup(article) + markup;
      }, '');
    })
    .then(markup => updateNewsList(markup))
    .catch(err => onError(err))
    .finally(() => form.reset());
}

// * functie care creeaza html ce urmeaza sa fie introdus in pagina
function createMarkup({ author, title, description, url, urlToImage }) {
  return `
        <div class="article-card">
            <img src=${urlToImage} class="article-img">
            <h2 class="article-title">${title}</h2>
            <h3 class="article-author">${author || 'Anonym'}</h3>
            <p class="article-description">${description}</p>
            <a href=${url} class="article-link" target="_blank">Read more</a>
        </div>
        
        `;
}

// * functie ce introduce html in pagina
function updateNewsList(markup) {
  document
    .getElementById('articlesWrapper')
    .insertAdjacentHTML('beforeend', markup);
}

// * functie error
function onError(err) {
  console.error(err);
  updateNewsList('<p>Articles not found</p>');
}
