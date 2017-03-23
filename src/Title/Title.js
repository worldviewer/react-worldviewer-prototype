import { connect } from 'react-redux';
import TitleStateless from './TitleStateless';
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

const Title = connect(
	mapStateToProps,
	mapDispatchToProps
)(TitleStateless);

export default Title;