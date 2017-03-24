import React from 'react';
import './Bubble.scss';
import TransitionGroup from 'react-addons-transition-group';
import { TweenMax, Bounce, Elastic } from 'gsap';
import NumberBubble from '../NumberBubble/NumberBubble';

var AnimatedBubble = React.createClass({
	componentWillAppear: function(callback) {
		const el = this.container;
		TweenMax.fromTo(el, 2, {scale:0, opacity:0}, {scale:1, opacity:1, ease:Bounce.easeOut, onComplete: callback});
	},

	componentWillEnter: function(callback) {
		const el = this.container;
    	TweenMax.fromTo(el, .5, {scale:1.5, opacity:0}, {scale:1, opacity:1, ease:Bounce.easeOut, onComplete: callback});
	},

	// Send just one time for all 8 Bubbles
	componentDidEnter: function() {
		if (this.props.bubbleNumber === 0) {
			this.props.enterHandler();
		}
	},

	componentWillLeave: function(callback) {
	    const el = this.container;
	    TweenMax.to(el, .5, {scale:1.5, opacity:0, onComplete: callback});
	},

	componentDidLeave: function() {
	},

	componentWillReceiveProps: function(nextProps) {
		if (!this.props.active && nextProps.active) {
			this.zoomBubble();
		} else if (this.props.active && !nextProps.active) {
			this.unzoomBubble();
		}		
	},

	getComponent: function(index) {
		this.props.clickHandler(index);
	},

	// TODO: Refactor hardcoded zoom values when slideshow
	// state machine is created
	zoomBubble: function() {
		const el = this.container;

		this.props.zoomBubble(
			this.props.zoomBubble,
			'2vw',
			'20vw',
			'96vw',
			10
		);

		TweenMax.fromTo(el, 2, {width:this.props.width, left:this.props.left, top:this.props.top, zIndex:2},
			{width:'96vw', left:'2vw', top:'20vw', zIndex:10, ease:Elastic.easeOut});
	},

	// TODO: Refactor hardcoded zoom values when slideshow
	// state machine is created
	unzoomBubble: function() {
		const el = this.container;

		this.props.unZoomBubble();

		TweenMax.fromTo(el, 2, {width:'96vw', left:'2vw', top:'20vw', zIndex: 10},
			{width:this.props.width, left:this.props.left, top:this.props.top, zIndex:2, ease:Elastic.easeIn});
	},

	render: function() {
		console.log('zoom:');
		console.log(this.props.bubbles.zoom);

		let graphic = this.props.card.graphics[this.props.bubbleNumber];

		let divStyle = {
			left: this.props.bubbles.zoom.left || graphic.left,
			position: 'absolute',
			top: this.props.bubbles.zoom.top || graphic.top,
			width: this.props.bubbles.zoom.width || graphic.width,
			zIndex: this.props.bubbles.zoom.zIndex || graphic.zIndex
		};

		let imgStyle = {
			width: '100%'
		};

		return (
			<div style={divStyle} ref={c => this.container = c}>
				<img
					alt="Figure"
					className={"Bubble Bubble" + this.props.bubbleNumber}
					onClick={this.getComponent.bind(this, this.props.bubbleNumber)}
					src={this.props.source}
					style={imgStyle} />

				<NumberBubble
					key={this.props.bubbleNumber}
					left={this.props.numleft}
					bubbleNumber={this.props.bubbleNumber}
					showOverlay={this.props.showOverlay}
					spin={this.props.spin[this.props.bubbleNumber]}
					top={this.props.numtop} />
			</div>
		)
	}
});

var BubbleStateless = React.createClass({
	render: function() {
		return (
			<TransitionGroup component="div">
				{ this.props.showOverlay &&
					<AnimatedBubble
						card={this.props.card}
						bubbles={this.props.bubbles}
						active={this.props.active}
						clickHandler={this.props.clickHandler}
						enterHandler={this.props.enterHandler}
						key={this.props.bubbleNumber}
						left={this.props.left}
						bubbleNumber={this.props.bubbleNumber}
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

export default BubbleStateless;
