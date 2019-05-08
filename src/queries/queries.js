import { gql } from 'apollo-boost'

// Get ALL books
export const getBooksQuery = gql`
  query {
    books {
      name
      id
    }
  }
`

// Get a single book
export const getBookQuery = gql`
  query($id: ID) {
    book(id: $id) {
      id
      name
      genre
      author {
        id
        name
        age
        books {
          name 
          id
        }
      }
    }
  }
`

// Get ALL authors
export const getAuthorsQuery = gql`
  query {
    authors {
      name
      id
    }
  }
`

// Add a single book
export const addBookMutation = gql`
  mutation($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name 
      id
    }
  }
`