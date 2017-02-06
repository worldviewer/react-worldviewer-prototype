import React from 'react';
import './Title.scss';
import TransitionGroup from 'react-addons-transition-group';
import { TweenMax, Power1 } from 'gsap';

var AnimatedTitle = React.createClass({
	componentWillAppear: function (callback) {
		const el = this.container;

	    if (this.props.position === 'Center') {
		    TweenMax.from(el, 1.0, { delay:1, y:-300, opacity:0, ease:Power1.easeInOut, onComplete: callback });
		} else if (this.props.position === 'Left') {
		    TweenMax.from(el, 1.0, { delay:1, x:-300, opacity:0, ease:Power1.easeInOut, onComplete: callback });			
		} else if (this.props.position === 'Right') {
		    TweenMax.from(el, 1.0, { delay:1, x:300, opacity:0, ease:Power1.easeInOut, onComplete: callback });			
		}
	},

	componentWillEnter: function (callback) {
		const el = this.container;

	    if (this.props.position === 'Center') {
		    TweenMax.from(el, 1.0, { delay:1, y:-300, opacity:0, ease:Power1.easeInOut, onComplete: callback });
		} else if (this.props.position === 'Left') {
		    TweenMax.from(el, 1.0, { delay:1, x:-300, opacity:0, ease:Power1.easeInOut, onComplete: callback });			
		} else if (this.props.position === 'Right') {
		    TweenMax.from(el, 1.0, { delay:1, x:300, opacity:0, ease:Power1.easeInOut, onComplete: callback });			
		}
	},

	componentDidEnter: function() {
	},

	componentWillLeave: function (callback) {
	    const el = this.container;

	    if (this.props.position === 'Center') {
		    TweenMax.to(el, 1.0, { y:300, opacity:0, ease:Power1.easeInOut, onComplete: callback });
		} else if (this.props.position === 'Left') {
		    TweenMax.to(el, 1.0, { x:-300, opacity:0, ease:Power1.easeInOut, onComplete: callback });			
		} else if (this.props.position === 'Right') {
		    TweenMax.to(el, 1.0, { x:300, opacity:0, ease:Power1.easeInOut, onComplete: callback });			
		}	
	},

	componentDidLeave: function() {
	},

	render: function() {
		return (
			<p
				className={"Title " + this.props.position}
				ref={c => this.container = c}
			>
				{this.props.children}
			</p>
		)
	}
});

var Title = React.createClass({
	render: function() {
		return (
			<TransitionGroup component="div">
				{this.props.showOverlay &&
					<AnimatedTitle position={this.props.position}>
						{this.props.children}
					</AnimatedTitle>
				}
			</TransitionGroup>
		);
	}
});

export default Title;
