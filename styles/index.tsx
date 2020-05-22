import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body {
    --red: #BF1313;
    --blue: #00A1E4;
    --dark: #272727;
    --gray: #696773;
    --light: #EFF1F3;

    margin: 0;
    padding: 0;
    width: 100vw;
    height: 100vh;

    font-family: 'Overpass', sans-serif;

    background: var(--red);

  }

  #__next {
    width: 100%;
    height: 100%;
  }

  /* Default box-sizing to border-box, except for images and hr */
  *, *:before, *:after {
    box-sizing: border-box;
  }

  hr,img {
    box-sizing: content-box;
  }
`;
