let addToy = false;
const toyURL = 'http://localhost:3000/toys';
const toyCollection = document.getElementById('toy-collection');
function createEl(el) {
  return document.createElement(el);
}

function getToys() {
  fetch(toyURL)
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
  likeButton.className = 'like-btn';
  likeButton.id = toy.id;
  likeButton.textContent = 'Like';
  card.append(toyName, toyImage, toyLikes, likeButton);
  toyCollection.append(card);
}

function init() {
  starterCode();
  getToys();
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
