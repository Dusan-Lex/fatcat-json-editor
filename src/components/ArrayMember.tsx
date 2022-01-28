import React, { useState } from 'react';

import styled from 'styled-components';
import { color } from '../shered/styles';

const ListItem = styled.div`
	background-color: ${color.secondaryLight};
	margin:2rem;
	border-radius:2rem;
	color:${color.secondaryDark};
`;

const CurlyBrackets = styled.span`
	font-size: 3rem;
	color:${color.secondaryDark};
`;

interface ArrayMemberProps {
	item:any,
	uniqueKey:string
}

const ArrayMember = ({ item, uniqueKey }:ArrayMemberProps) => {
	const [data, setData] = useState(item);

	console.log(data);
	const changeHandler = (event:React.ChangeEvent<HTMLInputElement>, key?:any) => {
		console.log(typeof event.target.value);
		let val:string|number|boolean = event.target.value;
		if (event.target.type === 'number') {
			val = parseInt(val, 10);
		} else if (event.target.type === 'radio') {
			val = val.toLowerCase() === 'true';
			setData({ ...data, [key]: val });
			return;
		}
		setData({ ...data, [event.target.name]: val });
	};

	return (
		<ListItem>
			<CurlyBrackets>&#10100;</CurlyBrackets>
			{Object.entries(data).map(([key, value], index) => {
				const uniqueKey1 = uniqueKey + index;
				return (
					typeof (value) !== 'object' && (
						// eslint-disable-next-line react/no-array-index-key
						<div key={uniqueKey1}>
							<div>
								{key}
								-
								{typeof (value) === 'boolean' ? JSON.stringify(value) : value}
							</div>
							{typeof (value) === 'string' ? <input name={key} value={value} type="text" onChange={changeHandler} /> : null}
							{typeof (value) === 'number' ? <input name={key} value={value} type="number" onChange={changeHandler} /> : null}
							{typeof (value) === 'boolean' ? (
								<div>
									<label htmlFor={`${uniqueKey1}yes`}>
										<input name={uniqueKey1} id={`${uniqueKey1}yes`} type="radio" value="true" defaultChecked={value} onChange={e => changeHandler(e, key)} />
										True
									</label>
									<label htmlFor={`${uniqueKey1}no`}>
										<input name={uniqueKey1} id={`${uniqueKey1}no`} type="radio" value="false" defaultChecked={!value} onChange={e => changeHandler(e, key)} />
										False
									</label>

								</div>
							) : null}

						</div>
					)
				);
			})}
			<CurlyBrackets>&#10101;</CurlyBrackets>
		</ListItem>
	);
};

export default React.memo(ArrayMember);
