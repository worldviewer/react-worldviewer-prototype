import React from 'react';
import TransitionGroup from 'react-addons-transition-group';
import { TweenMax, Power4 } from 'gsap';
import spinner from './explosion-spinner.svg';

const AnimatedSpinner = React.createClass({
	componentWillAppear: function(callback) {
		const el = this.container;

		TweenMax.fromTo(el, 1, {scale:0, opacity:0},
			{scale:1, opacity:1, ease:Power4.easeOut, onComplete: callback});
	},

	componentWillEnter: function(callback) {
		const el = this.container;

    	TweenMax.fromTo(el, .5, {scale:1.5, opacity:0},
    		{scale:1, opacity:1, ease:Power4.easeOut, onComplete: callback});
	},

	componentDidEnter: function(callback) {
	},

	componentWillLeave: function(callback) {
	    const el = this.container;

	    TweenMax.to(el, .5, {scale:0, opacity:0, onComplete: callback});
	},

	componentDidLeave: function() {
	},

	componentDidMount: function() {
	},

	render: function() {
		const spinnerStyle = {
			alignItems: "center",
			display: "flex",
			height: "100%",
			justifyContent: "center",
			position: "absolute",
			width: "100%",
			zIndex: 100
		};

		return (
			<div style={spinnerStyle}>
				<img
					ref={c => this.container = c}
					alt="Explosion Emoji Spinner"
					className="Spinner"
					src={spinner} />
			</div>
		)
	}
});

const Spinner = React.createClass({
	render: function() {
		return (
			<TransitionGroup component="div">
				<AnimatedSpinner
					source={this.props.source} />
			</TransitionGroup>
		);
	}
});

export default Spinner;
