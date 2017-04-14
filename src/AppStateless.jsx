import React from 'react';
import './App.scss';
import ControversyCard from './ControversyCard/ControversyCard.jsx';
import Spinner from './Spinner/Spinner.jsx';
import Preload from './Preload/Preload.jsx';
import Quote from './Quote/Quote.jsx';
import SwipeableViews from 'react-swipeable-views';
import FeedCard from './FeedCard/FeedCard.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';
import 'font-awesome-webpack';

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
			};

		return (
			<SwipeableViews axis='y' containerStyle={containerStyles} resistance enableMouseEvents>
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
							active={this.props.quotes.active}
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

						{this.props.controls.prev && this.props.overlays.loaded &&
							<div 
								onClick={this.props.prevSlide}
								className="prev-next prev"
								style={prevNextStyle}>

									<div className="inner-prev-next">
										<i className="circles fa fa-arrow-circle-left" aria-hidden="true"></i>
									</div>

							</div>
						}

						{this.props.controls.next && this.props.overlays.loaded &&
		                    <div
		                    	onClick={this.props.nextSlide}
		                    	className="prev-next next"
		                    	style={prevNextStyle}>

		                    		<div className="inner-prev-next">
										<i className="circles fa fa-arrow-circle-right" aria-hidden="true"></i>
									</div>

		                	</div>
		                }
	                </main>

				</div>

				<div className="Model">
					<FeedCard />
				</div>

				<div className="Propositional">
					<FeedCard />
				</div>

				<div className="Conceptual">
					<FeedCard />
				</div>

				<div className="Narrative">
					<FeedCard />
				</div>
			</SwipeableViews>
		);
	}
});

export default AppStateless;