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

		return {}
	},

	spinBubbleNumbers: function() {
		this.props.disableSpinBubbleNumbers();

		setTimeout(() => {
			this.props.bubbleNumbers.active.forEach((el, num) => {
				let newTimeout = setTimeout(() => {
					this.props.spinBubbleNumber(num);
				}, (num+1)*1000);

				this.props.setSpinBubbleNumberTimeout(num, newTimeout);
			});

			// Reset the spin state to no spin
			setTimeout(() => {
				this.props.disableSpinBubbleNumbers();
			}, 9000);
		}, 5000);
	},

	// If all bubbles are shown simultaneously, the animation frame rate drops
	showBubbles: function() {
		this.props.bubbles.display.forEach((el, num) => {
			setTimeout(() => {
				this.props.showBubble(num);
			}, (num+1)*200);
		});
	},

	handleBubbleClick: function(index) {
		console.log('this.props.slides.current: ' + this.props.slides.current +
			' index: ' + index);

		if (index !== this.props.slides.current) {
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
		if (this.props.slides.current !== nextProps.slides.current) {
			this.handleBubbleClick(nextProps.slides.current);
		}
	},

	render: function() {
		return (
			<div className="Deep-Zoom-Graphic">
				<DeepZoom
					url={this.props.urls.background} />

				<Title
					key="left"
					position="Left"
					display={this.props.card.nameLeft}
					showOverlay={this.props.showOverlay}>
					{this.props.card.nameLeft.markup}
				</Title>

				<Title
					key="right"
					position="Right"
					display={this.props.card.nameRight}
					showOverlay={this.props.showOverlay}>
					{this.props.card.nameRight.markup}
				</Title>

				<Summary
					showOverlay={this.props.showOverlay}>
					{this.props.card.summary}
				</Summary>

				{ this.props.card.graphics.map((graphic, i) => 
					<Bubble
						active={this.props.slides.current === i && this.props.slides.active}
						enterHandler={this.spinBubbleNumbers}
						clickHandler={this.handleBubbleClick}
						key={i}
						left={graphic.left}
						bubbleNumber={i}
						numleft={graphic.numleft}
						numtop={graphic.numtop}
						showOverlay={this.props.showOverlay && this.props.bubbles.display[i]}
						source={this.props.urls.overlay + graphic.source}
						spin={this.props.bubbleNumbers.active}
						top={graphic.top}
						width={graphic.width} />
				)}

				<Icon
					key='9'
					left={this.props.card.icon.left}
					source={this.props.urls.icon + this.props.card.icon.source}
					showOverlay={this.props.showOverlay}
					top={this.props.card.icon.top}
					width={this.props.card.icon.width} />
			</div>
		);
	}
});

export default ControversyCardStateless;
