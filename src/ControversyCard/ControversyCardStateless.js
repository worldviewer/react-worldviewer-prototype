import React from 'react';
import Bubble from '../Bubble/Bubble';
import Icon from '../Icon/Icon';
import './ControversyCard.scss';
import DeepZoom from '../DeepZoom/DeepZoom';
import Title from '../Title/Title';
import Summary from '../Summary/Summary';
import Backend from '../Backend/Backend';

var ControversyCardStateless = React.createClass({
	getInitialState: function() {
		this.backend = new Backend();

		return {
			spin: Array.from({length:8}, el => false),
			spinTimeouts: Array.from({length:8}, el => 0),
			display: Array.from({length:8}, el => false)
		}
	},

	// disableSpinBubbleNumbers: function() {
	// 	this.state.spinTimeouts.forEach( (timeout) => {
	// 		clearTimeout(timeout);
	// 	});

	// 	this.setState({
	// 		spin: Array.from({length:8}, el => false),
	// 		spinTimeouts: Array.from({length:8}, el => 0)
	// 	});
	// },

	spinBubbleNumbers: function() {
		this.props.disableSpinBubbleNumbers();

		setTimeout(() => {
			this.state.spin.forEach( (el, i) => {
				let newTimeout = setTimeout(() => {
					let newSpinState = Array.from({length:8}, el => false);
					newSpinState[i] = true;

					this.setState({
						spin: newSpinState
					});
				}, (i+1)*1000);

				let spinTimeouts = this.state.spinTimeouts;
				spinTimeouts[i] = newTimeout;

				this.setState({
					spinTimeouts: spinTimeouts
				});
			});

			// Reset the spin state to no spin
			setTimeout(() => {
				this.props.disableSpinBubbleNumbers();
			}, 9000);
		}, 5000);
	},

	// If all bubbles are shown simultaneously, the animation frame rate drops
	showBubbles: function() {
		this.state.display.forEach( (el, i) => {
			setTimeout(() => {
				let newDisplayState = this.state.display;
				newDisplayState[i] = true;

				this.setState({
					display: newDisplayState
				});
			}, (i+1)*200);
		});
	},

	handleBubbleClick: function(index) {
		console.log('this.props.currentSlide: ' + this.props.currentSlide +
			' index: ' + index);

		if (index !== this.props.currentSlide) {
			this.props.prevNextHandler(index);
		} else {
			this.props.toggleSlideHandler();
		}
	},

	componentDidMount: function() {
		this.showBubbles();
		this.spinBubbleNumbers();		
	},

	componentWillReceiveProps: function(nextProps) {
		if (this.props.currentSlide !== nextProps.currentSlide) {
			this.handleBubbleClick(nextProps.currentSlide);
		}
	},

	render: function() {
		return (
			<div className="Deep-Zoom-Graphic">
				<DeepZoom
					url={this.props.background}
					onZoom={this.props.zoomHandler} />

				<Title
					key="left"
					position="Left"
					display={this.props.title.display.left}
					showOverlay={this.props.showOverlay}>
					{this.props.title.display.left.markup}
				</Title>

				<Title
					key="right"
					position="Right"
					display={this.props.title.display.right}
					showOverlay={this.props.showOverlay}>
					{this.props.title.display.right.markup}
				</Title>

				<Summary
					showOverlay={this.props.showOverlay}>
					{this.props.summary}
				</Summary>

				{ this.props.card.graphics.map( (el, i) => 
					<Bubble
						active={this.props.currentSlide === i && this.props.activeSlide}
						enterHandler={this.spinBubbleNumbers}
						clickHandler={this.handleBubbleClick}
						key={i}
						left={el.left}
						bubbleNumber={i}
						numleft={el.numleft}
						numtop={el.numtop}
						showOverlay={this.props.showOverlay && this.state.display[i]}
						source={this.backend.getOverlayBase() + el.source}
						spin={this.state.spin}
						top={el.top}
						width={el.width} />
				)}

				<Icon
					key='9'
					left={this.props.icon.left}
					source={this.backend.getIconBase() + this.props.icon.source}
					showOverlay={this.props.showOverlay}
					top={this.props.icon.top}
					width={this.props.icon.width} />
			</div>
		);
	}
});

export default ControversyCardStateless;
