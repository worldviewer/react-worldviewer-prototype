import { connect } from 'react-redux';
import Bubble from './Bubble';
import clickOverlay from '../redux';

const mapStateToProps = (state, ownProps) => {
	return {
		overlays: state.overlays,
		slides: state.slides,
		bubbles: state.bubbles,
		cards: state.cards
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		clickOverlay: (num) => {
			return dispatch(clickOverlay(num));
		}
	};
};

const BubbleState = connect(
	mapStateToProps,
	mapDispatchToProps
)(Bubble);

export default BubbleState;