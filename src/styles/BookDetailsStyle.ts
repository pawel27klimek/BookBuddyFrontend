import styled from 'styled-components';

export const PageContainer = styled.div`
  display: flex;
  padding: 60px 120px;
`;

export const ImgContainer = styled.div`
  margin-right: 20px;
`;

export const BookDataContainer = styled.div`
  margin-left: 20px;
`;

export const DescriptionContainer = styled.p`
  margin-top: 10px;
  font-size: 20px;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  padding: 20px 40px;
  div {
    padding: 10px;
  }
  svg path: {
    width: 15px;
    height: 15px;
  }
`;
