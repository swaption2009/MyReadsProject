import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './components/BookShelf'
import SearchPage from './components/SearchPage'
import AddBook from './components/AddBook'
import { Route, Link } from 'react-router-dom'

class BooksApp extends Component {
  state = {
    books: [],
  }

  getBooks = () => {
    BooksAPI.getAll()
      .then((books) => {
        this.setState({ books })
        // console.log(this.state.books)
    })
  }

  // grab list of books and set as App state
  componentDidMount() {
    this.getBooks()
  }

  render() {
    return (
      <div>
        <Route path='/search' render={() =>
          <SearchPage books={this.state.books}/>
          }
        />

        <Route path='/books/new'
               component={AddBook}
        />

        <Route exact path='/' render={() => (
          <div className="app">
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <BookShelf books={this.state.books}
                             book_status='currentlyReading'
                             page_title='Currently Reading'
                             getBooks={this.getBooks()}/>

                  <BookShelf books={this.state.books}
                             book_status='wantToRead'
                             page_title='Want to Read' />

                  <BookShelf books={this.state.books}
                             book_status='read'
                             page_title='Read' />
                </div>
              </div>
              <div className="add-book">
                <Link to="/books/new">Add a Book</Link>
              </div>
              <div className="open-search">
                <Link to="/search">Search Books</Link>
              </div>
            </div>
          </div>
          )}
        />
      </div>
    )
  }
}

export default BooksApp
