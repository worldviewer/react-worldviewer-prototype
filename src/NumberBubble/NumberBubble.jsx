import { connect } from 'react-redux';
import NumberBubbleStateless from './NumberBubbleStateless';
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

const NumberBubble = connect(
	mapStateToProps,
	mapDispatchToProps
)(NumberBubbleStateless);

export default NumberBubble;