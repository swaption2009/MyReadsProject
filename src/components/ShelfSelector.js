import React, { Component } from 'react'
import * as BooksAPI from '../BooksAPI'

class ShelfSelector extends Component {
  handleChange(book, event) {
    BooksAPI.update(book, event.target.value)
      .then(console.log('books updated'))
      .then(() => {BooksAPI.getAll()})
      .then(() => this.getBooks)
      .then(() => window.alert("book shelf has been updated"))
  }

  render() {
    const { book } = this.props

    return (
      <div>
        <select value={book.shelf}
                onChange={(e) => this.handleChange(book, e)}>
          <option value="none" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
        </select>
      </div>
    )
  }
}

export default ShelfSelector