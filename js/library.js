export default class Library {
  constructor() {
    this.books = [];
  }
  #isEmpty = this.books.length === 0
  remove(book) {
    if (this.#isEmpty) { return; }
    const removedBook = this.books.indexOf(book);
    this.books.splice(removedBook, 1);
  }
  add(book) {
    if (!this.isBookAlreadyAdded(book)) {
      this.books.push(book);
    }
  }
  isBookAlreadyAdded(newBook) {
    return this.books.some((book) => book.title === newBook.title && book.author === newBook.author);
  }
  
}
