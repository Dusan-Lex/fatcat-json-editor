import React from 'react';
import styled from 'styled-components';
import { color, mixin } from '../shered/styles';
import Spinner from './Spinner';

const StyledEditor = styled.div`
 background: ${color.secondaryLight};
 color:${color.secondaryDark};
 margin:3rem auto;
 width:90%;
 max-width: 1400px;
 min-height: 40rem;
 border-radius: 2rem;
 padding:2rem;
 ${mixin.center}
`;

const List = styled.ul`
 
`;

interface EditorProps{
	file:string
	loading:boolean

}

const Editor = ({ file, loading }:EditorProps) => {
	let arr = [];
	if (file) { arr = JSON.parse(file); }
	return (
		<StyledEditor>
			{loading ?
				<Spinner /> : <List>{arr.map((item:unknown, index:number) => <li>item</li>)}</List>}
		</StyledEditor>
	);
};

export default Editor;
