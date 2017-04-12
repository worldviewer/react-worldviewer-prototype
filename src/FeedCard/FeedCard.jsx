import { connect } from 'react-redux';
import FeedCardStateless from './FeedCardStateless.jsx';

const mapStateToProps = (state, ownProps) => {
	return {
		card: state.card
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {...ownProps}
};

const FeedCard = connect(
	mapStateToProps,
	mapDispatchToProps
)(FeedCardStateless);

export default FeedCard;
