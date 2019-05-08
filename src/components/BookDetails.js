import React, { Component } from "react"
import { graphql } from 'react-apollo'

// Queries
import { getBookQuery } from '../queries/queries'

class BookDetails extends Component {
  
  displayBookDetails = () => {
    const { book } = this.props.data
    
    if (book) {
      return (
        <div>
          <h3>{book.name}</h3>
          <p>{book.genre}</p>
          <p>{book.author.name}</p>
          <p>All books by this author:</p>
          <ul className="other-books">
            {
              book.author.books.map(book => (
                <li key={book.id}>{book.name}</li>
              ))
            }
          </ul>
        </div>
      )
    }
    else {
      return (
        <div>No book selected</div>
      )
    }
  }
  
  render() {
    return (
      <div id="book-details">
        { this.displayBookDetails() }
      </div>
    )
  }
}

export default graphql(getBookQuery, {
  options: (props) => {
    return {
      variables: {
        id: props.bookId
      }
    }
  }
})(BookDetails)