class Library {
  constructor() {
    this.books = [];
  }
  remove(book) {
    if (this.books.length == 0) { return; }
    const removedBook = this.books.indexOf(book);
    this.books.splice(removedBook, 1);
  }
  add(book) {
    if (!this.isBookAlreadyAdded()) { this.books.push(book); }
  }
  isBookAlreadyAdded(newBook) {
    return this.books.some((book) => book.title === newBook.title);
  }
}
class Book {
  constructor(title, author, numberOfPages, status) {
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.status = status;
  }
}