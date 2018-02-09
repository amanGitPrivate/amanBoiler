import axios from 'axios'


// all the service calls come on this page. Depending on the type the correct ones are triggred.
const dataService = store => next => action => {
	next(action);
  axios({
			url: 'https://swapi.co/api/people/1/',
			method: 'get'
		})
		.then((response) => {
			const responseJSON = response.data
			next({
				type: action.type,
				payload: responseJSON
			});
		})
		.catch((err) => {

		});
};

export default dataService;
