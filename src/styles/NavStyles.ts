import styled from 'styled-components';

export const NavContainer = styled.header`
  margin: 20px 100px;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 5px 5px 5px 5px rgba(0, 0, 0, 0.05);
  a {
    color: #333;
    text-decoration: none;
  }
  h1 {
    margin: 0;
    color: var(--primary);
  }
  Link {
    text-decoration: none;
  }
`;

export const NavTitle = styled.div`
  padding: 20px;
  .nav-text {
    margin-top: 10px;
    min-width: 200px;
    .inline {
      display: inline;
      font-size: larger;
    }
  }
  h1 {
    color: #678ed1;
  }
`;

export const LoginLogout = styled.div`
  cursor: pointer;
`;

export const UserProfile = styled.div`
  display: flex;
  flex-direction: column;
  .user-circle {
    font-size: 1.5rem;
    align-self: flex-end;
  }
`;
