import React from 'react';
import styled from 'styled-components';
import { color } from '../shered/styles';

export const Roller = styled.div`
	margin: auto;
	border: 1rem solid ${color.primaryLight};
	border-radius: 50%;
	border-top-color: ${color.primaryDark};
	width: 6rem;
	height: 6rem;
	animation: rotate-spinner 1s linear;
	animation-iteration-count: infinite;
	@keyframes rotate-spinner {
  	100% {
			transform: rotate(360deg);
		}
	}
`;
const Spinner = () => {
	return <Roller />;
};

export default Spinner;
