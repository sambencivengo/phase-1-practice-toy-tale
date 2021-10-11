let addToy = false;
const toyURL = 'http://localhost:3000/toys';
const toyCollection = document.getElementById('toy-collection');
function createEl(el) {
  return document.createElement(el);
}

function getToys(url) {
  fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      data.forEach((toy) => createToyCard(toy));
    });
}

function createToyCard(toy) {
  const card = createEl('div');
  card.className = 'card';
  const toyName = createEl('h2');
  toyName.textContent = toy.name;
  const toyImage = createEl('img');
  toyImage.src = toy.image;
  toyImage.className = 'toy-avatar';
  let toyLikes = createEl('p');
  toyLikes = toy.likes;
  const likeButton = createEl('button');
  console.log(toy.likes);
  // patch request
  likeButton.addEventListener('click', () => {
    toy.likes++;
    fetch('http://localhost:3000/toys/:id', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        likes: toy.likes,
      }),
    });
    console.log('Like Button: clicked!');
  });
  //
  likeButton.className = 'like-btn';
  likeButton.id = toy.id;
  likeButton.textContent = 'Like';

  card.append(toyName, toyImage, toyLikes, likeButton);
  toyCollection.append(card);
}

const submitToyForm = document.querySelector('form');
const submitToyName = submitToyForm[0];
const submitToyImage = submitToyForm[1];

submitToyForm.addEventListener('submit', (e) => {
  e.preventDefault();
  postToy();
});

// LIKE BUTTON AND COUNTER
// const likeButton = document.getElementsByClassName('li?ke-btn');

function postToy() {
  fetch(toyURL, {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      name: submitToyName.value,
      image: submitToyImage.value,
      likes: 0,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      createToyCard(data);
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

function init() {
  starterCode();
  getToys(toyURL);
}

function starterCode() {
  const addBtn = document.querySelector('#new-toy-btn');
  const toyFormContainer = document.querySelector('.container');
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = 'block';
    } else {
      toyFormContainer.style.display = 'none';
    }
  });
}

document.addEventListener('DOMContentLoaded', init);
