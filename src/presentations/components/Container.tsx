import styled from 'styled-components';
import bg from 'assets/images/bg.jpg';

export const Container = styled.div`
  width: 100%;
  padding: 0 1rem;
  margin-right: auto;
  margin-left: auto;
  @media (min-width: 576px) {
    & {
      max-width: 540px;
    }
  }
  @media (min-width: 768px) {
    & {
      max-width: 720px;
    }
  }
  @media (min-width: 992px) {
    & {
      max-width: 960px;
    }
  }
  @media (min-width: 1200px) {
    & {
      max-width: 1140px;
    }
  }
`;

export const AppContainer = styled.div`
  min-height: 100vh;
  padding-top: calc(100vh * 0.3);
  background-image: url(${bg});
  background-size: cover;
  background-position: top center;
  background-attachment: fixed;
`;