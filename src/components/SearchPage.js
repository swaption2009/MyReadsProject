import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import ShelfSelector from './ShelfSelector'
import * as BooksAPI from '../BooksAPI'
import { DebounceInput } from 'react-debounce-input'

class SearchPage extends Component {
  state = {
    new_books: [],
    query: ''
  }

  updateQuery = (query) => {
    this.setState({
      query: query
    })
    this.searchNewBook(query, 20)
  }

  clearQuery = () => {
    this.setState({
      query: ''
    })
  }

  searchNewBook = (query, maxResults = 20) => {
    if (query) {
      BooksAPI.search(query, maxResults)
        .then((books) => {
          this.setState({new_books: books})
        })
    } else {
      console.log("Query is null")
    }
  }

  setNewBookShelf = (books, new_books) => {
    new_books.filter(new_book => {
      new_book.shelf = 'none'
      books.forEach(book => {
        if (book.title === new_book.title) {
          new_book.shelf = book.shelf
        }
      })
    })
    console.log('book shelf updated')
  }

  refreshPage = () => {
    window.location.reload()
  }

  render() {
    const { books } = this.props
    const { query, new_books } = this.state
    let showingBooks

    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      showingBooks = new_books.filter((book) => match.test(book.title) || match.test(book.authors))
      this.setNewBookShelf(books, new_books)
      showingBooks.sort(sortBy('name'))
    } else {
      showingBooks = new_books
    }

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link onClick={this.refreshPage} to='/'
                className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <DebounceInput type="text"
                            placeholder="Search by title or author"
                            value={query}
                            onChange={(event) => this.updateQuery(event.target.value)}
                            minLength={3}
                            debounceTimeout={300} />
          </div>
          <button onClick={this.clearQuery}>clear query</button>
        </div>

        <div className="search-books-results">
          <ol className='books-grid'>
            {showingBooks.map(book =>
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <img className="book-cover"
                         style={{width: 128, height: 193}}
                         src={book.imageLinks.thumbnail}
                         alt={'{book.title}'} />
                    <div className="book-shelf-changer">
                      <ShelfSelector book={book}
                                     updateShelf={this.props.updateShelf} />
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{book.authors && book.authors.join(', ')}</div>
                </div>
              </li>
            )}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchPage