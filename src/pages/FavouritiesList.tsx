import BookCard from '../components/BookCard';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import { book } from '../types';
import { BookListStyle } from '../styles/BookListStyle';
import { BookCardStyle } from '../styles/BookCardStyle';
import { BookCardContainer } from '../styles/BookCardContainer';

const FavouritiesList = () => {
  const { user } = useAuth0();
  const [favouritiesBooks, setFavouritiesBooks] = useState<book[]>([]);
  const userEmail = user?.email;

  const API_URL_BOOKS = 'http://localhost:4000/api/books';

  useEffect(() => {
    if (userEmail) {
      const API_URL_USER = `http://localhost:4000/api/users/${userEmail}`;
      const fetchData = async () => {
        const response = await fetch(API_URL_USER);
        const json = await response.json();
        const userFavourities = json.likedbooks;
        const responseBooks = await fetch(API_URL_BOOKS);
        const books = await responseBooks.json();
        const likedBooks = books.filter((book: book) =>
          userFavourities.includes(book._id)
        );
        setFavouritiesBooks(likedBooks);
      };
      fetchData();
    }
  }, [userEmail]);

  const updateFavouritiesBooks = (id: string) => {
    const filteredFavourtiesBooks = favouritiesBooks.filter(
      (book: book) => book._id !== id
    );
    setFavouritiesBooks(filteredFavourtiesBooks);
  };

  return (
    <BookListStyle>
      {favouritiesBooks.map((book: book) => (
        <BookCardContainer key={book._id}>
          <BookCard book={book} updateFavourities={updateFavouritiesBooks} />
        </BookCardContainer>
      ))}
    </BookListStyle>
  );
};

export default FavouritiesList;
