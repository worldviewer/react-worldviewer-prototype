import { connect } from 'react-redux';
import BubbleStateless from './BubbleStateless';
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

const Bubble = connect(
	mapStateToProps,
	mapDispatchToProps
)(BubbleStateless);

export default Bubble;