import { connect } from 'react-redux';
import { fetchCard, fetchCardRequest, fetchCardSuccess, fetchCardError,
	nextSlide, prevSlide, closeMenu, setCurrentQuote, clearQuoteTimers,
	setCurrentQuoteTimer, setCurrentQuoteElement, toggleQuote,
	openMenu, setLoaded } from './redux';
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
		setCurrentQuote: (current) => {
			return dispatch(setCurrentQuote(current));
		},
		setCurrentQuoteTimer: (id) => {
			return dispatch(setCurrentQuoteTimer(id));
		},
		setCurrentQuoteElement: (element) => {
			return dispatch(setCurrentQuoteElement(element));
		},
		clearQuoteTimers: () => {
			return dispatch(clearQuoteTimers());
		},
		toggleQuote: (state) => {
			return dispatch(toggleQuote(state));
		},
		openMenu: () => {
			return dispatch(openMenu());
		},
		setLoaded: () => {
			return dispatch(setLoaded());
		}
	};
};

const App = connect(
	mapStateToProps,
	mapDispatchToProps
)(AppStateless);

export default App;