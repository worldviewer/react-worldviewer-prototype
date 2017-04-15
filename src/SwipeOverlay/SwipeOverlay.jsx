import { connect } from 'react-redux';
import SwipeOverlayStateless from './SwipeOverlayStateless.jsx';
// import clickOverlay from '../redux';

const mapStateToProps = (state, ownProps) => {
	return {
		discourse: state.discourse
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {...ownProps};
};

const SwipeOverlay = connect(
	mapStateToProps,
	mapDispatchToProps
)(SwipeOverlayStateless);

export default SwipeOverlay;
