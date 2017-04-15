import React from 'react';
import './App.scss';
import ControversyCard from './ControversyCard/ControversyCard.jsx';
import Spinner from './Spinner/Spinner.jsx';
import Preload from './Preload/Preload.jsx';
import Quote from './Quote/Quote.jsx';
import SwipeableViews from 'react-swipeable-views';
import FeedCard from './FeedCard/FeedCard.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';
import 'font-awesome-sass-loader';
import science from '../public/science-structure-transparent.svg';

const Menu = require('./BurgerMenu/menus/scaleDown').default;

// Permits HTML markup encoding in controversy card text
import { Parser as HtmlToReactParser } from 'html-to-react';

const AppStateless = React.createClass({
	getInitialState: function() {
		injectTapEventPlugin();

		return null;
	},

	componentDidMount: function() {
	},

	handleAssetLoadError: function(error) {
		console.log('Error loading overlay images ...');
		console.log(error);
	},

	handleAssetLoadSuccess: function() {
		console.log('All assets loaded successfully.');
		this.props.setLoaded();
	},

	handleSwipe: function(index, previous) {
		const
			discourseLevels = ['worldview', 'model', 'propositional', 'conceptual', 'narrative'],
			swipeDirection = index > previous ? 'up' : 'down';

		this.props.setDiscourseLevel(discourseLevels[index], swipeDirection);
		this.handleSwipeOverlay();
	},

	handleSwipeOverlay: function() {
		const delay = this.props.discourse.isFullScreen ? 3000 : 6000;

		this.props.activateSwipeOverlay();

		setTimeout(() => this.props.deactivateSwipeOverlay(), delay);
	},

	showSettings: function(event) {
		event.preventDefault();
	},

	isMenuOpen: function(state) {
		if (!state.isOpen) {
			this.props.closeMenu();
		} else {
			this.props.openMenu();
		}
	},

	render: function() {
		const
			h = new HtmlToReactParser(),
			loadSpinner = (<Spinner />),
			isFirstPage = this.props.slides.current === 0,
			currentSlide = this.props.slideshow[this.props.slides.current] || 0,

			hasText = this.props.slideshow &&
				currentSlide &&
				currentSlide.text,

			showBurger = !this.props.overlays.active || (!isFirstPage && hasText) ?
				true :
				false,

			prevNextStyle = {
				display: this.props.overlays.active ? 'block' : 'none',
				top: this.props.card.height/2
			},

			messages = this.props.slideshow.length > 0 ?
				this.props.slideshow[this.props.slides.current].quotes :
				null,

			containerStyles = {
				height: '100vh'
			},

			swipeOverlayContainerStyles = this.props.discourse.isFullScreen ?
				{
					left: 0,
					top: '50%',
					transform: 'translateY(-40vh)'
				} :
				{
					top: '5vh'
				},

			swipeOverlayStyles = this.props.discourse.isFullScreen ?
				{
					display: 'block',
					height: '80vh',
					margin: '0 auto'
				} :
				{
					height: '40vh',
					position: 'absolute',
					right: '10vw'
				};

		return (
			<div>
				{this.props.discourse.overlay &&
					<div className="swipe-overlay" style={swipeOverlayContainerStyles}>

						<img className="science-structure" alt="epistemology" src={science} style={swipeOverlayStyles} />
						
					</div>
				}

				<SwipeableViews axis='y' containerStyle={containerStyles} resistance onChangeIndex={this.handleSwipe}>
					<div className="Worldview" id="outer-container">

						<Menu pageWrapId="page-wrap"
							outerContainerId="outer-container"
							isOpen={this.props.menu.open}
							width='75vw'
							onStateChange={this.isMenuOpen}
							burgerToggle={showBurger}>

							{isFirstPage ?
								h.parse(this.props.card.text) :
								hasText &&
								h.parse(currentSlide.text.unicode)}

							<hr className="footnotes-line" />

							<div className="footnotes">
								{!isFirstPage && currentSlide.footnotes && currentSlide.footnotes.map((note,i) => 
									<p key={i}>{h.parse(note.markup)}</p>
								)}
							</div>
						</Menu>

						<main id="page-wrap">
							<Quote
								messages={messages}
								showOverlay={this.props.overlays.active}
								timer={this.props.quotes.id}
								current={this.props.quotes.current}
								active={this.props.quotes.active && this.props.discourse.level === 'worldview'}
								setCurrentQuoteElement={this.props.setCurrentQuoteElement}
								slide={this.props.slides.current} />

							<Preload
								cardId={this.props.card.id}
								loadingIndicator={loadSpinner}
								onError={this.handleAssetLoadError}
								onSuccess={this.handleAssetLoadSuccess}
								resolveOnError={true}
								mountChildren={true} >

								<ControversyCard
									icon={this.props.card.icon}
									titleLeft={this.props.card.nameLeft}
									titleRight={this.props.card.nameRight}
									summary={this.props.card.summary}
									currentSlide={this.props.slides.current}
									activeSlide={this.props.slides.active}
									showOverlay={this.props.overlays.active} />

							</Preload>

							{ this.props.controls.prev &&
							  this.props.overlays.loaded &&
							  this.props.discourse.level === "worldview" &&
								<div 
									onClick={this.props.prevSlide}
									className="prev-next prev"
									style={prevNextStyle}>

										<span className="fa-stack fa-lg">
											<i className="fa fa-circle fa-stack-2x fa-inverse"></i>
											<i className="circles fa fa-arrow-circle-left fa-stack-1x"></i>
										</span>

								</div>
							}

							{ this.props.controls.next &&
							  this.props.overlays.loaded &&
							  this.props.discourse.level === "worldview" &&
			                    <div
			                    	onClick={this.props.nextSlide}
			                    	className="prev-next next"
			                    	style={prevNextStyle}>

										<span className="fa-stack fa-lg">
											<i className="fa fa-circle fa-stack-2x fa-inverse"></i>
											<i className="circles fa fa-arrow-circle-right fa-stack-1x"></i>
										</span>

			                	</div>
			                }
		                </main>

					</div>

					<div className="Model">
						<FeedCard level="model" />
					</div>

					<div className="Propositional">
						<FeedCard level="propositional" />
					</div>

					<div className="Conceptual">
						<FeedCard level="conceptual" />
					</div>

					<div className="Narrative">
						<FeedCard level="narrative" />
					</div>
				</SwipeableViews>
			</div>
		);
	}
});

export default AppStateless;
