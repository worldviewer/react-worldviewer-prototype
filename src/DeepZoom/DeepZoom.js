import { connect } from 'react-redux';
import DeepZoomStateless from './DeepZoomStateless';
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

const DeepZoom = connect(
	mapStateToProps,
	mapDispatchToProps
)(DeepZoomStateless);

export default DeepZoom;