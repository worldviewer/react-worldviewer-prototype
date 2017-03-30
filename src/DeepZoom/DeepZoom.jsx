import { connect } from 'react-redux';
import DeepZoomStateless from './DeepZoomStateless.jsx';
import { toggleOverlayState } from '../redux';

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
		toggleOverlayState: (zoom) => {
			return dispatch(toggleOverlayState(zoom));
		}
	};
};

const DeepZoom = connect(
	mapStateToProps,
	mapDispatchToProps
)(DeepZoomStateless);

export default DeepZoom;