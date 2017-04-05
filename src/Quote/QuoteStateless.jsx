import React from 'react';
import './Quote.scss';
import TransitionGroup from 'react-addons-transition-group';
// import { TweenMax, Bounce, Elastic, Power0 } from 'gsap';

// Permits HTML markup encoding for quote text
import { Parser as HtmlToReactParser } from 'html-to-react';

const AnimatedQuote = React.createClass({
	componentWillAppear: function(callback) {
		// const el = this.container;
		// console.log('componentWillAppear: ', el);

		// TweenMax.fromTo(el, 2, {scale:0, opacity:0}, {scale:1, opacity:1, ease:Bounce.easeOut, onComplete: callback});

		callback();
	},

	componentWillEnter: function(callback) {
		// const el = this.container;
		// console.log('componentWillEnter: ', el);

		// TweenMax.fromTo(el, .5, {scale:1.5, opacity:0}, {scale:1, opacity:1, ease:Bounce.easeOut, onComplete: callback});

  		callback();
	},

	componentDidEnter: function() {
	},

	componentWillLeave: function(callback) {
	    // const el = this.container;
	    // TweenMax.to(el, .5, {scale:1.5, opacity:0, onComplete: callback});

	    callback();
	},

	componentDidLeave: function() {
	},

	componentWillReceiveProps: function(nextProps) {
		// const el = this.container;

		// 	TweenMax.fromTo(el, 1, {opacity:1}, {opacity:0, onComplete: () => {
		// 		TweenMax.fromTo(el, 1, {opacity:0}, {opacity:1});
		// 	}});
	},

	// Timers and current quote handling reset with bubble zooms; see BubbleStateless for
	// that logic
	render: function() {
		const
			h = new HtmlToReactParser(),
			highlighterStyles = {
				background: 'yellow'
			};

		let quoteStyles = this.props.messages ?
			this.props.messages.map((quote,i) => {
				return {
					display: "block",
					zIndex: 100,
					width: quote.width,
					position: 'absolute',
					top: quote.top,
					left: quote.left,
					color: 'black',
					margin: '2vw',
					overflow: 'none',
					textAlign: 'center',
					fontSize: '3.0vw',
					lineHeight: '1.3em'
				}
			}) :
			null;

		let quoteMarkup = this.props.messages && this.props.messages.map((quote,i) => {
			return (
				<span style={highlighterStyles}>
					{h.parse(quote.text.unicode)}
				</span>
			)
		});

		return (
			<div
				style={quoteStyles ? quoteStyles[this.props.current] : null}
				className="Quote"
				ref={c => this.container = c}>

				{quoteMarkup && this.props.active ?
					quoteMarkup[this.props.current] : null}

			</div>
		);
	}
});

const QuoteStateless = React.createClass({
	render: function() {
		return (
			<TransitionGroup component="div">
				{ this.props.showOverlay &&
					<AnimatedQuote
						messages={this.props.messages}
						timer={this.props.timer}
						current={this.props.current}
						active={this.props.active}
						slide={this.props.slide}
						slides={this.props.slides}
						setCurrentQuoteElement={this.props.setCurrentQuoteElement}>
						{this.props.children}
					</AnimatedQuote>
				}
			</TransitionGroup>
		);
	}
});

export default QuoteStateless;