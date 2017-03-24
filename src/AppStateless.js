import React from 'react';
import './App.scss';
import ControversyCard from './ControversyCard/ControversyCard';
import './mobiscroll/mobiscroll.custom-3.0.1.min.css';
import './mobiscroll/mobiscroll-prevnext.scss';
import Spinner from './Spinner/Spinner';
import Preload from './Preload/Preload';

var AppStateless = React.createClass({
	// getInitialState: function() {

	// 	return {
	// 		// TODO: This ID will eventually be programmatically discovered.
	// 		// For now, it is fixed to the Halton Arp card.
	// 		card: {
	// 			id: '58b8f1f7b2ef4ddae2fb8b17',
	// 			icon: {
	// 				source: '',
	// 				left: '',
	// 				top: '',
	// 				width: ''
	// 			},
	// 			name: {
	// 				display: {
	// 					left: {
	// 						left: '',
	// 						markup: '',
	// 						top: ''
	// 					},
	// 					right: {
	// 						right: '',
	// 						markup: '',
	// 						top: ''
	// 					}
	// 				}
	// 			},
	// 			urls: {
	// 				background: this.backend.getBackgroundUrl(),
	// 				overlay: '',
	// 				icon: ''
	// 			},
	// 			graphics: []
	// 		},
	// 		overlays: {
	// 			active: true,
	// 			loaded: false
	// 		},
	// 		slides: {
	// 			next: true,
	// 			prev: false,
	// 			current: null,
	// 			active: false,
	// 			num: 8			
	// 		}
	// 	}
	// },

	// prev: function() {
	// 	if (this.props.slides.active) {
	// 		this.setState(Object.assign({}, this.state, {
	// 			slides: {
	// 				active: false
	// 			}
	// 		}));
	// 	} else {
	// 		this.updateNextPrev(this.state.slides.current-1);
	// 		this.setState(Object.assign({}, this.state, {
	// 			slides: {
	// 				active: true					
	// 			}
	// 		}));
	// 	}
	// },

	// next: function() {
	// 	if (this.props.slides.active) {
	// 		this.setState(Object.assign({}, this.state, {
	// 			slides: {
	// 				active: false					
	// 			}
	// 		}));
	// 	} else if (this.props.slides.current === null) {
	// 		this.updateNextPrev(0);
	// 		this.setState(Object.assign({}, this.state, {
	// 			slides: {
	// 				active: true					
	// 			}
	// 		}));
	// 	} else {
	// 		this.updateNextPrev(this.props.slides.current+1);
	// 		this.setState(Object.assign({}, this.state, {
	// 			slides: {
	// 				active: true					
	// 			}
	// 		}));
	// 	}
	// },

	componentDidMount: function() {
	},

	// toggleSlide: function() {
	// 	this.setState(Object.assign({}, this.state, {
	// 		slides: {
	// 			active: !this.props.slides.active
	// 		}
	// 	}));
	// },

	// updateNextPrev: function(slideNumber) {
	// 	console.log('slideNumber: ' + slideNumber +
	// 		' this.props.slides.current: ' + this.props.slides.current +
	// 		', num: ' + this.props.slides.num);

	// 	if (slideNumber === 0 || slideNumber === null) {
	// 		this.setState(Object.assign({}, this.state, {
	// 			slides: {
	// 				next: true,
	// 				prev: false,
	// 				current: slideNumber,
	// 				active: true					
	// 			}
	// 		}));
	// 	} else if (slideNumber === this.props.slides.num-1) {
	// 		this.setState(Object.assign({}, this.state, {
	// 			slides: {
	// 				next: false,
	// 				prev: true,
	// 				current: slideNumber,
	// 				active: true					
	// 			}
	// 		}));
	// 	} else {
	// 		this.setState(Object.assign({}, this.state, {
	// 			slides: {
	// 				next: true,
	// 				prev: true,
	// 				current: slideNumber,
	// 				active: true					
	// 			}
	// 		}));
	// 	}
	// },

	handleAssetLoadError: function(error) {
		console.log('Error loading overlay images ...');
		console.log(error);
	},

	handleAssetLoadSuccess: function() {
		console.log('All assets loaded successfully.');
	},

	render: function() {
		let prevNextStyle = {
			display: this.props.overlays.active ? 'block' : 'none'
		}

		let loadSpinner = (<Spinner />);

		return (
			<div className="App">

				<Preload
					cardId={this.props.card.id}
					loadingIndicator={loadSpinner}
					onError={this.handleAssetLoadError}
					onSuccess={this.handleAssetLoadSuccess}
					resolveOnError={true}
					mountChildren={true} >

					<ControversyCard
						icon={this.props.card.icon}
						titleLeft={this.props.card.nameLeft}
						titleRight={this.props.card.nameRight}
						summary={this.props.card.summary}
						slides={this.props.card.graphics}
						currentSlide={this.props.slides.current}
						activeSlide={this.props.slides.active}
						showOverlay={this.props.overlays.active} />

				</Preload>

				{ this.props.slides.prev &&
					<div 
						onClick={this.prev}
						className="md-prev md-np mbsc-ic mbsc-ic-arrow-left5"
						style={prevNextStyle}>
					</div>
				}

				{ this.props.slides.next &&
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
