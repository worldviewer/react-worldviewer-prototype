import React from 'react';
import './App.scss';
import ControversyCard from './ControversyCard/ControversyCard';
import './mobiscroll/mobiscroll.custom-3.0.1.min.css';
import './mobiscroll/mobiscroll-prevnext.scss';
import Spinner from './Spinner/Spinner';
import Preload from './Preload/Preload';

var AppStateless = React.createClass({
	componentDidMount: function() {
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

				{this.props.slides.prev &&
					<div 
						onClick={this.props.prevSlide}
						className="md-prev md-np mbsc-ic mbsc-ic-arrow-left5"
						style={prevNextStyle}>
					</div>
				}

				{this.props.slides.next &&
                    <div
                    	onClick={this.props.nextSlide}
                    	className="md-next md-np md-n mbsc-ic mbsc-ic-arrow-right5"
                    	style={prevNextStyle}>
                	</div>
                }

			</div>
		);
	}
});

export default AppStateless;
