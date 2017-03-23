import { connect } from 'react-redux';
import SpinnerStateless from './SpinnerStateless';
import clickOverlay from '../redux';

const mapStateToProps = (state, ownProps) => {
	return {
		overlays: state.overlays,
		slides: state.slides,
		bubbles: state.bubbles,
		card: state.card
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		clickOverlay: (num) => {
			return dispatch(clickOverlay(num));
		}
	};
};

const Spinner = connect(
	mapStateToProps,
	mapDispatchToProps
)(SpinnerStateless);

export default Spinner;