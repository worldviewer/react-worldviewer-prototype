import React from 'react';
import './Quote.scss';
import TransitionGroup from 'react-addons-transition-group';
import Bounce from '../../public/bounce.min.js';

// Permits HTML markup encoding for quote text
import { Parser as HtmlToReactParser } from 'html-to-react';

const AnimatedQuote = React.createClass({
	getInitialState: function() {
		this.splatIn = new Bounce();

		this.splatIn
			.scale({
				from: { x: 1, y: 1 },
				to: { x: 0.1, y: 2.3 },
				easing: "sway",
				duration: 800,
				delay: 65,
				bounces: 4,
				stiffness: 2
			})
			.scale({
				from: { x: 1, y: 1},
				to: { x: 5, y: 1 },
				easing: "sway",
				duration: 300,
				delay: 30,
				bounces: 4,
				stiffness: 3
			});

		this.splatOut = new Bounce();

		this.splatOut
			.scale({
				from: { x: 1, y: 1 },
				to: { x: 0.1, y: 2.3 },
				easing: "sway",
				duration: 800,
				delay: 400,
				bounces: 4,
				stiffness: 2
			})
			.scale({
				from: { x: 1, y: 1},
				to: { x: 0, y: 0 },
				easing: "bounce",
				duration: 1000,
				delay: 800,
				bounces: 4,
				stiffness: 3
			});

		return null;
	},

	componentWillAppear: function(callback) {
		const el = this.container;
		this.splatIn.applyTo(el, {onComplete: callback});
	},

	componentWillEnter: function(callback) {
		const el = this.container;
		this.splatIn.applyTo(el, {onComplete: callback});
	},

	componentDidEnter: function() {
	},

	componentWillLeave: function(callback) {
	    const el = this.container;
	    this.splatOut.applyTo(el, {remove: true, onComplete: callback});
	},

	componentDidLeave: function() {
	},

	componentWillReceiveProps: function(nextProps) {
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
					fontSize: '3.5vw',
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
				{ this.props.active &&
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
