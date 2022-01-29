import React, { useImperativeHandle, useState } from 'react';

import styled from 'styled-components';
import { color, mixin } from '../shered/styles';

const ListItem = styled.div`
	background-color: ${color.secondaryLight};
	margin:0 2rem 4rem;
	padding:2rem;
	border-radius:0.5rem;
	color:${color.secondaryDark};
	${mixin.center};
	flex-direction: column;

	input,textarea{
		background-color: ${color.tertiary};
		color:${color.secondaryDark};
		border:none;
		padding:2rem 2rem;
		width:100%;
		height:3rem;
		font-size: 1.6rem;
		margin-top:1rem;
	}
	textarea{
		height:20rem;
	}
	label{
		font-size: 2rem;
		text-align:end;
	}
`;

const PropertyBox = styled.div`
	width:90%;
	max-width: 50rem;
	padding:1rem;
	border:0.3rem solid ${color.secondaryDark};
	margin:1rem;
	.property-value{
		text-align:start;
		background-color: ${color.secondaryDark};
		color:${color.primaryLight};
		padding:2rem;
		font-size: 2rem;
		word-wrap: break-word;
	}
`;

const CurlyBrackets = styled.div`
	font-size: 3rem;
`;

interface Props {
	item:any,
	uniqueKey:string
}

export type ArrayMemberHandle = {
  state:any;
};

const ArrayMember = React.forwardRef<ArrayMemberHandle, Props>((props, ref) => {
	const [data, setData] = useState(props.item);

	useImperativeHandle(ref, () => ({
		state: data,
	}));

	const changeHandler = (event:React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLTextAreaElement>, key?:any) => {
		let val:string|number|boolean = event.target.value;
		if (event.target.type === 'number') {
			val ? val = +val : val = '';
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
			{Object.entries(props.item).map(([key, value], index) => {
				const uniqueKey1 = props.uniqueKey + index;

				let stringInput = <input name={key} value={data[key]} type="text" onChange={changeHandler} />;
				if (typeof (value) === 'string') {
					if (value.length > 60) {
						stringInput = <textarea name={key} value={data[key]} onChange={changeHandler} />;
					} else if (value.includes('@')) {
						stringInput = <input name={key} value={data[key]} type="email" onChange={changeHandler} />;
					}
					// else if (!isNaN(new Date(value.replace('T', ' ')).getDate())) {
					// 	stringInput = <input name={key} value={data[key].substring(0, 10)} type="date" onChange={changeHandler} />;
					// }
				}
				return (
					typeof (value) !== 'object' && (
						<PropertyBox key={uniqueKey1}>
							<div className="property-value">
								{key}
								{'   '}
								&#10132;
								{'   '}
								{typeof (value) === 'boolean' ? JSON.stringify(data[key]) : data[key]}
							</div>
							{typeof (value) === 'string' && !['id', '_id'].includes(key) ? stringInput : null}
							{typeof (value) === 'number' ? <input name={key} value={data[key]} type="number" step="any" onChange={changeHandler} /> : null}
							{typeof (value) === 'boolean' ? (
								<div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
									<label htmlFor={`${uniqueKey1}yes`}>
										<input name={uniqueKey1} id={`${uniqueKey1}yes`} type="radio" value="true" defaultChecked={data[key]} onChange={e => changeHandler(e, key)} />
										True
									</label>
									<label htmlFor={`${uniqueKey1}no`}>
										<input name={uniqueKey1} id={`${uniqueKey1}no`} type="radio" value="false" defaultChecked={!data[key]} onChange={e => changeHandler(e, key)} />
										False
									</label>
								</div>
							) : null}

						</PropertyBox>
					)
				);
			})}
			<CurlyBrackets>&#10101;</CurlyBrackets>
		</ListItem>
	);
});

export default React.memo(ArrayMember);
