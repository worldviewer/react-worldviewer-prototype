import React from 'react';
import './App.scss';
import ControversyCard from './ControversyCard/ControversyCard';
import './mobiscroll/mobiscroll.custom-3.0.1.min.css';
import './mobiscroll/mobiscroll-prevnext.scss';
import Spinner from './Spinner/Spinner';
import Preload from 'react-preload';

var App = React.createClass({
	getInitialState: function() {
		let api = 'https://apibaas-trial.apigee.net/controversies-of-science/sandbox/graphics/';

		return {
			slides: [
				{source: api + '26396ee5-f630-11e6-be71-0eec2415f3df', left: '7vw', top: '23vw', width: '24vw', numleft: '20vw', numtop: '4.5vw'},
				{source: api + '31f37276-f630-11e6-9a38-0ad881f403bf', left: '6vw', top: '55vw', width: '14vw', numleft: '5.5vw', numtop: '-1vw'},
				{source: api + '416a3010-f630-11e6-9a38-0ad881f403bf', left: '21vw', top: '50vw', width: '10vw', numleft: '1vw', numtop: '-0.5vw'},
				{source: api + '4da59868-f630-11e6-be71-0eec2415f3df', left: '37vw', top: '33vw', width: '12vw', numleft: '-1vw', numtop: '3vw'},
				{source: api + '57f955d1-f630-11e6-9a38-0ad881f403bf', left: '52vw', top: '27vw', width: '16vw', numleft: '14vw', numtop: '6.5vw'},
				{source: api + '5e74e181-f630-11e6-8477-122e0737977d', left: '70vw', top: '36vw', width: '9vw', numleft: '0vw', numtop: '0vw'},
				{source: api + '6b41b46f-f630-11e6-8477-122e0737977d', left: '69vw', top: '46vw', width: '9vw', numleft: '0.5vw', numtop: '6.5vw'},
				{source: api + '737d405a-f630-11e6-8477-122e0737977d', left: '78vw', top: '49vw', width: '16vw', numleft: '11vw', numtop: '0.5vw'}
			],
			icon: {
				source: api + '7bb12a07-f630-11e6-8477-122e0737977d'
			},
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

		let slides = this.state.slides.map( (slide) => slide.source ),
			loadSpinner = (<Spinner />);

		return (
			<div className="App">

				<Preload
					images={slides}
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
