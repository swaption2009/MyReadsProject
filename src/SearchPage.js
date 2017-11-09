import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class SearchPage extends Component {
  state = {
    query: ''
  }

  updateQuery = (query) => {
    this.setState({
      query: query.trim()
    })
    // console.log(query)
  }

  clearQuery = () => {
    this.setState({ query: '' })
  }

  render() {
    const { books } = this.props
    const { query } = this.state

    let showingBooks

    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      showingBooks = books.filter((book) => match.test(book.authors[0]) || match.test(book.title))
      // console.log('showingBooks', showingBooks)
    } else {
      showingBooks = books
    }

    showingBooks.sort(sortBy('name'))

    // console.log('inside SearchPage component', books);

    // TODO implement book shelf change inside Search page
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
                        <select value={book.shelf}
                                onChange={(e) => this.handleChange(book, e)}>
                          <option value="none" disabled>Move to...</option>
                          <option value="currentlyReading">Currently Reading</option>
                          <option value="wantToRead">Want to Read</option>
                          <option value="read">Read</option>
                        </select>
                      </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors[0]}</div>
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