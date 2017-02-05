import React from 'react';
import './Bubble.scss';
import TransitionGroup from 'react-addons-transition-group';
import { TweenMax, Bounce } from 'gsap';

var AnimatedBubble = React.createClass({
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

	render: function() {
		let source = require('../../graphics/' + this.props.source);

		let divStyle = {
			left: this.props.left,
			position: 'absolute',
			top: this.props.top,
			width: this.props.width
		};

		// Corrects an issue with creating circles w/ border-radius on mobile devices
		let roundedBorderStyle = {
			backgroundColor: '#edf5f1',
			border: '.5vw solid #edf5f1',
			borderRadius: '50%',
			height: '2vw',
			left: this.props.numleft,
			top: this.props.numtop,
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
					style={imgStyle}
				/>

				<div style={roundedBorderStyle}>
					<div
						alt="Slide Number"
						className="Bubble-Number"
						style={bubbleNumberStyle}
					>
						<p>{bubbleNumber + 1}</p>
					</div>
				</div>
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
						source={this.props.source}
						top={this.props.top}
						width={this.props.width}
					/>
				}
			</TransitionGroup>
		);
	}
});

export default Bubble;
