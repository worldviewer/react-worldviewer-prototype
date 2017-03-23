import deepAssign from 'deep-assign';

const types = {
	SHOW_BUBBLE: 'SHOW_BUBBLE',
	SPIN_BUBBLE_NUMBER: 'SPIN_BUBBLE_NUMBER',

	HIDE_OVERLAY: 'HIDE_OVERLAY',
	SHOW_OVERLAY: 'SHOW_OVERLAY',

	CLICK_OVERLAY: 'CLICK_OVERLAY',

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
		numbers: {
			spin: {
				active: Array.from({length:8}, el => false),
				timeouts: Array.from({length:8}, el => 0)
			}
		},
		display: Array.from({length:8}, el => false)
	}
};

export const fetchCardRequest = (id) => {
	return {
		type: types.FETCH_CARD_REQUEST,
		id
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

export const fetchCardError = (error) => {
	return {
		type: types.FETCH_CARD_ERROR,
		error
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

export const clickOverlay = (num) => {
	return {
		type: types.CLICK_OVERLAY,
		payload: num
	};
};

export default (state = initialState, action) => {
	switch(action.type) {
		case types.CLICK_OVERLAY:
			return Object.assign({}, state);
		case types.FETCH_CARD_SUCCESS:
			return deepAssign({}, state, 
				{card: action.card});
		case types.FETCH_CARD_ERROR:
			console.log(action.error);
			return state;
		default:
			return state;		
	}
};
