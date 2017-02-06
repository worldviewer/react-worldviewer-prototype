import React from 'react';
import './Summary.scss';
import TransitionGroup from 'react-addons-transition-group';
import { TweenMax, Power1 } from 'gsap';

var AnimatedSummary = React.createClass({
	componentWillAppear: function(callback) {
		const el = this.container;
		TweenMax.from(el, 1.0, { delay:1, y:300, opacity:0, ease:Power1.easeInOut, onComplete: callback });
	},

	componentWillEnter: function(callback) {
		const el = this.container;
    	TweenMax.from(el, 1.0, { delay:1, y:300, opacity:0, ease:Power1.easeInOut, onComplete: callback });		
	},

	componentDidEnter: function() {
	},

	componentWillLeave: function(callback) {
	    const el = this.container;
	    TweenMax.to(el, 1.0, { y:300, opacity:0, ease:Power1.easeInOut, onComplete: callback });	
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
