import React, { Component } from "react"
import { graphql, compose } from 'react-apollo'

// Queries
import { getAuthorsQuery, getBooksQuery } from '../queries/queries'
import { addBookMutation } from '../queries/queries'

class AddBook extends Component {
  state = {
    bookName: '',
    genre: '',
    authorId: ''
  }

  displayAuthors = () => {
    let data = this.props.getAuthorsQuery
    if (data.loading === true) {
      return (
        <option>Authors loading...</option>
      )
    }
    else {
      return data.authors.map(author => (
        <option key={author.id} value={author.id}>
          {author.name}
        </option>
      ))
    }
  }

  submitForm = (e) => {
    e.preventDefault()
    this.props.addBookMutation({
      variables: {
        name: this.state.bookName,
        genre: this.state.genre,
        authorId: this.state.authorId
      },
      refetchQueries: [{ query: getBooksQuery }]
    })
  }

  render() {
    return (
      <form id="add-book" onSubmit={this.submitForm.bind(this)}>
        <div className="field">
          <label>Book name:</label>
          <input
            type="text"
            onChange={(e) => this.setState({ bookName: e.target.value })}
          />
        </div>

        <div className="field">
          <label>Genre:</label>
          <input
            type="text"
            onChange={(e) => this.setState({ genre: e.target.value })}
          />
        </div>

        <div className="field">
          <label>Author:</label>
          <select onChange={(e) => this.setState({ authorId: e.target.value })}>
            <option>Select author</option>
            { this.displayAuthors() }
          </select>
        </div>

        <button type="submit">+</button>
      </form>
    )
  }
}

export default compose(
  graphql(getAuthorsQuery, { name: 'getAuthorsQuery' }),
  graphql(addBookMutation, { name: 'addBookMutation' })
)(AddBook)