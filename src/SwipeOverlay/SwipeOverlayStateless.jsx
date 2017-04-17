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

		this.splatChange = new Bounce();

		this.splatChange
			.scale({
				from: { x: .8, y: 1 },
				to: { x: 1, y: 1 },
				easing: "bounce",
				duration: 500,
				delay: 0,
				bounces: 4,
				stiffness: 1
			})
			.scale({
				from: { x: 1, y: .8},
				to: { x: 1, y: 1 },
				easing: "bounce",
				duration: 500,
				delay: 0,
				bounces: 4,
				stiffness: 1
			});

		this.splatOut = new Bounce();

		this.splatOut
			.translate({
				from: { x: 0, y: 0 },
				to: { x: 500, y: 0 },
				duration: 1000,
				easing: "bounce",
				delay: 1800,
				bounces: 4,
				stiffness: 3
			})
			.skew({
				from: { x: 0, y: 0 },
				to: { x: 10, y: 0 },
				easing: "bounce",
				duration: 800,
				delay: 1750,
				bounces: 4,
				stiffness: 3
			})		

		return null;
	},

	swipedetect: function(el, callback) {
		let touchsurface = el,
			swipedir,
			startX,
			startY,
			distX,
			distY,
			threshold = 30, //required min distance traveled to be considered swipe
			restraint = 300, // maximum distance allowed at the same time in perpendicular direction
			allowedTime = 200, // maximum time allowed to travel that distance
			elapsedTime,
			startTime,
			handleswipe = callback || function(swipedir) {};
	  
		touchsurface.addEventListener('touchstart', function(e) {
			let touchobj = e.changedTouches[0];
			swipedir = 'none';
			// dist = 0;
			startX = touchobj.pageX;
			startY = touchobj.pageY;
			startTime = new Date().getTime(); // record time when finger first makes contact with surface

			// e.preventDefault();
		}, false);
	  
		// touchsurface.addEventListener('touchmove', function(e) {
		// 	e.preventDefault(); // prevent scrolling when inside DIV
		// }, false);
	  
		touchsurface.addEventListener('touchend', function(e) {
			let touchobj = e.changedTouches[0];

			distX = touchobj.pageX - startX; // get horizontal dist traveled by finger while in contact with surface
			distY = touchobj.pageY - startY; // get vertical dist traveled by finger while in contact with surface
			elapsedTime = new Date().getTime() - startTime ;// get time elapsed

			if (elapsedTime <= allowedTime) { // first condition for swipe met
				if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) { // 2nd condition for horizontal swipe met
					swipedir = (distX < 0)?  'left' : 'right'; // if dist traveled is negative, it indicates left swipe
				}
				else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint) { // 2nd condition for vertical swipe met
					swipedir = (distY < 0) ? 'up' : 'down'; // if dist traveled is negative, it indicates up swipe
				}
			}

			handleswipe(swipedir);
			// e.preventDefault();

		}, false);
	},

	componentWillAppear: function(callback) {
		const el = this.element;
		this.splatIn.applyTo(el, {onComplete: callback});
	},

	componentWillEnter: function(callback) {
		const el = this.element;
		this.splatIn.applyTo(el, {onComplete: callback});
	},

	componentDidEnter: function() {
	},

	componentWillLeave: function(callback) {
		const el = this.element;
		this.splatOut.applyTo(el, {remove: true, onComplete: callback});
	},

	componentDidLeave: function() {
	},

	componentDidMount: function() {
		const el = this.element;

		this.swipedetect(el, swipedir => {
			if (swipedir === "right") {
				this.props.deactivateOverlayHandler();
			}
		});
	},

	componentWillReceiveProps: function(nextProps) {
		const el = this.element;

		if (this.splatChange && nextProps.discourseLevel !== this.props.discourseLevel) {
			this.splatChange.applyTo(el);
		}
	},

	getPosition: function(element) {
		var xPosition = 0;
		var yPosition = 0;

		while(element) {
			xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
			yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
			element = element.offsetParent;
		}

		return { x: xPosition, y: yPosition };
	},

	clickHandler: function(e) {
		const
			el = this.element,
			y = e.clientY,
			height = el.offsetHeight,
			top = this.getPosition(el).y,
			percentY = (y - top)/height;

		let level = 0;

		if (percentY < 0.17) {
			level = 0;
		} else if (percentY < 0.40) {
			level = 1;
		} else if (percentY < 0.61) {
			level = 2;
		} else if (percentY < 0.83) {
			level = 3;
		} else {
			level = 4;
		}

		this.props.discourseHandler(level);
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

			scienceLevelImages = [worldviews, models, propositions, concepts, narratives];

		return (
			<div className="SwipeOverlay"
				style={swipeOverlayContainerStyles}>

				<img className="science-structure"
					alt="epistemology"
					src={scienceLevelImages[this.props.discourseLevel]}
					style={swipeOverlayStyles}
					ref={c => this.element = c}
					onClick={this.clickHandler} />

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
						discourseLevel={this.props.discourseLevel}
						discourseHandler={this.props.discourseHandler}
						deactivateOverlayHandler={this.props.deactivateOverlayHandler} />
				}
			</TransitionGroup>
		);
	}
});

export default SwipeOverlayStateless;
