import { createGlobalStyle } from 'styled-components';
import { color } from './shered/styles';

export default createGlobalStyle`
	html {
		height: 100%;
		font-size: 62.5%; 
		@media only screen and (min-width: 112.5em) {
			font-size: 75%;
		}
		@media only screen and (max-width: 75em) {
			font-size: 56.25%;
		}
		@media only screen and (max-width: 56.25em) {
			font-size: 50%;
		}
		@media only screen and (max-width: 37.5em) {
			font-size: 43.75%;
		}
	}
	body {
		padding: 0;
		margin: 0;
		font-family: 'Poppins',sans-serif;
		background-color: ${color.secondaryDark};
	}
	*, *:after, *:before, input[type="search"] {
		box-sizing: border-box;
	}
	a {
		color: inherit;
		text-decoration: none;
	}
	ul {
		list-style: none;
	}
  
	button {
		background: none;
		border: none;
	}
	button, input, select, textarea {
		font-family: inherit;
		outline: none;
		&:focus {
			outline: none;
		}
		&:disabled {
			opacity: 1;
		}
	}
`;
