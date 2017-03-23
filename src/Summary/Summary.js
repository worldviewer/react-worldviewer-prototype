import { connect } from 'react-redux';
import SummaryStateless from './SummaryStateless';
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

const Summary = connect(
	mapStateToProps,
	mapDispatchToProps
)(SummaryStateless);

export default Summary;