import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './components/BookShelf'
import SearchPage from './components/SearchPage'
import { Route, Link } from 'react-router-dom'

class BooksApp extends Component {
  state = {
    books: [],
  }

  getBooks = () => {
    BooksAPI.getAll()
      .then((books) => {
        this.setState({ books })
    })
  }

  updateShelf = (book, shelf) => {
    // console.log('book shelf updated')
    BooksAPI.update(book, shelf).then(() => {
      book.shelf = shelf
      this.setState(state => ({
        books: state.books.filter(b=> b.id !== book.id).concat([book])
      }))
    })
  }

  componentDidMount() {
    this.getBooks()
  }

  render() {
    return (
      <div>
        <Route path='/search' render={() =>
          <SearchPage books={this.state.books}
                      updateShelf={this.updateShelf}/>
          }
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
                             updateShelf={this.updateShelf} />

                  <BookShelf books={this.state.books}
                             book_status='wantToRead'
                             page_title='Want to Read'
                             updateShelf={this.updateShelf} />

                  <BookShelf books={this.state.books}
                             book_status='read'
                             page_title='Read'
                             updateShelf={this.updateShelf} />
                </div>
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
