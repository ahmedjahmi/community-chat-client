import {
	SET_OPINIONS,
	POST_OPINION,
	LIKE_OPINION,
	UNLIKE_OPINION,
	DELETE_OPINION,
	LOADING_DATA,
	LOADING_UI,
	STOP_LOADING_UI,
	SET_ERRORS,
	CLEAR_ERRORS,
	SET_OPINION
} from '../types';
import axios from 'axios';

// Get all Opinions for hope page
export const getOpinions = () => dispatch => {
	dispatch({ type: LOADING_DATA });
	axios
		.get('/opinions')
		.then(res => {
			dispatch({
				type: SET_OPINIONS,
				payload: res.data
			});
		})
		.catch(err => {
			dispatch({
				type: SET_OPINIONS,
				payload: []
			});
		});
};

// Get one single Opinion
export const getOpinion = (opinionId) => dispatch => {
	dispatch({type: LOADING_UI});
	axios.get(`/opinion/${opinionId}`)
		.then(res => {
			dispatch({
				type: SET_OPINION,
				payload: res.data
			});
			dispatch({ type: STOP_LOADING_UI });
		})
		.catch(err => console.log(err));
}

// Post an Opinion
export const postOpinion = (newOpinion) => (dispatch) => {
	dispatch({ type: LOADING_UI});
	axios.post('/opinion', newOpinion)
		.then(res => {
			dispatch({
				type: POST_OPINION,
				payload: res.data
			});
			dispatch({ type: CLEAR_ERRORS });
		})
		.catch(err => {
			dispatch({
				type: SET_ERRORS,
				payload: err.response.data
			})
		})
}

// Like an Opinion
export const likeOpinion = opinionId => dispatch => {
	axios
		.get(`/opinion/${opinionId}/like`)
		.then(res => {
			dispatch({
				type: LIKE_OPINION,
				payload: res.data
			});
		})
		.catch(err => console.log(err));
};

// Unlike an Opinion
export const unlikeOpinion = opinionId => dispatch => {
	axios
		.get(`/opinion/${opinionId}/unlike`)
		.then(res => {
			dispatch({
				type: UNLIKE_OPINION,
				payload: res.data
			});
		})
		.catch(err => console.log(err));
};

export const deleteOpinion = opinionId => dispatch => {
	axios
		.delete(`/opinion/${opinionId}`)
		.then(() => {
			dispatch({ type: DELETE_OPINION, payload: opinionId });
		})
		.catch(err => console.log(err));
};

export const clearErrors = () => dispatch => {
	dispatch({ type: CLEAR_ERRORS });
}