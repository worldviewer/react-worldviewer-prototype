import deepAssign from 'deep-assign';

const types = {
	SHOW_BUBBLE: 'SHOW_BUBBLE',
	SPIN_BUBBLE_NUMBER: 'SPIN_BUBBLE_NUMBER',
	DISABLE_SPIN_BUBBLE_NUMBERS: 'DISABLE_SPIN_BUBBLE_NUMBERS',
	SET_SPIN_BUBBLE_NUMBER_TIMEOUT: 'SET_SPIN_BUBBLE_NUMBER_TIMEOUT',
	CLICK_BUBBLE: 'CLICK_BUBBLE',

	CLICK_ICON: 'CLICK_ICON',

	NEXT_SLIDE: 'NEXT_SLIDE',
	PREV_SLIDE: 'PREV_SLIDE',

	FETCH_CARD_REQUEST: 'FETCH_CARD_REQUEST',
	FETCH_CARD_ERROR: 'FETCH_CARD_ERROR',
	FETCH_CARD_SUCCESS: 'FETCH_CARD_SUCCESS',

	FETCH_OVERLAY_REQUEST: 'FETCH_OVERLAY_REQUEST',
	FETCH_OVERLAY_ERROR: 'FETCH_OVERLAY_ERROR',
	FETCH_OVERLAY_SUCCESS: 'FETCH_OVERLAY_SUCCESS',

	FETCH_BACKGROUND_REQUEST: 'FETCH_BACKGROUND_REQUEST',
	FETCH_BACKGROUND_ERROR: 'FETCH_BACKGROUND_ERROR',
	FETCH_BACKGROUND_SUCCESS: 'FETCH_BACKGROUND_SUCCESS'
};

const initialState = {
	base: {
		api: 'https://czlxg9sj34.execute-api.us-east-1.amazonaws.com/dev/cards/',
		background: 'https://controversy-cards-assets.s3.amazonaws.com/',
		overlay: 'https://controversy-cards-assets.s3.amazonaws.com/'
	},
	card: {
		id: '58b8f1f7b2ef4ddae2fb8b17',
		metadata: {
			icon: {
				source: '',
				left: '',
				top: '',
				width: ''
			},
			name: {
				display: {
					left: {
						left: '',
						markup: '',
						top: ''
					},
					right: {
						right: '',
						markup: '',
						top: ''
					}
				}
			},
			summary: '',
			type: ''
		},
		urls: {
			background: 'https://controversy-cards-assets.s3.amazonaws.com/cards/58b8f1f7b2ef4ddae2fb8b17/pyramid_files/',
			overlay: 'https://controversy-cards-assets.s3.amazonaws.com/58b8f1f7b2ef4ddae2fb8b17/assets/',
			icon: 'https://controversy-cards-assets.s3.amazonaws.com/58b8f1f7b2ef4ddae2fb8b17/icon/'
		},
		graphics: [
			// {
			// 	source: '',
			// 	left: '',
			// 	top: '',
			// 	width: '',
			// 	numleft: '',
			// 	numtop: '',
			// 	zIndex: 0
			// }
		]
	},
	overlays: {
		active: true,
		loaded: false
	},
	slides: {
		show: {
			next: true,
			prev: false
		},
		current: null,
		active: false,
		num: 8
	},
	bubbles: {
		display: Array.from({length:8}, el => false)
	},
	bubbleNumbers: {
		active: Array.from({length:8}, el => false),
		timeouts: Array.from({length:8}, el => 0)
	}
};

export const showBubble = (num) => {
	return {
		type: types.SHOW_BUBBLE,
		num
	}
}

export const spinBubbleNumber = (num) => {
	return {
		type: types.SPIN_BUBBLE_NUMBER,
		num
	}
}

export const disableSpinBubbleNumbers = () => {
	return {
		type: types.DISABLE_SPIN_BUBBLE_NUMBERS
	}
};

export const setSpinBubbleNumberTimeout = (num, timeout) => {
	return {
		type: types.SET_SPIN_BUBBLE_NUMBER_TIMEOUT,
		num,
		timeout
	}
}

export const fetchCardRequest = (id) => {
	return {
		type: types.FETCH_CARD_REQUEST,
		id
	}
}

export const fetchCardError = (error) => {
	return {
		type: types.FETCH_CARD_ERROR,
		error
	}
}

export const fetchCardSuccess = (data) => {
	let card = {
		metadata: {}
	};

	card.metadata.name = data['name'];
	card.metadata.summary = data['summary'];
	card.metadata.type = data['graphic']['type'];
	card.metadata.icon = data['graphic']['icon'];
	card.graphics = data['graphic']['overlays']['assets'];

	return {
		type: types.FETCH_CARD_SUCCESS,
		card
	}
}

export function fetchCard(id, url) {
	return dispatch => {
		dispatch(fetchCardRequest(id));

		let cardRequest = new Request(url);

		return fetch(cardRequest)
			.then(response => response.json())
			.then(json => {
				console.log('thunk result:');
				console.log(json);
				dispatch(fetchCardSuccess(json['body'][0]));
			})
			.catch(error => {
				dispatch(fetchCardError(error));
			});
	}
} 

export const clickBubble = (num) => {
	return {
		type: types.CLICK_BUBBLE,
		payload: num
	};
};

export default (state = initialState, action) => {
	switch(action.type) {
		case types.SHOW_BUBBLE:
			let newDisplayState = state.bubbles.display.slice();
			newDisplayState[action.num] = true;

			return Object.assign({}, state, {
				bubbles: {
					display: newDisplayState
				}
			});

		case types.SPIN_BUBBLE_NUMBER:
			let newSpinState = Array.from({length:8}, el => false);
			newSpinState[action.num] = true;

			return Object.assign({}, state, {
				bubbleNumbers: {
					active: newSpinState,
					timeouts: state.bubbleNumbers.timeouts
				}
			});

		case types.DISABLE_SPIN_BUBBLE_NUMBERS:
			let noSpin = Array.from({length:8}, el => false),
				noSpinTimeouts = Array.from({length:8}, el => 0);

			return Object.assign({}, state, {
				bubbleNumbers: {
					active: noSpin,
					timeouts: noSpinTimeouts
				}
			});

		case types.SET_SPIN_BUBBLE_NUMBER_TIMEOUT:
			let newSpinTimeoutsState = state.bubbleNumbers.timeouts.slice();
			newSpinTimeoutsState[action.num] = action.timeout;

			return Object.assign({}, state, {
				bubbleNumbers: {
					active: state.bubbleNumbers.active,
					timeouts: newSpinTimeoutsState
				}
			});

		case types.FETCH_CARD_ERROR:
			console.log(action.error);
			return state;

		case types.FETCH_CARD_SUCCESS:
			return deepAssign({}, state, 
				{card: action.card});

		case types.CLICK_BUBBLE:
			return Object.assign({}, state);

		default:
			return state;		
	}
};
