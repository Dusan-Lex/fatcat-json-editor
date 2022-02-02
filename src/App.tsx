import React from 'react';
import styled from 'styled-components';
import Editor from './components/Editor';
import { color, mixin } from './shered/styles';

const Title = styled.h1`
	margin:2rem 0 0;
	height:8rem; 
	font-size: 3rem;
	${mixin.center}
	color: ${color.primaryLight};
`;

const Form = styled.form`
	text-align:center;
`;

const ChooseLabel = styled.label`
	color:${color.tertiary};
	display: inline-block;
	padding: 1.2rem 2.4rem;
	cursor: pointer;
	border-radius: 5px;
	background-color: ${color.primaryDark};
	font-size: 1.7rem;
	font-weight:600;
	
	&.disabled{
		background-color: ${color.secondaryLight};
	}
`;

const ChooseInput = styled.input`
	visibility:hidden;
	position: absolute;
	left:0;
	width:0;
`;

const ChooseError = styled.p`
	color:${color.error};
	font-size: 1.6rem;
	height:2rem;
	margin-bottom:-3rem;
`;

const EditorBox = styled.div`
	color:${color.secondaryDark};
	margin: auto;
	width:97%;
	max-width: 1400px;
	min-height: 40rem;
	border-radius: 2rem;
	padding: 2rem 0 0;
	${mixin.center};
	flex-direction: column;
`;

export const Spinner = styled.div`
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

function App() {
	const [file, setFile] = React.useState<string>('[]');
	const [loading, setLoading] = React.useState<boolean>(false);
	const [error, setError] = React.useState<boolean>(false);

	const changeHandler = (event:React.ChangeEvent<HTMLInputElement>) => {
		const fileReader = new FileReader();
		if (event.target.files?.length) {
			setError(false);
			setLoading(true);
			if (event.target.files[0]?.type === 'application/json') {
				fileReader.readAsText(event.target.files[0], 'UTF-8');
				fileReader.onload = (e) => {
					if (e.target?.result) {
						setFile(e.target.result.toString());
						setLoading(false);
					}
				};
			} else {
				setFile('[]');
				setError(true);
				setTimeout(() => { setLoading(false); }, 20);
			}
		}
	};

	return (
		<>
			<Title>JSON EDITOR</Title>
			<Form onSubmit={(e) => { e.preventDefault(); }}>
				<div>
					<ChooseLabel htmlFor="file-input" className={loading ? 'disabled' : ''}>
						Choose JSON file
					</ChooseLabel>
					<ChooseInput type="file" id="file-input" name="file-uploads" accept="application/json" onChange={changeHandler} disabled={loading} />
					<ChooseError>{error && 'The selected file must be JSON file!'}</ChooseError>
				</div>
				<EditorBox>{loading ? <Spinner /> : <Editor jsonFile={file} />}</EditorBox>
			</Form>
		</>
	);
}

export default App;
