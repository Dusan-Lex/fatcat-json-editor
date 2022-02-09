import React, { useEffect, useRef, useState } from 'react';
import { unstable_batchedUpdates as unstableBatchedUpdates } from 'react-dom';
import styled from 'styled-components';
import ArrayMember, { ArrayMemberHandle } from './ArrayMember';
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

const Editor:React.FC<EditorProps> = ({ jsonFile }) => {
	const [arr, setArr] = useState([]);
	const [count, setCount] = useState<number>(1);
	const ref = useRef<ArrayMemberHandle[]|null[]>([]);
	const file = Array.isArray(JSON.parse(jsonFile)) ? JSON.parse(jsonFile) : JSON.parse(`[${jsonFile}]`);

	const clickHandler = (event:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		event.preventDefault();
		const blob = new Blob([JSON.stringify(ref.current)], { type: 'application/json' });
		const a = document.createElement('a');
		a.download = 'edited.json';
		a.href = URL.createObjectURL(blob);
		const clickEvt = new MouseEvent('click', {
			view: window,
			bubbles: true,
			cancelable: true,
		});
		a.dispatchEvent(clickEvt);
		a.remove();
	};

	useEffect(() => {
		if (file.length && count) {
			if (file.length < count * 50) {
				setTimeout(() => {
					unstableBatchedUpdates(() => {
						setArr(file);
						setCount(0);
					});
				}, 0);
			} else {
				setTimeout(() => {
					unstableBatchedUpdates(() => {
						setArr(file.slice(0, 50 * count));
						setCount(prevcount => prevcount + 1);
					});
				}, 0);
			}
		}
	}, [arr, file, count]);

	return (
		<>
			<List>
				{
					arr.map((item:any, index:number) =>
					// eslint-disable-next-line react/no-array-index-key
						<ArrayMember key={index} item={item} uniqueKey={index.toString()} ref={(el) => { ref.current[index] = el?.state; }} />)
				}
			</List>
			{file.length && count === 0 && (
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

export default Editor;
