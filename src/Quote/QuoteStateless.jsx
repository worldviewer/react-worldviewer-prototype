import React from 'react';
import './Quote.scss';
import TransitionGroup from 'react-addons-transition-group';
import { TweenMax, Bounce, Elastic, Power0 } from 'gsap';
import Quote from './Quote.jsx';

const AnimatedQuote = React.createClass({
	componentWillAppear: function(callback) {
		const el = this.container;
		TweenMax.fromTo(el, 2, {scale:0, opacity:0}, {scale:1, opacity:1, ease:Bounce.easeOut, onComplete: callback});
	},

	componentWillEnter: function(callback) {
		const el = this.container;
    	TweenMax.fromTo(el, .5, {scale:1.5, opacity:0}, {scale:1, opacity:1, ease:Bounce.easeOut, onComplete: callback});
	},

	componentDidEnter: function() {
	},

	componentWillLeave: function(callback) {
	    const el = this.container;
	    TweenMax.to(el, .5, {scale:1.5, opacity:0, onComplete: callback});
	},

	componentDidLeave: function() {
	},

	componentWillReceiveProps: function(nextProps) {
	},

	render: function() {
		return (
			<Quote
				message={this.props.message}
				background={this.props.background}
				key={this.props.bubbleNumber}
				bubbleNumber={this.props.bubbleNumber}
				showOverlay={this.props.showOverlay} />
		)
	}
});

const QuoteStateless = React.createClass({
	render: function() {
		return (
			<TransitionGroup component="div">
				{ this.props.showOverlay &&
					<AnimatedQuote
						card={this.props.card}
						slideshow={this.props.slideshow}
						active={this.props.slides.active}
						key={this.props.bubbleNumber}
						showOverlay={this.props.showOverlay}
						bubbleNumber={this.props.bubbleNumber}
						slides={this.props.slides}
						/>
				}
			</TransitionGroup>
		);
	}
});

export default QuoteStateless;
