import React from 'react';
import TransitionGroup from 'react-addons-transition-group';
import { TweenMax, Bounce } from 'gsap';

const AnimatedIcon = React.createClass({
	componentWillAppear: function(callback) {
		const el = this.container;
		TweenMax.fromTo(el, 2, {scale:0.5}, {scale:1.0, ease:Bounce.easeOut, onComplete: callback});
	},

	componentWillEnter: function(callback) {
		const el = this.container;
    	TweenMax.fromTo(el, 1.0, {opacity: 0}, {opacity: 1, onComplete: callback});		
	},

	componentDidEnter: function() {
	},

	componentWillLeave: function(callback) {
	    const el = this.container;
	    TweenMax.fromTo(el, 1.0, {opacity: 1}, {opacity: 0, onComplete: callback});		
	},

	componentDidLeave: function() {
	},

	render: function() {

		const style = {
			position: 'absolute',
			left: this.props.left,
			top: this.props.top,
			width: this.props.width
		}

		return (
			<img
				alt="Figure"
				className="Icon"
				ref={c => this.container = c}
				src={this.props.source}
				style={style}
			/>
		)
	}
});

const IconStateless = React.createClass({
	render: function() {
		return (
			<TransitionGroup component="div">
				{this.props.showOverlay &&
					<AnimatedIcon
						source={this.props.source}
						left={this.props.left}
						top={this.props.top}
						width={this.props.width}
					/>
				}
			</TransitionGroup>
		);
	}
});

export default IconStateless;
