import React, { useState } from 'react';
import styled from 'styled-components';
import { mixin } from '../shered/styles';

const ListItem = styled.li`
overflow-x:auto;
${mixin.center}
`;

const ArrayMember = ({ item }:{item:any}) => {
	const [data, setData] = useState(item);
	const changeHandler = (event:React.ChangeEvent<HTMLInputElement>) => {
		setData({ ...data, [event.target.name]: event.target.value });
	};
	return (
		<ListItem>
			&#10100;
			{Object.entries(data).map(([key, value], index) => {
				return (
					// eslint-disable-next-line react/no-array-index-key
					<div key={JSON.stringify(key) + index}>
						<div>
							{key}
							-
							{JSON.stringify(value)}
						</div>
						{typeof (value) === 'string' ? <input name={key} value={value} type="text" onChange={changeHandler} /> : null}
					</div>
				);
			})}
			&#10101;
		</ListItem>
	);
};

export default React.memo(ArrayMember);
