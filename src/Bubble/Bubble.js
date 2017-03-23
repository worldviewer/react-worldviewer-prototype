import React from 'react';
import { PropTypes } from 'react';
import './Bubble.scss';
import TransitionGroup from 'react-addons-transition-group';
import { TweenMax, Bounce, Elastic } from 'gsap';
import NumberBubble from '../NumberBubble/NumberBubble';

var AnimatedBubble = React.createClass({
	getInitialState: function() {
		return {
			left: this.props.left,
			top: this.props.top,
			width: this.props.width,
			zIndex: 2
		}
	},

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
		if (this.props.num === 0) {
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

	zoomBubble: function() {
		const el = this.container;
		TweenMax.fromTo(el, 2, {width:this.props.width, left:this.props.left, top:this.props.top, zIndex:2},
			{width:'96vw', left:'2vw', top:'20vw', zIndex:10, ease:Elastic.easeOut});

		this.setState({
			left: '2vw',
			top: '20vw',
			width: '96vw',
			zIndex: 10
		});
	},

	unzoomBubble: function() {
		const el = this.container;
		TweenMax.fromTo(el, 2, {width:'96vw', left:'2vw', top:'20vw', zIndex: 10},
			{width:this.props.width, left:this.props.left, top:this.props.top, zIndex:2, ease:Elastic.easeIn});

		this.setState({
			left: this.props.left,
			top: this.props.top,
			width: this.props.width,
			zIndex: 2
		});
	},

	render: function() {
		let divStyle = {
			left: this.state.left,
			position: 'absolute',
			top: this.state.top,
			width: this.state.width,
			zIndex: this.state.zIndex
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
					src={this.props.source}
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
	contextTypes: function() {
		return {
			store: PropTypes.object.isRequired			
		}
	},

	render: function() {
		const { store } = this.context;
		// const state = store.getState();

		console.log(store); // this does not work
		console.log(this.props.bubbles); // this DOES work

		return (
			<TransitionGroup component="div">
				{ this.props.showOverlay &&
					<AnimatedBubble
						active={this.props.active}
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
