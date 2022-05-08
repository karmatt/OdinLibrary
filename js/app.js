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
const addBookForm = addBookModal.querySelector(".modal__form");
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
  library.books.forEach(book => {
    const bookCard = createBookCard(book);
    bookGrid.appendChild(bookCard.card);
    bookCard.readButton.addEventListener("click", (event) => {
      book.status = !book.status;
      event.target.setAttribute("data-read", book.status);
      event.target.innerText = book.status === true ? "Read" : "Not Read"
      saveLibrary();

    });
    bookCard.removeButton.addEventListener("click", removeBook);
  });
}
const resetGrid = () => {
  while (bookGrid.firstChild) {
    bookGrid.removeChild(bookGrid.firstChild);
  }
}
const clearForm = () => {
  addBookForm.reset();
}
const removeBook = (book) => {
  library.remove(book);
  saveLibrary()
  createLibrary();
}
const saveLibrary = () => {
  if (localStorage.getItem("library") !== null) { 
    localStorage.setItem("library", JSON.stringify(library.books)); 
  }
}
const restoreLibrary = () => {
  if (localStorage.getItem("library") !== null) {
    const object = localStorage.getItem("library");
    const books = JSON.parse(object)
    library.books = books.map(book => { return new Book(book.title, book.author, book.pages, book.status); })
    createLibrary()
  } else {
    createLibrary()
  }
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
  saveLibrary()
  createLibrary();
  clearForm();
  toggleHidden(overlay);
  toggleHidden(addBookModal);
});
restoreLibrary();