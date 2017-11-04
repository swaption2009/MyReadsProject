import React, { Component } from 'react'
import PropTypes from 'prop-types'

class BookShelf extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    book_status: PropTypes.string.isRequired,
    page_title: PropTypes.string.isRequired
  }

  render() {
    const { books, book_status, page_title } = this.props
    // {console.log('bookshelf', books)}

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{page_title}</h2>
        <div className="bookshelf-books">
          <ol className='books-grid'>
            {books.filter(book => book.shelf === book_status)
              .map(book =>
                <li key={book.title}>
                  <div className="book">
                    <div className="book-top">
                      <img className="book-cover"
                           style={{width: 128, height: 193}}
                           src={book.imageLinks.thumbnail}
                           alt={'{book.title}'} />
                      <div className="book-shelf-changer">
                        {/*TODO update setState book.shelf*/}
                        <select>
                          <option value="none" disabled>Move to...</option>
                          <option value="currentlyReading">Currently Reading</option>
                          <option value="wantToRead">Want to Read</option>
                          <option value="read">Read</option>
                          <option value="none">None</option>
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

export default BookShelf