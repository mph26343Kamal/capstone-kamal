async function getCardlist(articalURL) {
  let articleData = [];
  try {
    const response = await fetch(articalURL);
    const jsonData = await response.json();
    const articles = jsonData.data.filter((data) => data.path.startsWith('/magazine/'));
    articleData = articles;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching JSON:', error);
  }
  return articleData;
}

export default async function decorate(block) {
  const articles = block.querySelector('a[href$=".json"]');
  const articleURL = articles.href;
  const articleData = await getCardlist(articleURL);

  const ul = document.createElement('ul');
  ul.className = 'card-list';

  articleData.forEach((item) => {
    const li = document.createElement('li');
    li.className = 'card';

    const link = document.createElement('a');
    link.href = item.path;
    link.className = 'card-link';

    const img = document.createElement('img');
    img.src = item.image;
    img.alt = item.title;
    link.appendChild(img);

    const title = document.createElement('h3');
    title.textContent = item.title;
    link.appendChild(title);

    const description = document.createElement('p');
    description.textContent = item.description.length > 100
      ? `${item.description.substring(0, 100)}...`
      : item.description;
    link.appendChild(description);

    li.appendChild(link);
    ul.appendChild(li);
  });

  block.textContent = '';
  block.appendChild(ul);
}
