import React from 'react';
import TransitionGroup from 'react-addons-transition-group';
import Bounce from '../../public/bounce.min.js';
import './SwipeOverlay.scss';

import worldviews from '../../public/science-structure-worldviews.svg';
import models from '../../public/science-structure-models.svg';
import propositions from '../../public/science-structure-propositions.svg';
import concepts from '../../public/science-structure-concepts.svg';
import narratives from '../../public/science-structure-narratives.svg';

const AnimatedSwipeOverlay = React.createClass({
	getInitialState: function() {
		this.splatIn = new Bounce();

		this.splatIn
			.translate({
				from: { x: 100, y: 0 },
				to: { x: 0, y: 0 },
				duration: 600,
				easing: "bounce",
				delay: 0,
				bounces: 4,
				stiffness: 4
			})
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
			})
			.translate({
				from: { x: 0, y: 0 },
				to: { x: 100, y: 0 },
				duration: 600,
				easing: "bounce",
				delay: 0,
				bounces: 4,
				stiffness: 4
			});	

		return null;
	},

	componentWillAppear: function(callback) {
		const el = this.container;
		this.splatIn.applyTo(el);
		callback();
		// TweenMax.fromTo(el, 2, {scale:0.5}, {scale:1.0, onComplete: callback});
	},

	componentWillEnter: function(callback) {
		const el = this.container;
		this.splatIn.applyTo(el);
		callback();
    	// TweenMax.fromTo(el, 1.0, {opacity: 0}, {opacity: 1, onComplete: callback});
	},

	componentDidEnter: function() {
	},

	componentWillLeave: function(callback) {
		console.log('will leave');

	    const el = this.container;
	    this.splatOut.applyTo(el);
	    callback();
	    // TweenMax.fromTo(el, 1.0, {opacity: 1}, {opacity: 0, onComplete: callback});
	},

	componentDidLeave: function() {
	},

	componentDidMount: function() {
	},

	render: function() {
		const
			swipeOverlayContainerStyles = this.props.isFullScreen ?
				{
					left: 0,
					top: '50%',
					transform: 'translateY(-40vh)'
				} :
				{
					top: '30px'
				},

			swipeOverlayStyles = this.props.isFullScreen ?
				{
					display: 'block',
					height: '80vh',
					margin: '0 auto'
				} :
				{
					height: '40vh',
					position: 'absolute',
					right: '30px'
				},

			scienceLevelImages = {
				worldview : worldviews,
				model : models,
				propositional : propositions,
				conceptual : concepts,
				narrative : narratives
			};

		return (
			<div className="SwipeOverlay"
				style={swipeOverlayContainerStyles}
				ref={c => this.container = c}>

				<img className="science-structure" alt="epistemology" src={scienceLevelImages[this.props.discourseLevel]} style={swipeOverlayStyles} />

			</div>
		)
	}
});

const SwipeOverlayStateless = React.createClass({
	render: function() {
		return (
			<TransitionGroup component="div">
				{ this.props.active &&
					<AnimatedSwipeOverlay
						isFullScreen={this.props.isFullScreen}
						discourseLevel={this.props.discourseLevel} />
				}
			</TransitionGroup>
		);
	}
});

export default SwipeOverlayStateless;
