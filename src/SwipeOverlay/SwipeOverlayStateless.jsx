import React from 'react';
import TransitionGroup from 'react-addons-transition-group';
import { TweenMax, Bounce } from 'gsap';
import './SwipeOverlay.scss';

import worldviews from '../../public/science-structure-worldviews.svg';
import models from '../../public/science-structure-models.svg';
import propositions from '../../public/science-structure-propositions.svg';
import concepts from '../../public/science-structure-concepts.svg';
import narratives from '../../public/science-structure-narratives.svg';

const AnimatedSwipeOverlay = React.createClass({
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

		console.log('swipe overlay render');

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
				<AnimatedSwipeOverlay
					isFullScreen={this.props.isFullScreen}
					discourseLevel={this.props.discourseLevel} />
			</TransitionGroup>
		);
	}
});

export default SwipeOverlayStateless;
