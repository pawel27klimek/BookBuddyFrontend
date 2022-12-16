import styled from 'styled-components';

export const BookCardStyle = styled.div`
  width: 250px;
  height: 400px;
  background: #fff;
  border-radius: 4px;
  margin: 0;
  position: relative;
  box-shadow: 5px 5px 5px 5px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  Link {
    text-decoration: none;
  }
  img {
    max-height: 250px;
    margin-top: 10px;
  }
  a {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  h4 {
    font-size: 1rem;
    color: #000000;
    margin: 5px;
    margin-top: 10px;
  }
  .heart {
    margin: 5px;
    font-size: 1.5rem;
  }
`;
