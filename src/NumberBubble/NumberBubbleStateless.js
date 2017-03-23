import React from 'react';
import TransitionGroup from 'react-addons-transition-group';
import { TweenMax, Bounce } from 'gsap';

var AnimatedNumberBubble = React.createClass({
	spinBubble: function() {
		const el = this.container;
		TweenMax.fromTo(el, 0.5, {rotationY:0}, {rotationY:360});
	},

	componentWillAppear: function(callback) {
		const el = this.container;
		TweenMax.fromTo(el, 3.0, {scale:0}, {delay:1.5, scale:1.0, ease:Bounce.easeOut, onComplete: callback});
	},

	componentWillEnter: function(callback) {
	},

	componentDidEnter: function() {
	},

	componentWillLeave: function(callback) {
	},

	componentDidLeave: function() {
	},

	componentWillReceiveProps: function(nextProps) {
		!this.props.spin && nextProps.spin && this.spinBubble();
	},

	render: function() {
		// Corrects an issue with creating circles w/ border-radius on mobile devices
		let roundedBorderStyle = {
			backgroundColor: '#edf5f1',
			border: '.5vw solid #edf5f1',
			borderRadius: '50%',
			height: '2vw',
			left: this.props.left,
			top: this.props.top,
			position: 'absolute',
			width: '2vw'
		}

		let bubbleNumberStyle = {
			backgroundColor: '#edf5f1',
			borderRadius: '50%',
			height: '2vw',
			position: 'absolute',
			width: '2vw'
		};

		return (
			<div
				style={roundedBorderStyle}
				ref={c => this.container = c}>
				<div
					alt="Slide Number"
					className="Bubble-Number"
					style={bubbleNumberStyle}>

					<p>{this.props.bubbleNumber + 1}</p>
				</div>
			</div>
		)
	}
});

var NumberBubbleStateless = React.createClass({
	render: function() {
		return (
			<TransitionGroup component="div">
				{ this.props.showOverlay &&
					<AnimatedNumberBubble
						bubbleNumber={this.props.bubbleNumber}
						left={this.props.left}
						top={this.props.top}
						spin={this.props.spin} />
				}
			</TransitionGroup>
		);
	}
});

export default NumberBubbleStateless;
