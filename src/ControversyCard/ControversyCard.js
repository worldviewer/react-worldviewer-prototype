import React from 'react';
import Bubble from '../Bubble/Bubble';
import Icon from '../Icon/Icon';
import './ControversyCard.scss';
import DeepZoom from '../DeepZoom/DeepZoom';
import Title from '../Title/Title';
import Summary from '../Summary/Summary';

var ControversyCard = React.createClass({
	getInitialState: function() {
		let api = 'https://apibaas-trial.apigee.net/controversies-of-science/sandbox/graphics/';

		return {
			bubbles: [
				{source: api + '26396ee5-f630-11e6-be71-0eec2415f3df', left: '7vw', top: '23vw', width: '24vw', numleft: '20vw', numtop: '4.5vw'},
				{source: api + '31f37276-f630-11e6-9a38-0ad881f403bf', left: '6vw', top: '55vw', width: '14vw', numleft: '5.5vw', numtop: '-1vw'},
				{source: api + '416a3010-f630-11e6-9a38-0ad881f403bf', left: '21vw', top: '50vw', width: '10vw', numleft: '1vw', numtop: '-0.5vw'},
				{source: api + '4da59868-f630-11e6-be71-0eec2415f3df', left: '37vw', top: '33vw', width: '12vw', numleft: '-1vw', numtop: '3vw'},
				{source: api + '57f955d1-f630-11e6-9a38-0ad881f403bf', left: '52vw', top: '27vw', width: '16vw', numleft: '14vw', numtop: '6.5vw'},
				{source: api + '5e74e181-f630-11e6-8477-122e0737977d', left: '70vw', top: '36vw', width: '9vw', numleft: '0vw', numtop: '0vw'},
				{source: api + '6b41b46f-f630-11e6-8477-122e0737977d', left: '69vw', top: '46vw', width: '9vw', numleft: '0.5vw', numtop: '6.5vw'},
				{source: api + '737d405a-f630-11e6-8477-122e0737977d', left: '78vw', top: '49vw', width: '16vw', numleft: '11vw', numtop: '0.5vw'}
			],
			icon: {
				source: api + '7bb12a07-f630-11e6-8477-122e0737977d'
			},
			spin: [false, false, false, false, false, false, false, false],
			spinTimeouts: [0,0,0,0,0,0,0,0],
			display: [false, false, false, false, false, false, false, false]
		}
	},

	disableSpinBubbleNumbers: function() {
		this.state.spinTimeouts.forEach( (timeout) => {
			clearTimeout(timeout);
		});

		this.setState({
			spin: [false, false, false, false, false, false, false, false],
			spinTimeouts: [0,0,0,0,0,0,0,0]
		});
	},

	spinBubbleNumbers: function() {
		this.disableSpinBubbleNumbers();

		setTimeout(() => {
			this.state.spin.forEach( (el, i) => {
				let newTimeout = setTimeout(() => {
					let newSpinState = [false, false, false, false, false, false, false, false];
					newSpinState[i] = true;

					this.setState({
						spin: newSpinState
					});
				}, (i+1)*1000);

				let spinTimeouts = this.state.spinTimeouts;
				spinTimeouts[i] = newTimeout;

				this.setState({
					spinTimeouts: spinTimeouts
				});
			});

			// Reset the spin state to no spin
			setTimeout(() => {
				this.disableSpinBubbleNumbers();
			}, 9000);
		}, 5000);
	},

	// If all bubbles are shown simultaneously, the animation frame rate drops
	showBubbles: function() {
		this.state.display.forEach( (el, i) => {
			setTimeout(() => {
				let newDisplayState = this.state.display;
				newDisplayState[i] = true;

				this.setState({
					display: newDisplayState
				});
			}, (i+1)*200);
		});
	},

	handleBubbleClick: function(index) {
		console.log('this.props.currentSlide: ' + this.props.currentSlide +
			' index: ' + index);

		if (index !== this.props.currentSlide) {
			this.props.prevNextHandler(index);
		} else {
			this.props.toggleSlideHandler();
		}
	},

	componentDidMount: function() {

		setTimeout(() => {
			this.showBubbles();
			this.spinBubbleNumbers();
		}, 2000);
	},

	componentWillReceiveProps: function(nextProps) {
		if (this.props.currentSlide !== nextProps.currentSlide) {
			this.handleBubbleClick(nextProps.currentSlide);
		}
	},

	render: function() {
		return (
			<div className="Deep-Zoom-Graphic">
				<DeepZoom
					url={process.env.PUBLIC_URL + "/pyramid_files/"}
					onZoom={this.props.zoomHandler} />

				<Title
					key="left"
					position="Left"
					showOverlay={this.props.showOverlay}>
					Halton<br/>Arp
				</Title>

				<Title
					key="right"
					position="Right"
					showOverlay={this.props.showOverlay}>
					The<br/>Modern<br/>Galileo
				</Title>

				<Summary
					showOverlay={this.props.showOverlay}>
					He Was a Professional Astronomer Who<br/>Began his Career as Edwin Hubble's Assistant / While Compiling a List of Peculiar Galaxies, Arp Discovered that High-Redshift Quasars are Commonly Associated with or Even Connected by Filaments to Lower-Redshift Galaxies / Since the Big Bang Requires that Differences in Redshift Place the Objects at Different Locations, Astronomers Commonly Reject Arp's Claims / But if he is Right, then there Was No Big Bang
				</Summary>

				{ this.state.bubbles.map( (el, i) => 
					<Bubble
						active={this.props.currentSlide === i && this.props.activeSlide}
						enterHandler={this.spinBubbleNumbers}
						clickHandler={this.handleBubbleClick}
						key={i}
						left={el.left}
						num={i}
						numleft={el.numleft}
						numtop={el.numtop}
						showOverlay={this.props.showOverlay && this.state.display[i]}
						source={el.source}
						spin={this.state.spin}
						top={el.top}
						width={el.width} />
				)}

				<Icon
					key='9'
					left='78vw'
					source={this.state.icon.source}
					showOverlay={this.props.showOverlay}
					top='67vw'
					width='13vw' />
			</div>
		);
	}
});

export default ControversyCard;
