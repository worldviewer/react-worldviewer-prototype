import { connect } from 'react-redux';
import * from '../redux';
import StatelessBackend from './Backend';

const mapStateToProps = (state, ownProps) => {
	return {
		cards: state.cards
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		fetchCard: (id, url) => {
			return dispatch(fetchCard(id, url));
		}
		fetchCardRequest: (id) => {
			return dispatch(fetchCardRequest(id));
		}
		fetchCardSuccess: () => {
			return dispatch(fetchCardSuccess());
		}
		fetchCardError: () => {
			return dispatch(fetchCardError());
		}				
	};
};

const Backend = connect(
	mapStateToProps,
	mapDispatchToProps
)(StatelessBackend);
