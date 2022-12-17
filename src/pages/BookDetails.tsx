import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { book } from '../types';
import { FaTrashAlt } from 'react-icons/fa';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { BsSuitHeart } from 'react-icons/bs';
import { BsSuitHeartFill } from 'react-icons/bs';
import {
  BookDataContainer,
  ButtonsContainer,
  DescriptionContainer,
  ImgContainer,
  PageContainer,
} from '../styles/BookDetailsStyle';

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
    <PageContainer>
      <ImgContainer>
        <img src={book?.imgUrl} alt="book-image" />
      </ImgContainer>
      <BookDataContainer>
        <h1>{book?.title}</h1>
        <h2>Author: {book?.author}</h2>
        <h3>Category: {book?.category}</h3>
        <h3>Language: {book?.language}</h3>
        <h4>Publisher: {book?.publisher}</h4>
        <h4>Year of publication: {book?.yearOfPublication}</h4>
        <h5>Number of pages: {book?.nrOfPages}</h5>
        <h5>User creator: {book?.creatorUserEmail}</h5>
        <ButtonsContainer>
          {showDeleteButton && (
            <div className="trash">
              <FaTrashAlt
                onClick={() => {
                  handleTrashClick();
                }}
              />
            </div>
          )}

          {showLikeButton && (
            <div
              className="heart"
              onClick={() => {
                handleLikeClick();
              }}
            >
              {isLiked ? (
                <BsSuitHeartFill
                  color="red"
                  onClick={() => {
                    handleLikeClick();
                  }}
                />
              ) : (
                <BsSuitHeart
                  color="red"
                  onClick={() => {
                    handleLikeClick();
                  }}
                />
              )}
            </div>
          )}
        </ButtonsContainer>
        <div>
          Description:{' '}
          <DescriptionContainer>{book?.description}</DescriptionContainer>
        </div>
      </BookDataContainer>
    </PageContainer>
  );
};

export default BookDetails;
