import React, { Component } from 'react'

class ShelfSelector extends Component {
  handleChange = (book, shelf) => {
    this.props.updateShelf(book, shelf)
  }

  render() {
    const { book } = this.props

    return (
      <div>
        <select value={book.shelf}
                onChange={(e) => this.handleChange(book, e.target.value)}>
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