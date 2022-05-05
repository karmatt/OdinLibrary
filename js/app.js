"use strict"
import Book from "./book.js"
import Library from "./library.js";
import { createBookCard } from "./card.js";
const addBookBtn = document.querySelector(".header .btn");
const bookGrid = document.querySelector(".library");
const overlay = document.querySelector(".modal-overlay");
const addBookModal = document.querySelector(".add-book-modal");
const titleInput = addBookModal.querySelector(".book-title");
const authorInput = addBookModal.querySelector(".book-author"); 
const pagesInput = addBookModal.querySelector(".book-pages");
const didReadInput = addBookModal.querySelector(".book-read");
const formSubmit = addBookModal.querySelector(".btn[type=submit]");
const library = new Library();

const toggleHidden = (element) => {
  let hidden = (element.dataset.hidden === "true")
  hidden = !hidden;
  element.setAttribute("data-hidden", hidden);
};
const createBook = () => {
  const title = titleInput.value;
  const author = authorInput.value;
  const pages = pagesInput.valueAsNumber;
  const read = didReadInput.checked;
  return new Book(title, author, pages, read);
}
const createLibrary = () => {
  resetGrid();
  library.books.forEach((book, index) => {
    const bookCard = createBookCard(book);
    bookGrid.appendChild(bookCard.card);
    bookCard.removeButton.addEventListener("click", removeBook);
  });
}
const resetGrid = () => {
  while (bookGrid.firstChild) {
    bookGrid.removeChild(bookGrid.firstChild);
  }
}
const clearForm = () => {
  titleInput.value = "";
  authorInput.value = "";
  pagesInput.valueAsNumber = pagesInput.min;
  didReadInput.checked = false;
}
const removeBook = (book) => {
  library.remove(book);
  createLibrary();
}
addBookBtn.addEventListener("click", () => {
  toggleHidden(overlay);
  toggleHidden(addBookModal);
});
overlay.addEventListener("click", () => {
  toggleHidden(overlay);
  toggleHidden(addBookModal);
});
formSubmit.addEventListener("click", (event) => {
  event.preventDefault();
  let newBook = createBook();
  library.add(newBook);
  createLibrary();
  clearForm();
  toggleHidden(overlay);
  toggleHidden(addBookModal);
});

