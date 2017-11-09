import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ShelfSelector from './ShelfSelector'

class BookShelf extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    book_status: PropTypes.string.isRequired,
    page_title: PropTypes.string.isRequired
  }

  render() {
    const { books, book_status, page_title } = this.props

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{page_title}</h2>
        <div className="bookshelf-books">
          <ol className='books-grid'>
            {books.filter(book => book.shelf === book_status)
              .map(book =>
                <li key={book.id}>
                  <div className="book">
                    <div className="book-top">
                      <img className="book-cover"
                           style={{width: 128, height: 193}}
                           src={book.imageLinks.thumbnail}
                           alt={'{book.title}'} />
                      <div className="book-shelf-changer">
                        <ShelfSelector book={book}
                                       getBooks={this.getBooks} />
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