import { connect } from 'react-redux';
import { fetchCard, fetchCardRequest, fetchCardSuccess, fetchCardError,
	nextSlide, prevSlide, closeMenu, setActiveQuote, clearQuoteTimers,
	setActiveQuoteTimer } from './redux';
import AppStateless from './AppStateless.jsx';

const mapStateToProps = (state, ownProps) => {
	return {
		card: state.card,
		base: state.base,
		overlays: state.overlays,
		slides: state.slides,
		controls: state.controls,
		slideshow: state.slideshow,
		menu: state.menu,
		quotes: state.quotes
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		fetchCard: (id, url) => {
			return dispatch(fetchCard(id, url));
		},
		fetchCardRequest: (id) => {
			return dispatch(fetchCardRequest(id));
		},
		fetchCardSuccess: (json) => {
			return dispatch(fetchCardSuccess(json));
		},
		fetchCardError: (error) => {
			return dispatch(fetchCardError(error));
		},
		nextSlide: () => {
			return dispatch(nextSlide());
		},
		prevSlide: () => {
			return dispatch(prevSlide());
		},
		closeMenu: () => {
			return dispatch(closeMenu());
		},
		setActiveQuote: (active) => {
			return dispatch(setActiveQuote(active));
		},
		setActiveQuoteTimer: (id) => {
			return dispatch(setActiveQuoteTimer(id));
		},
		clearQuoteTimers: () => {
			return dispatch(clearQuoteTimers());
		}
	};
};

const App = connect(
	mapStateToProps,
	mapDispatchToProps
)(AppStateless);

export default App;