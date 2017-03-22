const types = {
	INC: 'INC',
	DEC: 'DEC'
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

export const increment = () => {
	return {
		type: types.INC
	};
};

export default (state = initialState, action) => {
	if (action.type === types.INC) {
		return Object.assign({}, state, {
			count: state.count + 1
		});
	}
	if (action.type === types.DEC) {
		return {
			...state,
			count: state.count - 1
		};
	}

	return state;
};
