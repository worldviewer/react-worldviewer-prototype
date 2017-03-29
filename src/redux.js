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
	TOGGLE_OVERLAY_ACTIVE: 'TOGGLE_OVERLAY_ACTIVE',

	NEXT_SLIDE: 'NEXT_SLIDE',
	PREV_SLIDE: 'PREV_SLIDE',
	UPDATE_NEXT_PREV: 'UPDATE_NEXT_PREV',

	FETCH_CARD_REQUEST: 'FETCH_CARD_REQUEST',
	FETCH_CARD_ERROR: 'FETCH_CARD_ERROR',
	FETCH_CARD_SUCCESS: 'FETCH_CARD_SUCCESS'
};

const initialState = {
	base: {
		api: 'https://czlxg9sj34.execute-api.us-east-1.amazonaws.com/dev/cards/',
		background: 'https://controversy-cards-assets.s3.amazonaws.com/',
		overlay: 'https://controversy-cards-assets.s3.amazonaws.com/'
	},

	controls: {
		next: true,
		prev: false
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
			// 	numtop: ''
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
		current: 0,
		previous: null, // This is necessary for TweenMax transitions

		active: false, // Refactor: This should be a number
		num: 0
	},

	slideshow: [
		// {
		// 	text: {
		// 		unicode: "",				
		// 	},
		// 	bubble: {
		// 		number: null,
		// 		left: null,
		// 		top: null,
		// 		width: null
		// 	},
		// 	audio: null,
		// 	quotes: {
		// 		number: null,
		// 		background: null,
		// 		zoom: null,
		// 		left: null,
		// 		top: null,
		// 		width: null,
		// 		zIndex: null
		// 	},
		// 	footnotes: [
		// 		{
		// 			markup: ""
		// 		}
		// 	]
		// }
	],

	// Refactor: Delete
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
	let card = {};

	card.nameLeft = data['name']['display']['left'];
	card.nameRight = data['name']['display']['right'];
	card.summary = data['summary'];
	card.type = data['graphic']['type'];
	card.icon = data['graphic']['icon'];
	card.graphics = data['graphic']['overlays']['assets'];

	let slideshow = data['graphic']['slideshow'];

	return {
		type: types.FETCH_CARD_SUCCESS,
		card,
		slideshow
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
};

export const nextSlide = () => {
	return {
		type: types.NEXT_SLIDE
	}
};

export const prevSlide = () => {
	return {
		type: types.PREV_SLIDE
	}
};

export const toggleOverlayActive = () => {
	return {
		type: types.TOGGLE_OVERLAY_ACTIVE
	}
};

export default (state = initialState, action) => {
	let controls;

	switch(action.type) {
		case types.SHOW_BUBBLE:
			let newDisplayState = state.bubbles.display.slice();
			newDisplayState[action.num] = true;

			return {
				...state,
				bubbles: {
					...state.bubbles,
					display: newDisplayState
				}
			};

		case types.SPIN_BUBBLE_NUMBER:
			let newSpinState = Array.from({length:8}, el => false);
			newSpinState[action.num] = true;

			return {
				...state,
				bubbleNumbers: {
					...state.bubbleNumbers,
					active: newSpinState
				}
			};

		case types.DISABLE_SPIN_BUBBLE_NUMBERS:
			let noSpin = Array.from({length:8}, el => false),
				noSpinTimeouts = Array.from({length:8}, el => 0);

			return {
				...state,
				bubbleNumbers: {
					...state.bubbleNumbers,
					active: noSpin,
					timeouts: noSpinTimeouts
				}
			};

		case types.SET_SPIN_BUBBLE_NUMBER_TIMEOUT:
			let newSpinTimeoutsState = state.bubbleNumbers.timeouts.slice();
			newSpinTimeoutsState[action.num] = action.timeout;

			return {
				...state,
				bubbleNumbers: {
					...state.bubbleNumbers,
					active: state.bubbleNumbers.active,
					timeouts: newSpinTimeoutsState
				}
			};

		case types.FETCH_CARD_ERROR:
			console.log(action.error);
			return state;

		case types.FETCH_CARD_SUCCESS:
			return {
				...state, 
				card: {
					...state.card,
					...action.card
				},
				slideshow: action.slideshow,
				slides: {
					...state.slides,
					num: action.slideshow.length
				}
			};

		case types.CLICK_BUBBLE:
			return {
				...state,
				slides: {
					...state.slides,
					current: action.num
				}
			};

		case types.ZOOM_BUBBLE:
			return {
				...state,
				bubbles: {
					...state.bubbles,
					zoom: {
						num: action.num,
						left: action.left,
						top: action.top,
						width: action.width						
					}
				}
			};

		case types.UNZOOM_BUBBLE:
			return {
				...state,
				bubbles: {
					display: state.bubbles.display,
					zoom: null
				}
			};

		case types.TOGGLE_OVERLAY_STATE:
			return {
				...state,
				overlays: {
					...state.overlays,
					active: action.active				
				}
			};

		case types.TOGGLE_OVERLAY_ACTIVE:
			return {
				...state,
				slides: {
					...state.slides,
					active: !state.slides.active
				}
			};

		case types.NEXT_SLIDE:
			let isEnd = state.slides.current === state.slideshow.length-1;

			let next = isEnd ?
				state.slides.current :
				state.slides.current+1;

			controls = isEnd ?
				{
					next: false,
					prev: true
				} :
				{
					next: true,
					prev: true
				};

			return {
				...state,
				slides: {
					...state.slides,
					current: next,
					previous: {
						...state.slideshow[state.slides.current].bubble || null,
						num: state.slides.current
					}
				},
				controls: controls
			};

		case types.PREV_SLIDE:
			let isBeginning = state.slides.current === 0;

			let previous = isBeginning ?
				0 :
				state.slides.current-1;

			controls = isBeginning ?
				{
					next: true,
					prev: false
				} :
				{
					next: true,
					prev: true
				};

			return {
				...state,
				slides: {
					...state.slides,
					current: previous,
					previous: {
						...state.slideshow[state.slides.current].bubble || null,
						num: state.slides.current
					}
				},
				controls: controls
			};

		default:
			return state;		
	}
};
