import { Link } from 'react-router-dom';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import { useAuth0 } from '@auth0/auth0-react';
import Typewriter from 'typewriter-effect';
import { FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
  const { isAuthenticated, user } = useAuth0();

  return (
    <header>
      <div className="nav-container">
        <div className="nav-title">
          <Link to="/">
            <h1>Book Buddy</h1>
          </Link>
          <div className="nav-text">
            <span>Find your favourite </span>
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .callFunction((state) => {
                    state.elements.container.className = 'inline';
                  })
                  .typeString('Story')
                  .pauseFor(5000)
                  .deleteAll()
                  .typeString('Novel')
                  .pauseFor(3000)
                  .deleteAll()
                  .typeString('Thriller')
                  .pauseFor(1000)
                  .start();
              }}
              options={{ loop: true }}
            />
          </div>
        </div>

        <div>
          <Link to={'/'}>All books</Link>
        </div>

        {isAuthenticated && (
          <div>
            <Link to="/newbook">
              <span>Add new book</span>
            </Link>
          </div>
        )}
        {isAuthenticated && (
          <div>
            <Link to="/favourities">
              <span>Favourities</span>
            </Link>
          </div>
        )}

        <div>{isAuthenticated ? <LogoutButton /> : <LoginButton />}</div>
        {isAuthenticated && (
          <div>
            <Link to={'/profile'}>
              <div className="user-profile">
                <div className="user-circle">
                  <FaUserCircle />
                </div>
                <div>{user?.name}</div>
              </div>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
