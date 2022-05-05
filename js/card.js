export const createBookCard = (book) => {
  const card = document.createElement("div");
  const bookTitle = document.createElement("h1");
  const bookAuthor = document.createElement("h3");
  const bookPages = document.createElement("p");
  const buttonGroup = document.createElement("div");
  const readButton = document.createElement("button");
  const removeButton = document.createElement("button");

  card.classList.add("library__book");
  bookTitle.classList.add("book__title");
  bookTitle.innerText = book.title;
  bookAuthor.classList.add("book__author");
  bookAuthor.innerText = book.author;
  bookPages.classList.add("book__pages");
  bookPages.innerText = book.pages === 1 ? `${book.pages} page` : `${book.pages} pages`
  buttonGroup.classList.add("btn-group");
  readButton.classList.add("btn");
  readButton.setAttribute("data-read", book.status);
  readButton.innerText = book.status === true ? "Read" : "Not Read"
  removeButton.classList.add("btn");
  removeButton.classList.add("btn--cta");
  removeButton.innerText = "Remove"
  
  buttonGroup.appendChild(readButton);
  buttonGroup.appendChild(removeButton)
  card.appendChild(bookTitle);
  card.appendChild(bookAuthor);
  card.appendChild(bookPages);
  card.appendChild(buttonGroup);

  readButton.addEventListener("click", () => {
    book.status = !book.status
    readButton.setAttribute("data-read", book.status)
    readButton.innerText = book.status === true ? "Read" : "Not Read"
  });
  return { card, removeButton };
};