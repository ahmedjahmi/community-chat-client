import {
	SET_OPINIONS,
	LOADING_DATA,
	LIKE_OPINION,
	UNLIKE_OPINION
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
				payload: {}
			});
		});
};

// Like an Opinion
export const likeOpinion = (opinionId) => dispatch =>{
    axios.get(`/opinion/${opinionId}/like`)
        .then(res => {
            dispatch({
                type: LIKE_OPINION,
                payload: res.data
            })
        })
        .catch(err => console.log(err));
}

// Unlike an Opinion
export const unlikeOpinion = (opinionId) => dispatch =>{
    axios.get(`/opinion/${opinionId}/unlike`)
        .then(res => {
            dispatch({
                type: UNLIKE_OPINION,
                payload: res.data
            })
        })
        .catch(err => console.log(err));
}