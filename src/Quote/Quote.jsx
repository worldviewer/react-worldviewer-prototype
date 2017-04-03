import { connect } from 'react-redux';
import QuoteStateless from './QuoteStateless.jsx';
import { clickBubble } from '../redux';

const mapStateToProps = (state, ownProps) => {
	return {
		slides: state.slides,
		card: state.card,
		slideshow: state.slideshow
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		showQuote: (text, duration) => {
			return dispatch(showQuote(text, duration));
		}
	};
};

const Quote = connect(
	mapStateToProps,
	mapDispatchToProps
)(QuoteStateless);

export default Quote;