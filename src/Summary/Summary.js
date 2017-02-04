import React from 'react';
import './Summary.scss';
import TransitionGroup from 'react-addons-transition-group';
import { TweenMax } from 'gsap';

var AnimatedSummary = React.createClass({
	componentWillAppear: function (callback) {
		const el = this.container;
    	TweenMax.fromTo(el, 4.0, {opacity: 0}, {opacity: 1, onComplete: callback});		
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
		return (
			<p
				className={"Summary " + this.props.position}
				ref={c => this.container = c}
			>
				{this.props.children}
			</p>
		)
	}
});

var Summary = React.createClass({
	render: function() {
		return (
			<TransitionGroup component="div">
				{ this.props.showOverlay &&
					<AnimatedSummary>
						{this.props.children}
					</AnimatedSummary>
				}
			</TransitionGroup>
		);
	}
});

export default Summary;
