import React from 'react';
import './Bubble.scss';
import TransitionGroup from 'react-addons-transition-group';
import { TweenMax, Bounce } from 'gsap';
import NumberBubble from '../NumberBubble/NumberBubble';

var AnimatedBubble = React.createClass({
	spinBubble: function() {
		const el = this.numContainer['ref'];
		TweenMax.fromTo(el, 0.5, {rotationY:0}, {rotationY:360});
	},

	componentWillAppear: function (callback) {
		const el = this.container;
		TweenMax.fromTo(el, 0.5, {scale:0.5}, {scale:1.0, ease:Bounce.easeOut, onComplete: callback});
	},

	componentWillEnter: function (callback) {
		const el = this.container;
    	TweenMax.fromTo(el, 2.0, {opacity: 0}, {opacity: 1, onComplete: callback});		
	},

	componentDidEnter: function() {
	},

	componentWillLeave: function (callback) {
	    const el = this.container;
	    TweenMax.fromTo(el, 2.0, {opacity: 1}, {opacity: 0, onComplete: callback});		
	},

	componentDidLeave: function() {
	},

	componentWillReceiveProps: function() {
		this.props.spin && this.spinBubble();
	},

	render: function() {
		let source = require('../../graphics/' + this.props.source);

		let divStyle = {
			left: this.props.left,
			position: 'absolute',
			top: this.props.top,
			width: this.props.width
		};

		let imgStyle = {
			width: '100%'
		};

		let bubbleNumber = this.props.num;

		return (
			<div style={divStyle} ref={c => this.container = c}>
				<img
					alt="Figure"
					className={"Bubble Bubble" + bubbleNumber}
					src={source}
					style={imgStyle} />

				<NumberBubble
					left={this.props.numleft}
					num={this.props.num}
					showOverlay={this.props.showOverlay}
					spin={this.props.spin}
					top={this.props.numtop} />
			</div>
		)
	}
});

var Bubble = React.createClass({
	render: function() {
		return (
			<TransitionGroup component="div">
				{ this.props.showOverlay &&
					<AnimatedBubble
						left={this.props.left}
						num={this.props.num}
						numleft={this.props.numleft}
						numtop={this.props.numtop}
						showOverlay={this.props.showOverlay}
						source={this.props.source}
						top={this.props.top}
						width={this.props.width} />
				}
			</TransitionGroup>
		);
	}
});

export default Bubble;
