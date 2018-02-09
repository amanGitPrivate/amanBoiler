import { CHECK } from '../actions/index';

const INITIAL_STATE = {
  data: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'CHECK':
      console.log(action);
      return { ...state, data: action.payload };
    default:
      return state;
  }
};
