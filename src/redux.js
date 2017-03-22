const types = {
	INC: 'INC',
	DEC: 'DEC'
};

const initialState = {
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
			}
		},
		urls: {
			background: '', // this.backend.getPyramidUrl()
			overlay: '',
			icon: ''
		},
		graphics: []
	},
	overlay: {
		active: true,
		loaded: false
	},
	slide: {
		show: {
			next: true,
			prev: false
		},
		current: null,
		active: false,
		num: 8
	},
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
