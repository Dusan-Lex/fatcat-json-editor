import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import ArrayMember from './ArrayMember';

const List = styled.div`
	width:100%;
`;

interface EditorProps{
	file:string
}

const Editor = ({ file }:EditorProps) => {
	const [arr, setArr] = useState([]);
	const i = useRef(1);
	useEffect(() => {
		if (file && i.current) {
			if (JSON.parse(file).length < i.current * 50) {
				setTimeout(() => {
					setArr(JSON.parse(file));
					i.current = 0;
				}, 0);
			} else {
				setTimeout(() => {
					setArr(JSON.parse(file).slice(0, 50 * i.current));
					i.current += 1;
				}, 0);
			}
		}
	}, [arr, file]);

	// eslint-disable-next-line react/no-array-index-key
	return <List>{arr.map((item:any, index:number) => <ArrayMember key={index} item={item} />)}</List>;
};

export default React.memo(Editor);
