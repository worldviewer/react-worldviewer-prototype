import React from 'react';
import './Quote.scss';
import TransitionGroup from 'react-addons-transition-group';
import { TweenMax, Bounce, Elastic, Power0 } from 'gsap';
import Quote from './Quote.jsx';

// Permits HTML markup encoding for quote text
import { Parser as HtmlToReactParser } from 'html-to-react';

const AnimatedQuote = React.createClass({
	componentWillAppear: function(callback) {
		// const el = this.container;
		// TweenMax.fromTo(el, 2, {scale:0, opacity:0}, {scale:1, opacity:1, ease:Bounce.easeOut, onComplete: callback});

		callback();
	},

	componentWillEnter: function(callback) {
		// const el = this.container;
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

	// Timer is cleared in BubbleStateless' unzoom function
	componentWillReceiveProps: function(nextProps) {
	},

	componentDidMount: function() {
	},

	// Don't re-render when a timer id changes
	shouldComponentUpdate: function(nextProps) {
		// return (!(nextProps.quotes.timer !== this.props.quotes.timer));

		return true;
	},

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
					fontSize: '1.2em',
					lineHeight: '1.3em'
				}
			}) :
			null;

		let quoteMarkup = this.props.messages && this.props.messages.map((quote,i) => {
			return (<div
				style={quoteStyles[i]}
				className="Quote"
				key={i}
				ref={c => this.container = c}>

					<span style={highlighterStyles}>
						{h.parse(quote.text.unicode)}
					</span>

			</div>)
		});

		return (
			<div>
				{quoteMarkup ? quoteMarkup[this.props.active] : null}
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
						active={this.props.active}
						slide={this.props.slide} />
				}
			</TransitionGroup>
		);
	}
});

export default QuoteStateless;
