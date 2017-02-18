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
			showPrev: false,
			currentSlide: 0,
			activeSlide: false,
			numSlides: 8
		}
	},

	prev: function() {
		if (this.state.activeSlide) {
			this.setState({
				activeSlide: false
			});
		} else {
			this.updateNextPrev(this.state.currentSlide-1);
			this.setState({
				activeSlide: true
			});
		}
	},

	next: function() {
		if (this.state.activeSlide) {
			this.setState({
				activeSlide: false
			});
		} else if (this.state.currentSlide === null) {
			this.updateNextPrev(0);
			this.setState({
				activeSlide: true
			});
		} else {
			this.updateNextPrev(this.state.currentSlide+1);
			this.setState({
				activeSlide: true
			});
		}
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

	toggleSlide: function() {
		this.setState({
			activeSlide: !this.state.activeSlide
		});
	},

	updateNextPrev: function(slideNumber) {
		console.log('slideNumber: ' + slideNumber +
			' this.state.currentSlide: ' + this.state.currentSlide +
			', numSlides: ' + this.state.numSlides);

		if (slideNumber === 0 || slideNumber === null) {
			this.setState({
				showPrev: false,
				showNext: true,
				currentSlide: slideNumber,
				activeSlide: true
			});
		} else if (slideNumber === this.state.numSlides-1) {
			this.setState({
				showPrev: true,
				showNext: false,
				currentSlide: slideNumber,
				activeSlide: true
			});
		} else {
			this.setState({
				showPrev: true,
				showNext: true,
				currentSlide: slideNumber,
				activeSlide: true
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

				{ this.state.allAssetsLoaded &&
					<ControversyCard
						zoomHandler={this.toggleOverlay}
						bubbles={8}
						toggleSlideHandler={this.toggleSlide}
						prevNextHandler={this.updateNextPrev}
						currentSlide={this.state.currentSlide}
						activeSlide={this.state.activeSlide}
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
		);
	}
});

export default App;
