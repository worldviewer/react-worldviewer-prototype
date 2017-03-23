import { connect } from 'react-redux';
import fetchCard from '../redux';
import StatelessBackend from './Backend';

const mapStateToProps = (state, ownProps) => {
	return {
		cards: state.cards
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		fetchCard: (id) => {
			return dispatch(fetchCard(id));
		}
	};
};

const Backend = connect(
	mapStateToProps,
	mapDispatchToProps
)(StatelessBackend);