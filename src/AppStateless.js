import React, { PropTypes } from 'react';
import './App.scss';
import ControversyCard from './ControversyCard/ControversyCard';
import './mobiscroll/mobiscroll.custom-3.0.1.min.css';
import './mobiscroll/mobiscroll-prevnext.scss';
import Spinner from './Spinner/Spinner';
import Preload from './Preload/Preload';
import Backend from './Backend/Backend';
import { fetchCard } from './redux';

var AppStateless = React.createClass({
	getInitialState: function() {
		this.backend = new Backend();

		return {
			// TODO: This ID will eventually be programmatically discovered.
			// For now, it is fixed to the Halton Arp card.
			card: {
				id: '58b8f1f7b2ef4ddae2fb8b17',
				icon: {
					source: '',
					left: '',
					top: '',
					width: ''
				},
				name: {
					display: {
						left: {
							left: '',
							markup: '',
							top: ''
						},
						right: {
							right: '',
							markup: '',
							top: ''
						}
					}
				},
				urls: {
					background: this.backend.getBackgroundUrl(),
					overlay: '',
					icon: ''
				},
				graphics: []
			},
			overlays: {
				active: true,
				loaded: false
			},
			slides: {
				next: true,
				prev: false,
				current: null,
				active: false,
				num: 8			
			}
		}
	},

	prev: function() {
		if (this.state.active) {
			this.setState(Object.assign({}, this.state, {
				slides: {
					active: false
				}
			}));
		} else {
			this.updateNextPrev(this.state.slides.current-1);
			this.setState(Object.assign({}, this.state, {
				slides: {
					active: true					
				}
			}));
		}
	},

	next: function() {
		if (this.state.slides.active) {
			this.setState(Object.assign({}, this.state, {
				slides: {
					active: false					
				}
			}));
		} else if (this.state.slides.current === null) {
			this.updateNextPrev(0);
			this.setState(Object.assign({}, this.state, {
				slides: {
					active: true					
				}
			}));
		} else {
			this.updateNextPrev(this.state.slide.current+1);
			this.setState(Object.assign({}, this.state, {
				slides: {
					active: true					
				}
			}));
		}
	},

	setSlides: function(card) {
		this.setState(Object.assign({}, this.state, {
			card
		}));
	},

	toggleOverlay: function(zoom) {
		this.setState(Object.assign({}, this.state, {
			overlays: {
				active: zoom <= 1.1
			}
		}));
	},

	componentDidMount: function() {
		console.log('fetching ...');
		this.props.fetchCard(this.props.card.id, this.props.base.api + this.props.card.id);
	},

	toggleSlide: function() {
		this.setState(Object.assign({}, this.state, {
			slides: {
				active: !this.state.slides.active
			}
		}));
	},

	updateNextPrev: function(slideNumber) {
		console.log('slideNumber: ' + slideNumber +
			' this.state.slides.current: ' + this.state.slides.current +
			', num: ' + this.state.slides.num);

		if (slideNumber === 0 || slideNumber === null) {
			this.setState(Object.assign({}, this.state, {
				slides: {
					next: true,
					prev: false,
					current: slideNumber,
					active: true					
				}
			}));
		} else if (slideNumber === this.state.slide.num-1) {
			this.setState(Object.assign({}, this.state, {
				slides: {
					next: false,
					prev: true,
					current: slideNumber,
					active: true					
				}
			}));
		} else {
			this.setState(Object.assign({}, this.state, {
				slides: {
					next: true,
					prev: true,
					current: slideNumber,
					active: true					
				}
			}));
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
			display: this.state.overlays.active ? 'block' : 'none'
		}

		let loadSpinner = (<Spinner />);

		return (
			<div className="App">

				<Preload
					cardId={this.state.card.id}
					setSlideHandler={this.setSlides}
					loadingIndicator={loadSpinner}
					onError={this.handleAssetLoadError}
					onSuccess={this.handleAssetLoadSuccess}
					resolveOnError={true}
					mountChildren={true} >

					<ControversyCard
						icon={this.state.card.icon}
						title={this.state.card.name}
						summary={this.state.card.summary}
						background={this.state.card.urls.background}
						slides={this.state.card.graphics}
						zoomHandler={this.toggleOverlay}
						toggleSlideHandler={this.toggleSlide}
						prevNextHandler={this.updateNextPrev}
						currentSlide={this.state.slides.current}
						activeSlide={this.state.slides.active}
						showOverlay={this.state.overlays.active} />

				</Preload>

				{ this.state.slides.prev &&
					<div 
						onClick={this.prev}
						className="md-prev md-np mbsc-ic mbsc-ic-arrow-left5"
						style={prevNextStyle}>
					</div>
				}

				{ this.state.slides.next &&
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

export default AppStateless;
