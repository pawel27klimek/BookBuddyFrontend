import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { book } from '../types';
import { FaTrashAlt } from 'react-icons/fa';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { BsSuitHeart } from 'react-icons/bs';
import { BsSuitHeartFill } from 'react-icons/bs';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const BookDetails = () => {
  const params = useParams<string>();
  const bookId = params.id;
  const [book, setBook] = useState<book>();
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [showLikeButton, setShowLikeButton] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const navigate = useNavigate();

  const { user, isAuthenticated } = useAuth0();

  const API_URL_BOOK = `http://localhost:4000/api/books/${bookId}`;
  const API_URL_USER = `http://localhost:4000/api/users/${user?.email}`;

  useEffect(() => {
    const getBook = async () => {
      const response = await fetch(API_URL_BOOK);
      const json = await response.json();
      setBook(json);
    };
    getBook();
  }, [bookId]);

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
      setShowDeleteButton(book?.creatorUserEmail === user?.email);
    }
  }, [book?._id, user?.email]);

  //like button handler
  const handleLikeClick = async () => {
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
  };

  //delete button handler

  const handleTrashClick = async () => {
    const response = await fetch(API_URL_BOOK, {
      method: 'POST',
      body: bookId,
    });
    const json = await response.json();
    navigate('/');
  };

  return (
    <div className="page-container">
      <div key={book?._id}>
        <div>Title:{book?.title}</div>
        <div>Category:{book?.category}</div>
        <div>Description:{book?.description}</div>
        <div>Language:{book?.language}</div>
        <div>Number of pages:{book?.nrOfPages}</div>

        <div>User creator: {book?.creatorUserEmail}</div>
        {showDeleteButton && (
          <div>
            <FaTrashAlt
              onClick={() => {
                handleTrashClick();
              }}
            />
          </div>
        )}

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

export default BookDetails;
