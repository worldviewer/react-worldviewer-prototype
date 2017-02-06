import React from 'react';
import './Bubble.scss';
import TransitionGroup from 'react-addons-transition-group';
import { TweenMax, Bounce } from 'gsap';
import NumberBubble from '../NumberBubble/NumberBubble';

var AnimatedBubble = React.createClass({
	componentWillAppear: function (callback) {
		const el = this.container;
		TweenMax.fromTo(el, 2, {scale:0, opacity:0}, {scale:1, opacity:1, ease:Bounce.easeOut, onComplete: callback});
	},

	componentWillEnter: function (callback) {
		const el = this.container;
    	TweenMax.fromTo(el, .5, {scale:1.5, opacity:0}, {scale:1, opacity:1, ease:Bounce.easeOut, onComplete: callback});
	},

	// Send just one time for all 8 Bubbles
	componentDidEnter: function() {
		if (this.props.num === 0) {
			this.props.enterHandler();
		}
	},

	componentWillLeave: function (callback) {
	    const el = this.container;
	    TweenMax.to(el, .5, {scale:1.5, opacity:0, onComplete: callback});
	},

	componentDidLeave: function() {
	},

	getComponent: function(index) {
		this.props.clickHandler(index);
	},

	render: function() {
		let source = require('../../graphics/' + this.props.source);

		let divStyle = {
			left: this.props.left,
			position: 'absolute',
			top: this.props.top,
			width: this.props.width
		};

		let imgStyle = {
			width: '100%'
		};

		return (
			<div style={divStyle} ref={c => this.container = c}>
				<img
					alt="Figure"
					className={"Bubble Bubble" + this.props.num}
					onClick={this.getComponent.bind(this, this.props.num)}
					src={source}
					style={imgStyle} />

				<NumberBubble
					key={this.props.num}
					left={this.props.numleft}
					num={this.props.num}
					showOverlay={this.props.showOverlay}
					spin={this.props.spin[this.props.num]}
					top={this.props.numtop} />
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
						clickHandler={this.props.clickHandler}
						enterHandler={this.props.enterHandler}
						key={this.props.num}
						left={this.props.left}
						num={this.props.num}
						numleft={this.props.numleft}
						numtop={this.props.numtop}
						showOverlay={this.props.showOverlay}
						source={this.props.source}
						spin={this.props.spin}
						top={this.props.top}
						width={this.props.width} />
				}
			</TransitionGroup>
		);
	}
});

export default Bubble;
