import React from 'react';
import Bubble from '../Bubble/Bubble.jsx';
import Icon from '../Icon/Icon.jsx';
import './ControversyCard.scss';
import DeepZoom from '../DeepZoom/DeepZoom.jsx';
import Title from '../Title/Title.jsx';
import Summary from '../Summary/Summary.jsx';
import Shade from '../Shade/Shade.jsx';

const ControversyCardStateless = React.createClass({
	spinBubbleNumbers: function() {
		this.props.disableSpinBubbleNumbers();

		setTimeout(() => {
			this.props.bubbleNumbers.active.forEach((el, num) => {
				const newTimeout = setTimeout(() => {
					this.props.spinBubbleNumber(num);
				}, (num+1)*1000);

				this.props.setSpinBubbleNumberTimeout(num, newTimeout);
			});

			// Reset the spin state to no spin
			setTimeout(() => {
				this.props.disableSpinBubbleNumbers();
			}, 9000);
		}, 5000);
	},

	// If all bubbles are shown simultaneously, the animation frame rate drops
	showBubbles: function() {
		this.props.bubbles.display.forEach((el, num) => {
			setTimeout(() => {
				this.props.showBubble(num);
			}, (num+1)*200);
		});
	},

	currentSlide: function() {
		return this.props.slideshow[this.props.slides.current].bubble;
	},

	nextSlide: function(nextProps) {
		return nextProps.slideshow[nextProps.slides.current].bubble;
	},

	handleBubbleClick: function(bubbleNumber) {
		if (this.currentSlide() && bubbleNumber === this.currentSlide().number) {
			this.props.deactivateBubble();
		} else if (!this.currentSlide() || bubbleNumber !== this.currentSlide().number) {
			this.props.clickBubble(bubbleNumber);
		}
	},

	componentDidMount: function() {
		this.showBubbles();
		this.spinBubbleNumbers();
		this.setupRotatingQuotes();

		this.props.setHeight(this.root.clientHeight);
		const resize = () => this.setupResizeHandler();
		window.addEventListener('resize', resize);
	},

	setupResizeHandler: function() {
		this.props.setHeight(this.root.clientHeight);
	},

	setupRotatingQuotes: function() {
		console.log('Setting up rotating quotes. This should happen only once ...');

		const id = setInterval(() => {
			const
				slide = this.props.slideshow[this.props.slides.current],
				totalQuotes = slide.quotes ? slide.quotes.length : 0;

			if (totalQuotes > 1) {
				this.props.toggleQuote(false);

				setTimeout(() => {

					console.log('total: ', totalQuotes);
					console.log('slide: ', slide);
					console.log('this.props.slides.current: ', this.props.slides.current);
					console.log('totalQuotes: ', totalQuotes);

					this.props.setCurrentQuote((this.props.quotes.current + 1) % totalQuotes);
					this.props.toggleQuote(true);
				}, 1000);

			} else if (totalQuotes === 1) {
				this.props.setCurrentQuote(0);
				this.props.toggleQuote(true);

			} else {
				this.props.toggleQuote(false);
			}

		}, 10000);

		this.props.setCurrentQuoteTimer(id);
	},

	// When active bubble is clicked, deactivate
	componentWillReceiveProps: function(nextProps) {
		if (this.props.slides.current !== nextProps.slides.current &&
			this.props.slides.active && !nextProps.slides.active) {
			if (!this.nextSlide(nextProps)) {
				this.props.deactivateBubble();
			}
		}
	},

	render: function() {
		return (
			<div className="Deep-Zoom-Graphic"
				ref={node => { this.root = node; }}>

				<Shade
					darkness={this.props.card.shade.darkness}
					zindex={this.props.card.shade.zindex}
					showOverlay={this.props.showOverlay} />

				<DeepZoom
					url={this.props.urls.background} />

				<Title
					key="left"
					position="Left"
					display={this.props.titleLeft}
					showOverlay={this.props.showOverlay}
					zindex={this.props.card.zindexes['title']}>
					{this.props.titleLeft.markup}
				</Title>

				<Title
					key="right"
					position="Right"
					display={this.props.titleRight}
					showOverlay={this.props.showOverlay}
					zindex={this.props.card.zindexes['title']}>
					{this.props.titleRight.markup}
				</Title>

				{this.props.overlays.loaded &&

					<Summary
						showOverlay={this.props.showOverlay}
						openMenu={this.props.openMenu}
						zindex={this.props.card.zindexes['summary']}>
						{this.props.summary}
					</Summary>

				}

				{ this.props.card.graphics.map((graphic, i) => {
					const slide = this.props.slideshow ?
						this.currentSlide() :
						null;

					const { top, left, width } = slide ?
						slide :
						graphic;

					return (<Bubble
						active={slide !== null && slide.number === i}
						enterHandler={this.spinBubbleNumbers}
						clickHandler={this.handleBubbleClick}
						key={i}
						left={left}
						bubbleNumber={i}
						numleft={graphic.numleft}
						numtop={graphic.numtop}
						showOverlay={this.props.showOverlay && this.props.bubbles.display[i]}
						source={this.props.urls.overlay + graphic.source}
						spin={this.props.bubbleNumbers.active}
						top={top}
						width={width}
						shadeElements={this.props.shadeElements}
						unshadeElements={this.props.unshadeElements}
						clearQuoteTimers={this.props.clearQuoteTimers}
						setCurrentQuote={this.props.setCurrentQuote}
						setCurrentQuoteTimer={this.props.setCurrentQuoteTimer}
						toggleQuote={this.props.toggleQuote} />)
					}
				)}

				<Icon
					key='9'
					left={this.props.card.icon.left}
					source={this.props.urls.icon + this.props.card.icon.source}
					showOverlay={this.props.showOverlay}
					top={this.props.card.icon.top}
					width={this.props.card.icon.width}
					zindex={this.props.card.zindexes['icon']} />
			</div>
		);
	}
});

export default ControversyCardStateless;
