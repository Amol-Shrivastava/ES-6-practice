// BOOK CLASS : Represents book creation
class Book{
  constructor(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

//STORE CLASS: Handles Storage
class Store{
  static getBooks(){
    let books; //String
    if(localStorage.getItem('books') === null){
      books = [];
    }else{
      books = JSON.parse(localStorage.getItem('books')); //stored it as array of object
    }

    return books;
  }

  static addBooks(book){
    const books = Store.getBooks();

    books.push(book);

    localStorage.setItem('books', JSON.stringify(books))
  }

  static removeBook(isbn) {
     const books = Store.getBooks();

     books.forEach((book, index) => {
       if(book.isbn === isbn) {
         books.splice(index, 1);
       }
     });

     localStorage.setItem('books', JSON.stringify(books));
   }

}


//UI CLASS: Handles UI Tasks

//methods in here are made static to avoid instantiation
class UI{

  static displayBooks(){
    const StoredBooks = Store.getBooks();

    const books = StoredBooks;

    //add books to the list
    books.forEach(b => UI.addBookToList(b));
  }

  //this method is responsible to add a row in the list according to the book passed
  static addBookToList(book){
    const list = document.getElementById('body-list');
    const r1 = document.createElement('tr');

    r1.innerHTML = `
    <td> ${book.title} </td>
    <td> ${book.author} </td>
    <td> ${book.isbn} </td>
    <td><a href='#' class ="btn btn-danger btn-sm delete"> X </a></td>
    `;

    list.appendChild(r1);
  }

  static clearFields(){
    //get filled form information
    document.getElementById('title').value = '' ;
    document.getElementById('author').value = '' ;
    document.getElementById('ISBN').value = '' ;
  }

  static deleteBook(el){
    if(el.classList.contains('delete')){
      el.parentElement.parentElement.remove();
    }
  }

  static showAlert(message, className){
    //build the alert from scratch

    // <div class="alert alert-danger"> whatever the message</div>
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const cont = document.querySelector('.container');
    const form = document.querySelector('#book-form');

    cont.insertBefore(div, form);

    //vanish all the alerts after 3 sec
    setTimeout(()=> document.querySelector('.alert').remove(), 1500);
  }

}

//EVENT: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

//EVENT: Add a book
document.getElementById('book-form').addEventListener('submit', e =>{
  e.preventDefault();

  //get filled form information
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const isbn = document.getElementById('ISBN').value;

  //VALIADATE the details
  if(title === '' || author === '' || isbn === ''){
      UI.showAlert('Please fill all the fields.', 'danger');
  }else{
    //CREATE (instantiate) a new book with these information
    const newBook = new Book(title, author, isbn);
    // console.log(newBook);

    //ADD books to the list
    UI.addBookToList(newBook);

    //ADD books to store
    Store.addBooks(newBook);

    //SHOW success message
    UI.showAlert('Book has been added succesfully', 'success');

    //CLEAR fields of the form
    UI.clearFields();
  }


})

//EVENT: Remove a book
document.getElementById('body-list').addEventListener('click', e=> {
  //REMOVE a book from UI
  UI.deleteBook(e.target);

  UI.showAlert('Book has been removed successfully', 'success');

  //REMOVE books from store
  Store.removeBook(e.target.parentElement.previousElementSibling.innerText);
})
