import { LOGIN } from '../actions/types';

/** Cada reducers tiene su propio state */
const initialState = {
    user: []
};

export default function(state = initialState, action) {
   
    switch(action.type){

        case LOGIN:
            console.log(action.payload);
            return{
                ...state,
                user : action.payload
            }

        default:
            return state;
    }
}

