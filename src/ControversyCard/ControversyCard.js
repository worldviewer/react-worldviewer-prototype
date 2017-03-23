import { connect } from 'react-redux';
import ControversyCardStateless from './ControversyCardStateless';
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

const ControversyCard = connect(
	mapStateToProps,
	mapDispatchToProps
)(ControversyCardStateless);

export default ControversyCard;