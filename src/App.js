import React, { Component } from 'react';
import './App.scss';
import ControversyCard from './ControversyCard';

class App extends Component {
	render() {
		return (
			<div className="App">
				<ControversyCard bubbles={8} />
			</div>
		);
	}
}

export default App;
