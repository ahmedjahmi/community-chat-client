import {
	SET_OPINIONS,
	SET_OPINION,
	POST_OPINION,
	LIKE_OPINION,
	UNLIKE_OPINION,
	DELETE_OPINION,
	LOADING_DATA
} from '../types';

const initialState = {
	opinions: [],
	opinion: {},
	loading: false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case LOADING_DATA:
			return {
				...state,
				loading: true
			};
		case SET_OPINIONS:
			return {
				...state,
				opinions: action.payload,
				loading: false
			};
		case SET_OPINION:
			return {
				...state,
				opinion: action.payload
			}
		case LIKE_OPINION:
		case UNLIKE_OPINION:
			let index = state.opinions.findIndex(
				opinion => opinion.opinionId === action.payload.opinionId
			);
			state.opinions[index] = action.payload;
			return {
				...state
			};
		case DELETE_OPINION:
			index = state.opinions.findIndex(
				opinion => opinion.opinionId === action.payload
			);
			state.opinions.splice(index, 1);
			return {
                ...state
			};
		case POST_OPINION:
			return {
				...state,
				opinions: [
					action.payload,
					...state.opinions
				]
			}
		default:
			return state;
	}
}
