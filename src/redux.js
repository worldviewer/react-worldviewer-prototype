const types = {
	SHOW_BUBBLE: 'SHOW_BUBBLE',
	SPIN_BUBBLE_NUMBER: 'SPIN_BUBBLE_NUMBER',

	HIDE_OVERLAY: 'HIDE_OVERLAY',
	SHOW_OVERLAY: 'SHOW_OVERLAY',

	CLICK_OVERLAY: 'CLICK_OVERLAY',

	CLICK_ICON: 'CLICK_ICON',

	NEXT_SLIDE: 'NEXT_SLIDE',
	PREV_SLIDE: 'PREV_SLIDE',

	FETCH_CARD: 'FETCH_CARD',
	FETCH_CARD_ERROR: 'FETCH_CARD_ERROR',

	FETCH_OVERLAY: 'FETCH_OVERLAY',
	FETCH_OVERLAY_ERROR: 'FETCH_OVERLAY_ERROR',

	FETCH_BACKGROUND: 'FETCH_BACKGROUND',
	FETCH_BACKGROUND_ERROR: 'FETCH_BACKGROUND_ERROR'
};

const initialState = {
	base: {
		api: '',
		background: '',
		overlay: ''
	},
	cards: {
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
			}
		},
		urls: {
			background: '', // this.backend.getBackgroundUrl()
			overlay: '',
			icon: ''
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
		numbers: {
			spin: {
				active: Array.from({length:8}, el => false),
				timeouts: Array.from({length:8}, el => 0)
			}
		},
		display: Array.from({length:8}, el => false)
	}
};

export const clickOverlay = (num) => {
	return {
		type: types.CLICK_OVERLAY,
		payload: num
	};
};

export default (state = initialState, action) => {
	if (action.type === types.CLICK_OVERLAY) {
		return Object.assign({}, state);
	}

	return state;
};
