import { useEffect, useState } from 'react';
import BookCard from '../components/BookCard';
import { book } from '../types';
import { useAuth0 } from '@auth0/auth0-react';
import { BookListStyle } from '../styles/BookListStyle';
import { BookCardContainer } from '../styles/BookCardContainer';

const BookList = () => {
  const { isLoading } = useAuth0();
  const [books, setBooks] = useState<book[]>();

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch('http://localhost:4000/api/books');
      const json = await response.json();
      setBooks(json);
    };
    fetchBooks();
  }, []);

  return (
    <div className="page-container">
      {isLoading ? (
        <>Loading...</>
      ) : (
        <>
          {/* <h2>All of the books</h2> */}
          <BookListStyle>
            {books &&
              books.map((book: book) => (
                <BookCardContainer key={book._id}>
                  <BookCard book={book} />
                </BookCardContainer>
              ))}
          </BookListStyle>
        </>
      )}
    </div>
  );
};

export default BookList;
