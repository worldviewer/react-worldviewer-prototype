import { connect } from 'react-redux';
import { fetchCard, fetchCardRequest, fetchCardSuccess, fetchCardError } from './redux';
import App from './App';

const mapStateToProps = (state, ownProps) => {
	return {
		card: state.card,
		base: state.base
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		fetchCard: (id, url) => {
			return dispatch(fetchCard(id, url));
		},
		fetchCardRequest: (id) => {
			return dispatch(fetchCardRequest(id));
		},
		fetchCardSuccess: (json) => {
			return dispatch(fetchCardSuccess(json));
		},
		fetchCardError: (error) => {
			return dispatch(fetchCardError(error));
		}				
	};
};

const AppState = connect(
	mapStateToProps,
	mapDispatchToProps
)(App);

export default AppState;