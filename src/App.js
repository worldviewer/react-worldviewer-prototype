import React from 'react';
import './App.scss';
import ControversyCard from './ControversyCard/ControversyCard';
import './mobiscroll/mobiscroll.custom-3.0.1.min.css';
import './mobiscroll/mobiscroll-prevnext.scss';
import Spinner from './Spinner/Spinner';
import Preload from './Preload/Preload';
import Backend from './Backend/Backend';

var App = React.createClass({
	getInitialState: function() {
		this.backend = new Backend();

		return {
			// TODO: This ID will eventually be programmatically discovered.
			// For now, it is fixed to the Halton Arp card.
			card: {
				id: '58b8f1f7b2ef4ddae2fb8b17',
				metadata: {
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
					}
				},
				urls: {
					background: this.backend.getPyramidUrl(),
					overlay: '',
					icon: ''
				},
				graphics: []
			},
			overlay: {
				active: true,
				loaded: false
			},
			slide: {
				show: {
					next: true,
					prev: false
				},
				current: null,
				active: false,
				num: 8			
			}
		}
	},

	prev: function() {
		if (this.state.active) {
			this.setState({
				slide: {
					active: false					
				}
			});
		} else {
			this.updateNextPrev(this.state.slide.current-1);
			this.setState({
				slide: {
					active: true					
				}
			});
		}
	},

	next: function() {
		if (this.state.slide.active) {
			this.setState({
				slide: {
					active: false					
				}
			});
		} else if (this.state.slide.current === null) {
			this.updateNextPrev(0);
			this.setState({
				slide: {
					active: true					
				}
			});
		} else {
			this.updateNextPrev(this.state.slide.current+1);
			this.setState({
				slide: {
					active: true					
				}
			});
		}
	},

	setSlides: function(card) {
		this.setState({
			card
		});
	},

	toggleOverlay: function(zoom) {
		this.setState({
			overlay: {
				active: zoom <= 1.1
			}
		});
	},

	componentDidMount: function() {

	},

	toggleSlide: function() {
		this.setState({
			slide: {
				active: !this.state.slide.active
			}
		});
	},

	updateNextPrev: function(slideNumber) {
		console.log('slideNumber: ' + slideNumber +
			' this.state.slide.current: ' + this.state.slide.current +
			', num: ' + this.state.slide.num);

		if (slideNumber === 0 || slideNumber === null) {
			this.setState({
				slide: {
					show: {
						next: true,
						prev: false
					},
					current: slideNumber,
					active: true					
				}
			});
		} else if (slideNumber === this.state.slide.num-1) {
			this.setState({
				slide: {
					show: {
						next: false,
						prev: true
					},
					current: slideNumber,
					active: true					
				}
			});
		} else {
			this.setState({
				slide: {
					show: {
						next: true,
						prev: true
					},
					current: slideNumber,
					active: true					
				}
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
			display: this.state.overlay.active ? 'block' : 'none'
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
						icon={this.state.card.metadata.icon}
						title={this.state.card.metadata.name}
						summary={this.state.card.metadata.summary}
						pyramid={this.state.card.urls.background}
						slides={this.state.card.graphics}
						zoomHandler={this.toggleOverlay}
						toggleSlideHandler={this.toggleSlide}
						prevNextHandler={this.updateNextPrev}
						currentSlide={this.state.slide.current}
						activeSlide={this.state.slide.active}
						showOverlay={this.state.overlay.active} />

				</Preload>

				{ this.state.slide.show.prev &&
					<div 
						onClick={this.prev}
						className="md-prev md-np mbsc-ic mbsc-ic-arrow-left5"
						style={prevNextStyle}>
					</div>
				}

				{ this.state.slide.show.next &&
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
