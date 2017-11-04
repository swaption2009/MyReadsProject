import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'
import SearchPage from './SearchPage'
import AddBook from './AddBook'

class BooksApp extends Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],
    showSearchPage: false,
    showAddBookPage: false
  }

  // grab list of books and set as App state
  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState({ books })
        // console.log(this.state.books)
    })
  }

  // a toggle function to change the state to open Search page
  toggleShowSearchPage = () => {
    this.setState({
      showSearchPage: !this.state.showSearchPage
    })
    // console.log(this.state.showSearchPage)
  }

  // a toggle function to change state to open Add Book page
  toggleShowAddBookPage  = () => {
    this.setState({
      showAddBookPage: !this.state.showAddBookPage
    })
    // console.log(this.state.showAddBookPage)
  }

  render() {
    // TODO implement React Router to open AddBook component
    if (this.state.showAddBookPage) {
      return (
        <div>
          <AddBook/>
        </div>
      )
    }

    // TODO implement React Router to open SearchBook component
    if (this.state.showSearchPage) {
      return (
        <div>
          <SearchPage/>
        </div>
      )
    }

    return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <BookShelf books={this.state.books}
                         book_status='currentlyReading'
                         page_title='Currently Reading' />

              <BookShelf books={this.state.books}
                         book_status='wantToRead'
                         page_title='Want to Read' />

              <BookShelf books={this.state.books}
                         book_status='read'
                         page_title='Read' />
            </div>
          </div>
          <div className="add-book">
            <a onClick={this.toggleShowAddBookPage}>Add a book</a>
          </div>
          <div className="open-search">
            <a onClick={this.toggleShowSearchPage}>Search books</a>
          </div>
        </div>
    </div>
    )
  }
}

export default BooksApp
