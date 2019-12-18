import { createGlobalStyle } from 'styled-components';

const theme = {
  primaryColor: '#FF4057',
  fontDark: '#000103',
};

export default theme;

export const GlobalStyle = createGlobalStyle`
  body {
    height: 100vh;
    ::-webkit-scrollbar {
      display: none;
    }
  }
  #root {
    height: 100vh;
  }
  :not(input):not(textarea),
  :not(input):not(textarea)::after,
  :not(input):not(textarea)::before {
      -webkit-user-select: none;
      user-select: none;
      cursor: default;
  }
  input, button, textarea, :focus {
      outline: none;
  }
`;
