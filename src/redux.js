const types = {
	SHOW_BUBBLE: 'SHOW_BUBBLE',
	SPIN_BUBBLE_NUMBER: 'SPIN_BUBBLE_NUMBER',
	DISABLE_SPIN_BUBBLE_NUMBERS: 'DISABLE_SPIN_BUBBLE_NUMBERS',
	SET_SPIN_BUBBLE_NUMBER_TIMEOUT: 'SET_SPIN_BUBBLE_NUMBER_TIMEOUT',

	CLICK_BUBBLE: 'CLICK_BUBBLE',
	ZOOM_BUBBLE: 'ZOOM_BUBBLE',
	UNZOOM_BUBBLE: 'UNZOOM_BUBBLE',

	CLICK_ICON: 'CLICK_ICON',

	TOGGLE_OVERLAY_STATE: 'TOGGLE_OVERLAY_STATE',

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
		icon: {
			source: '',
			left: '',
			top: '',
			width: ''
		},
		nameLeft: {
			left: '',
			markup: '',
			top: ''
		},
		nameRight: {
			right: '',
			markup: '',
			top: ''
		},
		summary: '',
		type: '',
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

	urls: {
		api: 'https://czlxg9sj34.execute-api.us-east-1.amazonaws.com/dev/cards/',
		background: 'https://controversy-cards-assets.s3.amazonaws.com/58b8f1f7b2ef4ddae2fb8b17/pyramid_files/',
		overlay: 'https://controversy-cards-assets.s3.amazonaws.com/58b8f1f7b2ef4ddae2fb8b17/assets/',
		icon: 'https://controversy-cards-assets.s3.amazonaws.com/58b8f1f7b2ef4ddae2fb8b17/icon/'
	},

	overlays: {
		active: true,
		loaded: false
	},

	slides: {
		next: true,
		prev: false,
		current: null,
		active: false,
		num: 8
	},

	// Place zoom bubble state here so we preserve the original
	bubbles: {
		display: Array.from({length:8}, el => false),
		zoom: {
			num: null,
			left: null,
			top: null,
			width: null,
			zIndex: null
		}
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
	let card = {};

	card.nameLeft = data['name']['display']['left'];
	card.nameRight = data['name']['display']['right'];
	card.summary = data['summary'];
	card.type = data['graphic']['type'];
	card.icon = data['graphic']['icon'];
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
		num
	};
};

export const zoomBubble = (num, left, top, width, zIndex) => {
	return {
		type: types.ZOOM_BUBBLE,
		num,
		left,
		top,
		width,
		zIndex
	}
};

export const unZoomBubble = () => {
	return {
		type: types.UNZOOM_BUBBLE
	}
};

export const toggleOverlayState = (zoom) => {
	return {
		type: types.TOGGLE_OVERLAY_STATE,
		active: zoom <= 1.1
	}
}

export default (state = initialState, action) => {
	switch(action.type) {
		case types.SHOW_BUBBLE:
			let newDisplayState = state.bubbles.display.slice();
			newDisplayState[action.num] = true;

			return Object.assign({}, state, {
				bubbles: {
					display: newDisplayState,
					zoom: state.bubbles.zoom
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
			let card = Object.assign({}, state.card, action.card);

			return Object.assign({}, state, {card});

		case types.CLICK_BUBBLE:
			return Object.assign({}, state);

		case types.ZOOM_BUBBLE:
			return Object.assign({}, state, {
				bubbles: {
					display: state.bubbles.display,
					zoom: {
						num: action.num,
						left: action.left,
						top: action.top,
						width: action.width,
						zIndex: action.zIndex
					}
				}
			});

		case types.UNZOOM_BUBBLE:
			return Object.assign({}, state, {
				bubbles: {
					display: state.bubbles.display,
					zoom: null
				}
			});

		case types.TOGGLE_OVERLAY_STATE:
			return Object.assign({}, state, {
				overlays: {
					active: action.active,
					loaded: state.overlays.loaded
				}
			});

		default:
			return state;		
	}
};
