import React from 'react';
import './App.scss';
import ControversyCard from './ControversyCard/ControversyCard';
import './mobiscroll/mobiscroll.custom-3.0.1.min.css';
import './mobiscroll/mobiscroll-prevnext.scss';
import Spinner from './Spinner/Spinner';

var App = React.createClass({
	getInitialState: function() {
		return {
			overlay: true,
			allAssetsLoaded: false,
			showNext: true,
			showPrev: false
		}
	},

	prev: function() {
		console.log('prev!');
	},

	next: function(event, inst) {
		console.log('next!');
	},

	toggleOverlay: function(zoom) {
		this.setState({overlay: zoom <= 1.1});
	},

	componentDidMount: function() {
		let mountedApp = document.querySelector('.App');

		mountedApp.addEventListener('gesturestart', (e) => {
			console.log('denied');
			e.preventDefault();
		});

		this.setState({ allAssetsLoaded: true });
	},

	updateNextPrev: function(slideNumber, numSlides) {
		console.log('slideNumber: ' + slideNumber + ', numSlides: ' + numSlides);

		if (slideNumber === 0) {
			this.setState({
				showPrev: false,
				showNext: true
			});
		} else if (slideNumber === numSlides-1) {
			this.setState({
				showPrev: true,
				showNext: false
			});
		} else {
			this.setState({
				showPrev: true,
				showNext: true
			});
		}
	},

	render: function() {
		let prevNextStyle = {
			display: this.state.overlay ? 'block' : 'none'
		}

		return (
			<div className="App">
				<Spinner active={!this.state.allAssetsLoaded} />
				<div className="md-prevnext">
					<div className="md-apps-ul">

						{ this.state.allAssetsLoaded &&
							<ControversyCard
								zoomHandler={this.toggleOverlay}
								bubbles={8}
								prevNextHandler={this.updateNextPrev}
								showOverlay={this.state.overlay} />
						}

						{ this.state.showPrev &&
							<div 
								onClick={this.prev}
								className="md-prev md-np mbsc-ic mbsc-ic-arrow-left5"
								style={prevNextStyle}>
							</div>
						}

						{ this.state.showNext &&
		                    <div
		                    	onClick={this.next}
		                    	className="md-next md-np md-n mbsc-ic mbsc-ic-arrow-right5"
		                    	style={prevNextStyle}>
	                    	</div>
	                    }

	                </div>
				</div>
			</div>
		);
	}
});

export default App;
