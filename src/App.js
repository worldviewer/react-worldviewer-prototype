import { connect } from 'react-redux';
import { fetchCard, fetchCardRequest, fetchCardSuccess, fetchCardError, nextSlide, prevSlide } from './redux';
import AppStateless from './AppStateless';

const mapStateToProps = (state, ownProps) => {
	return {
		card: state.card,
		base: state.base,
		overlays: state.overlays,
		slides: state.slides,
		controls: state.controls,
		slideshow: state.slideshow
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
		}
	};
};

const App = connect(
	mapStateToProps,
	mapDispatchToProps
)(AppStateless);

export default App;