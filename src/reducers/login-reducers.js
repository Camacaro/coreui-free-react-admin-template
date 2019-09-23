import { LOGIN, MOSTRAR_USUARIO} from '../actions/types';

/** Cada reducers tiene su propio state */
const initialState = {
    usuario: []
};

export default function(state = initialState, action) {
   
    switch(action.type){

        case LOGIN:
            return{
                ...state,
                usuario : action.payload
            }

        case MOSTRAR_USUARIO:
            return {
                ...state
            }

        default:
            return state;
    }
}

