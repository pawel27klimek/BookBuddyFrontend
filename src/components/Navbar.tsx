import { Link } from 'react-router-dom';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import { useAuth0 } from '@auth0/auth0-react';
import Typewriter from 'typewriter-effect';
import { FaUserCircle } from 'react-icons/fa';
import {
  NavContainer,
  NavTitle,
  LoginLogout,
  UserProfile,
} from '../styles/NavStyles';

const Navbar = () => {
  const { isAuthenticated, user } = useAuth0();

  return (
    <NavContainer>
      <NavTitle>
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
      </NavTitle>

      <div>
        <Link to={'/'}>
          <h2>All Books</h2>
        </Link>
      </div>

      {isAuthenticated && (
        <div>
          <Link to="/newbook">
            <h2>Add New Book</h2>
          </Link>
        </div>
      )}
      {isAuthenticated && (
        <div>
          <Link to="/favourities">
            <h2>Favourities</h2>
          </Link>
        </div>
      )}

      <LoginLogout>
        {isAuthenticated ? <LogoutButton /> : <LoginButton />}
      </LoginLogout>
      {isAuthenticated && (
        <UserProfile>
          <div className="user-circle">
            <FaUserCircle />
          </div>
          <div>{user?.name}</div>
        </UserProfile>
      )}
    </NavContainer>
  );
};

export default Navbar;
