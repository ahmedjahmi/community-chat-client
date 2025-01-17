import {
	SET_USER,
	SET_AUTHENTICATED,
	SET_UNAUTHENTICATED,
	LOADING_USER,
	LIKE_OPINION,
	UNLIKE_OPINION,
	MARK_NOTIFICATIONS_READ
} from '../types';

const initialState = {
	authenticated: false,
	loading: false,
	credentials: {},
	likes: [],
	notifications: []
};

export default function(state = initialState, action) {
	switch (action.type) {
		case SET_AUTHENTICATED:
			return {
				...state,
				authenticated: true
			};
		case SET_UNAUTHENTICATED:
			return initialState;
		case SET_USER:
			return {
				authenticated: true,
				loading: false,
				...action.payload
			};
		case LOADING_USER:
			return {
				...state,
				loading: true
			};
		case LIKE_OPINION:
			return {
				...state,
				likes: [
					...state.likes,
					{
						userHandle: state.credentials.handle,
						opinionId: action.payload.opinionId
					}
				]
			};
		case UNLIKE_OPINION:
			return {
				...state,
				likes: state.likes.filter(
					like => like.opinionId !== action.payload.opinionId
				)
			};
		case MARK_NOTIFICATIONS_READ:
			state.notifications.forEach(noti => noti.read = true);
			return {
				...state
			}
		default:
			return state;
	}
}
