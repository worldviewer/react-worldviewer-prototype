import React from 'react';
import TransitionGroup from 'react-addons-transition-group';
import { TweenMax, Bounce } from 'gsap';

var AnimatedNumberBubble = React.createClass({
	spinBubble: function() {
		const el = this.container['ref'];
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

		let bubbleNumber = this.props.num;

		return (
			<div
				style={roundedBorderStyle}
				ref={c => this.container =
					{ref:c, bubbleNumber:bubbleNumber}}>
				<div
					alt="Slide Number"
					className="Bubble-Number"
					style={bubbleNumberStyle}>

					<p>{bubbleNumber + 1}</p>
				</div>
			</div>
		)
	}
});

var NumberBubble = React.createClass({
	render: function() {
		return (
			<TransitionGroup component="div">
				{ this.props.showOverlay &&
					<AnimatedNumberBubble
						num={this.props.num}
						left={this.props.left}
						top={this.props.top}
						spin={this.props.spin} />
				}
			</TransitionGroup>
		);
	}
});

export default NumberBubble;
