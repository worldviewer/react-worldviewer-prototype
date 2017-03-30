import { connect } from 'react-redux';
import BubbleStateless from './BubbleStateless';
import { clickBubble } from '../redux';

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
		clickBubble: (num) => {
			return dispatch(clickBubble(num));
		}
	};
};

const Bubble = connect(
	mapStateToProps,
	mapDispatchToProps
)(BubbleStateless);

export default Bubble;