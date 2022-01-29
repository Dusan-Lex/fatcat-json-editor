import React, {
	useEffect, useRef, useState,
} from 'react';
import styled from 'styled-components';
import ArrayMember, { ArrayMemberHandle } from './ArrayMember';
import { v4 as uuidv4 } from 'uuid';
import { color } from '../shered/styles';

const List = styled.div`
	width:100%;
`;
const DownloadButton = styled.button`
	color:${color.tertiary};
	display: inline-block;
  padding: 1.2rem 2.4rem;
  cursor: pointer;
  border-radius: 5px;
  background-color: ${color.primaryDark};
  font-size: 1.7rem;
	font-weight:600;
	margin-bottom: 4rem;
`;

interface EditorProps{
	jsonFile:string
}
const uniqueKey = uuidv4();

const Editor = ({ jsonFile }:EditorProps) => {
	const file = Array.isArray(JSON.parse(jsonFile)) ? JSON.parse(jsonFile) : JSON.parse(`[${jsonFile}]`);

	const [arr, setArr] = useState([]);
	const i = useRef(1);
	const ref = useRef<ArrayMemberHandle[]|null[]>([]);

	const clickHandler = (event:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		event.preventDefault();
		const blob = new Blob([JSON.stringify(ref.current)], { type: 'application/json' });
		const a = document.createElement('a');
		a.download = 'edited.json';
		a.href = window.URL.createObjectURL(blob);
		const clickEvt = new MouseEvent('click', {
			view: window,
			bubbles: true,
			cancelable: true,
		});
		a.dispatchEvent(clickEvt);
		a.remove();
	};

	useEffect(() => {
		if (i.current) {
			if (file.length < i.current * 50) {
				setTimeout(() => {
					setArr(file);
					i.current = 0;
				}, 0);
			} else {
				setTimeout(() => {
					setArr(file.slice(0, 50 * i.current));
					i.current += 1;
				}, 0);
			}
		}
	}, [arr, file]);

	return (
		<>
			<List>
				{
					arr.map((item:any, index:number) =>
					// eslint-disable-next-line react/no-array-index-key
						<ArrayMember key={index} item={item} uniqueKey={uniqueKey + index} ref={(el) => { ref.current[index] = el?.state; }} />)
				}
			</List>
			{file.length && i.current === 1 + Math.floor(file.length / 50) && (
				<DownloadButton
					type="button"
					onClick={clickHandler}
				>
					Download JSON file
				</DownloadButton>
			)}
		</>
	);
};

export default React.memo(Editor);
