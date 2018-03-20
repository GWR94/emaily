import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () => async dispatch => {
	const res = await axios.get('/api/current_user');
	dispatch({ type: FETCH_USER, payload: res.data }); // res.data only returns relevant data from request
};

export const handleToken = (token) => async dispatch => {
	const res = await axios.post('/api/stripe', token);
	dispatch({ type: FETCH_USER, payload: res.data });
	console.log(res.data);
};