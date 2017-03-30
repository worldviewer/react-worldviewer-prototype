import { connect } from 'react-redux';
import SummaryStateless from './SummaryStateless.jsx';
import clickSummary from '../redux';

const mapStateToProps = (state, ownProps) => {
	return {
		slides: state.slides,
		card: state.card,
		slideshow: state.slideshow
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		clickSummary: () => {
			return dispatch(clickSummary());
		}
	};
};

const Summary = connect(
	mapStateToProps,
	mapDispatchToProps
)(SummaryStateless);

export default Summary;