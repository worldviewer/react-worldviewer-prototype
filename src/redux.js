const types = {
	SHOW_BUBBLE: 'SHOW_BUBBLE',
	SPIN_BUBBLE_NUMBER: 'SPIN_BUBBLE_NUMBER',
	DISABLE_SPIN_BUBBLE_NUMBERS: 'DISABLE_SPIN_BUBBLE_NUMBERS',
	SET_SPIN_BUBBLE_NUMBER_TIMEOUT: 'SET_SPIN_BUBBLE_NUMBER_TIMEOUT',
	DEACTIVATE_BUBBLE: 'DEACTIVATE_BUBBLE',
	CLICK_BUBBLE: 'CLICK_BUBBLE',

	CLICK_ICON: 'CLICK_ICON',
	CLICK_SUMMARY: 'CLICK_SUMMARY',
	CLOSE_MENU: 'CLOSE_MENU',

	TOGGLE_OVERLAY_STATE: 'TOGGLE_OVERLAY_STATE',

	NEXT_SLIDE: 'NEXT_SLIDE',
	PREV_SLIDE: 'PREV_SLIDE',

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

	menu: {
		open: false
	},

	card: {
		id: '58b8f1f7b2ef4ddae2fb8b17',
		url: '',
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
		graphics: []
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
		firsts: {},
		active: false,
		num: 0
	},

	slideshow: [],

	bubbles: { 
		display: Array.from({length:8}, el => false) // Used on component mount
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
	card.text = data['text']['unicode'];
	card.url = data['gplus']['url'];

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

export const clickSummary = () => {
	return {
		type: types.CLICK_SUMMARY
	}
}

export const closeMenu = () => {
	return {
		type: types.CLOSE_MENU
	}
}

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

export const deactivateBubble = () => {
	return {
		type: types.DEACTIVATE_BUBBLE
	}
};

export default (state = initialState, action) => {
	let controls,
		isEnd,
		isBeginning;

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
			let firsts = {},
				curBubbleNum,
				prevBubbleNum,
				curSlide,
				prevSlide;

			for (var i=1; i<action.slideshow.length; i++) {
				curSlide = action.slideshow[i].bubble;
				prevSlide = action.slideshow[i-1].bubble;
				curBubbleNum = curSlide ? curSlide.number : null;
				prevBubbleNum = prevSlide ? prevSlide.number : null;

				if (curBubbleNum !== null && prevBubbleNum === null) {
					firsts[curBubbleNum] = i;
				}
			}

			return {
				...state, 
				card: {
					...state.card,
					...action.card
				},
				slideshow: action.slideshow,
				slides: {
					...state.slides,
					num: action.slideshow.length,
					firsts: firsts
				}
			};

		case types.CLICK_BUBBLE:
			let current = state.slides.firsts[action.num];

			isEnd = current === state.slideshow.length-1;
			isBeginning = current === 0;

			if (isEnd) {
				controls = {
					next: false,
					prev: true					
				};
			} else if (isBeginning) {
				controls = {
					next: true,
					prev: false
				};
			} else {
				controls = {
					next: true,
					prev: true
				};
			}

			return {
				...state,
				slides: {
					...state.slides,
					active: !state.slides.active,
					current: state.slides.firsts[action.num],
					previous: {
						...state.slideshow[state.slides.current].bubble || null,
						num: state.slides.current
					}
				},
				controls: controls
			};

		case types.DEACTIVATE_BUBBLE:
			// If the user has deactivated the slide, then advance current to next bubble
			let jump = state.slides.current,
				firstSlides = Object.values(state.slides.firsts);

			while (!firstSlides.includes(jump) && jump < state.slides.num) {
				++jump
			}

			return {
				...state,
				slides: {
					...state.slides,
					current: jump-1,
					active: false
				}
			};

		case types.CLICK_SUMMARY:
			return {
				...state,
				menu: {
					...state.menu,
					open: true
				}
			};

		case types.CLOSE_MENU:
			return {
				...state,
				menu: {
					...state.menu,
					open: false
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

		case types.NEXT_SLIDE:
			isEnd = state.slides.current === state.slideshow.length-1;

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
					active: true,
					current: next,
					previous: {
						...state.slideshow[state.slides.current].bubble || null,
						num: state.slides.current
					}
				},
				controls: controls
			};

		case types.PREV_SLIDE:
			isBeginning = state.slides.current === 0;

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
					active: true,
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
