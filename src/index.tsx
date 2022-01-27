import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import BaseStyles from './BaseStyles';

ReactDOM.render(
	<React.StrictMode>
		<BaseStyles />
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);
