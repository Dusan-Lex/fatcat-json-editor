import React, {
	useEffect, useMemo, useRef, useState,
} from 'react';
import styled from 'styled-components';
import ArrayMember from './ArrayMember';
import { v4 as uuidv4 } from 'uuid';

const List = styled.div`
	width:100%;
`;

interface EditorProps{
	file:string
}
const uniqueKey = uuidv4();
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

	return (
		<List>
			{
				arr.map((item:any, index:number) =>
				// eslint-disable-next-line react/no-array-index-key
					<ArrayMember key={index} item={item} uniqueKey={uniqueKey + index} />)
			}
		</List>
	);
};

export default React.memo(Editor);
