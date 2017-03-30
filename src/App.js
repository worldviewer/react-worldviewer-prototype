import { connect } from 'react-redux';
import { fetchCard, fetchCardRequest, fetchCardSuccess, fetchCardError, nextSlide, prevSlide, closeMenu } from './redux';
import AppStateless from './AppStateless';

const mapStateToProps = (state, ownProps) => {
	return {
		card: state.card,
		base: state.base,
		overlays: state.overlays,
		slides: state.slides,
		controls: state.controls,
		slideshow: state.slideshow,
		menu: state.menu
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
		}
	};
};

const App = connect(
	mapStateToProps,
	mapDispatchToProps
)(AppStateless);

export default App;