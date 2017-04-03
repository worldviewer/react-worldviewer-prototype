import { connect } from 'react-redux';
import ShadeStateless from './ShadeStateless.jsx';
import { shadeElements, unshadeElements, resetElementZindexes } from '../redux';

const mapStateToProps = (state, ownProps) => {
	return {
		slides: state.slides,
		card: state.card,
		slideshow: state.slideshow
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		shadeElements: (elements, shade) => {
			return dispatch(shadeElements(elements, shade));
		},
		unshadeElements: () => {
			return dispatch(unshadeElements());
		},
		resetElementZindexes: () => {
			return dispatch(resetElementZindexes());
		}
	};
};

const Shade = connect(
	mapStateToProps,
	mapDispatchToProps
)(ShadeStateless);

export default Shade;