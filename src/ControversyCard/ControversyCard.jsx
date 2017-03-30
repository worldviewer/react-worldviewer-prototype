import { connect } from 'react-redux';
import ControversyCardStateless from './ControversyCardStateless';
import { showBubble, spinBubbleNumber, disableSpinBubbleNumbers, setSpinBubbleNumberTimeout, deactivateBubble, clickBubble, clickSummary } from '../redux';

const mapStateToProps = (state, ownProps) => {
	return {
		overlays: state.overlays,
		slides: state.slides,
		bubbles: state.bubbles,
		bubbleNumbers: state.bubbleNumbers,
		card: state.card,
		urls: state.urls,
		slideshow: state.slideshow
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		showBubble: (num) => {
			return dispatch(showBubble(num));
		},
		spinBubbleNumber: (num) => {
			return dispatch(spinBubbleNumber(num));
		},
		disableSpinBubbleNumbers: () => {
			return dispatch(disableSpinBubbleNumbers());
		},
		setSpinBubbleNumberTimeout: (num, timeout) => {
			return dispatch(setSpinBubbleNumberTimeout(num, timeout));
		},
		deactivateBubble: () => {
			return dispatch(deactivateBubble());
		},
		clickBubble: (num) => {
			return dispatch(clickBubble(num));
		},
		clickSummary: () => {
			return dispatch(clickSummary());
		}
	};
};

const ControversyCard = connect(
	mapStateToProps,
	mapDispatchToProps
)(ControversyCardStateless);

export default ControversyCard;