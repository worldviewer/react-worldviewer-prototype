import React from 'react';
import './App.scss';
import ControversyCard from './ControversyCard/ControversyCard';
import './mobiscroll/mobiscroll.custom-3.0.1.min.css';
import './mobiscroll/mobiscroll-prevnext.scss';
import Spinner from './Spinner/Spinner';
// import Preload from 'react-preload';
import Preload from './Preload/Preload';

var App = React.createClass({
	getInitialState: function() {
		return {
			// TODO: This UUID will eventually be programmatically discovered.
			// For now, it is fixed to the Halton Arp card.
			card: {
				uuid: '5dd8d904-f6d8-11e6-9a38-0ad881f403bf'
			},
			icon: null,
			slides: [],
			overlay: true,
			allAssetsLoaded: false,
			showNext: true,
			showPrev: false,
			currentSlide: null,
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

	setSlides: function(slides, icon) {
		this.setState({
			slides: slides,
			icon: icon
		});
	},

	toggleOverlay: function(zoom) {
		this.setState({
			overlay: zoom <= 1.1
		});
	},

	componentDidMount: function() {
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

	handleAssetLoadError: function(error) {
		console.log('Error loading overlay images ...');
		console.log(error);
	},

	handleAssetLoadSuccess: function() {
		console.log('All assets loaded successfully.');
	},

	render: function() {
		let prevNextStyle = {
			display: this.state.overlay ? 'block' : 'none'
		}

		let loadSpinner = (<Spinner />);

		return (
			<div className="App">

				<Preload
					cardId={this.state.card.uuid}
					setSlideHandler={this.setSlides}
					loadingIndicator={loadSpinner}
					onError={this.handleAssetLoadError}
					onSuccess={this.handleAssetLoadSuccess}
					resolveOnError={true}
					mountChildren={true} >

					<ControversyCard
						icon={this.state.icon}
						slides={this.state.slides}
						zoomHandler={this.toggleOverlay}
						toggleSlideHandler={this.toggleSlide}
						prevNextHandler={this.updateNextPrev}
						currentSlide={this.state.currentSlide}
						activeSlide={this.state.activeSlide}
						showOverlay={this.state.overlay} />

				</Preload>

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
