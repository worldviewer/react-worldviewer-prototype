import React from 'react';
import './Shade.scss';
import TransitionGroup from 'react-addons-transition-group';
import { TweenMax } from 'gsap';

const AnimatedShade = React.createClass({
	componentWillAppear: function(callback) {
		// const el = this.container;
		// TweenMax.from(el, 1.0, { delay:1, y:300, opacity:0, ease:Power1.easeInOut, onComplete: callback });

		callback();
	},

	componentWillEnter: function(callback) {
		// const el = this.container;
		// TweenMax.from(el, 1.0, { delay:1, y:300, opacity:0, ease:Power1.easeInOut, onComplete: callback });

  		callback();
	},

	componentDidEnter: function() {
	},

	componentWillLeave: function(callback) {
	    // const el = this.container;
	    // TweenMax.to(el, 1.0, { y:300, opacity:0, ease:Power1.easeInOut, onComplete: callback });

	    callback();
	},

	componentDidLeave: function() {
	},

	componentWillReceiveProps: function(nextProps) {
		if (this.props.darkness !== nextProps.darkness || this.props.zindex !== nextProps.zindex) {
			const el = this.container;

			TweenMax.fromTo(el, 1, {background:`rgba(0, 0, 0, ${this.props.darkness})`}, {background:`rgba(0, 0, 0, ${nextProps.darkness})`});
		}
	},

	render: function() {
		const shadeStyles = {
			display: "block",
			zIndex: this.props.zindex,
			width: '100%',
			height: '100%',
			position: 'absolute',
			top: 0,
			left: 0,
			background: `rgba(0, 0, 0, ${this.props.darkness})`
		}

		return (
			<div
				style={shadeStyles}
				className="Shade"
				ref={c => this.container = c}
			></div>
		)
	}
});

const ShadeStateless = React.createClass({

	render: function() {
		return (
			<TransitionGroup component="div">
				{ this.props.showOverlay &&
					<AnimatedShade
						darkness={this.props.darkness}
						zindex={this.props.zindex}>
						{this.props.children}
					</AnimatedShade>
				}
			</TransitionGroup>
		);
	}
});

export default ShadeStateless;
