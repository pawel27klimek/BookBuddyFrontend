import { book } from '../types';
import { BsSuitHeart } from 'react-icons/bs';
import { BsSuitHeartFill } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const BookCard = ({
  book,
  updateFavourities,
}: {
  book: book;
  updateFavourities?: (id: string) => void;
}) => {
  const location = useLocation();

  const [isLiked, setIsLiked] = useState(false);
  const [showLikeButton, setShowLikeButton] = useState(false);

  const { user } = useAuth0();
  const API_URL_USER = `http://localhost:4000/api/users/${user?.email}`;

  useEffect(() => {
    if (user?.email) {
      const getUser = async () => {
        const response = await fetch(API_URL_USER);
        const json = await response.json();
        const likedBooks = json.likedbooks;
        if (likedBooks.includes(book?._id)) {
          setIsLiked(true);
        } else {
          setIsLiked(false);
        }
      };
      getUser();
      setShowLikeButton(true);
    }
  }, [book?._id, user?.email]);

  //like button handler
  const handleLikeClick = async () => {
    if (location.pathname === '/') {
      const userAndBook = {
        email: user?.email,
        likedbookid: book?._id,
      };
      const response = await fetch(API_URL_USER, {
        method: 'POST',
        body: JSON.stringify(userAndBook),
        headers: { 'Content-Type': 'application/json' },
      });
      const json = await response.json();
      setIsLiked(json);
    } else if (location.pathname === '/favourities') {
      const userAndBook = {
        email: user?.email,
        likedbookid: book?._id,
      };
      const response = await fetch(API_URL_USER, {
        method: 'POST',
        body: JSON.stringify(userAndBook),
        headers: { 'Content-Type': 'application/json' },
      });
      const json = await response.json();
      updateFavourities!(book._id);
    }
  };

  return (
    <div className="book-card">
      <Link to={'/' + book._id}>
        <div>
          <h4>Title: {book.title}</h4>
          <h5>
            <strong>Category: </strong>
            {book.category}
          </h5>
          <h6>
            <strong>Year of publication: </strong>
            {book.yearOfPublication}
          </h6>
          <img src={book.imgUrl} />
          <p>Description: {book.description}</p>
          <p>
            Created:{' '}
            {formatDistanceToNow(new Date(book.createdAt), {
              addSuffix: true,
            })}
          </p>
        </div>
      </Link>
      <div>
        {showLikeButton && (
          <div
            onClick={() => {
              handleLikeClick();
            }}
          >
            {isLiked ? (
              <BsSuitHeartFill color="red" />
            ) : (
              <BsSuitHeart color="red" />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookCard;
