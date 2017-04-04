import { connect } from 'react-redux';
import BubbleStateless from './BubbleStateless.jsx';
import { clickBubble, shadeElements, unshadeElements, resetElementZindexes } from '../redux';

const mapStateToProps = (state, ownProps) => {
	return {
		overlays: state.overlays,
		slides: state.slides,
		bubbles: state.bubbles,
		bubbleNumbers: state.bubbleNumbers,
		card: state.card,
		urls: state.urls,
		slideshow: state.slideshow,
		quotes: state.quotes
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		clickBubble: (num) => {
			return dispatch(clickBubble(num));
		},
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

const Bubble = connect(
	mapStateToProps,
	mapDispatchToProps
)(BubbleStateless);

export default Bubble;