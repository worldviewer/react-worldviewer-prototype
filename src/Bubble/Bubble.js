import { connect } from 'react-redux';
import BubbleStateless from './BubbleStateless';
import { clickBubble, zoomBubble, unZoomBubble } from '../redux';

const mapStateToProps = (state, ownProps) => {
	return {
		overlays: state.overlays,
		slides: state.slides,
		bubbles: state.bubbles,
		bubbleNumbers: state.bubbleNumbers,
		card: state.card,
		urls: state.urls
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		clickBubble: (num) => {
			return dispatch(clickBubble(num));
		},
		zoomBubble: (num, left, top, width, zIndex) => {
			return dispatch(zoomBubble(num, left, top, width, zIndex));
		},
		unZoomBubble: () => {
			return dispatch(unZoomBubble());
		}
	};
};

const Bubble = connect(
	mapStateToProps,
	mapDispatchToProps
)(BubbleStateless);

export default Bubble;