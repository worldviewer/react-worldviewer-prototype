import { connect } from 'react-redux';
import SummaryStateless from './SummaryStateless.jsx';
import { openMenu } from '../redux';

const mapStateToProps = (state, ownProps) => {
	return {
		slides: state.slides,
		card: state.card,
		slideshow: state.slideshow
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		openMenu: () => {
			return dispatch(openMenu());
		}
	};
};

const Summary = connect(
	mapStateToProps,
	mapDispatchToProps
)(SummaryStateless);

export default Summary;