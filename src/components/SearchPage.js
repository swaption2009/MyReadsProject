import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import ShelfSelector from './ShelfSelector'
import * as BooksAPI from '../BooksAPI'

class SearchPage extends Component {
  state = {
    new_books: [],
    query: ''
  }

  updateQuery = (query) => {
    this.setState({
      query: query.trim()
    })
    this.searchNewBook(query, 10)
  }

  // TODO fix maxResults
  searchNewBook = (query, maxResults = 10) => {
    // console.log('book shelf updated')
    BooksAPI.search(query, maxResults)
      .then((books) => {
        // console.log('result:', books)
        this.setState({new_books: books})
    })
  }


  render() {
    const { query } = this.state

    let showingBooks

    // TODO fix error when query is null
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      showingBooks = this.state.new_books.filter((book) => match.test(book.title) || match.test(book.authors))
    } else {
      showingBooks = this.state.new_books
    }

    showingBooks.sort(sortBy('name'))

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input type="text"
                   placeholder="Search by title or author"
                   value={query}
                   onChange={(event) => this.updateQuery(event.target.value)}/>

          </div>
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
                        <ShelfSelector book={book} />
                      </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors}</div>
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