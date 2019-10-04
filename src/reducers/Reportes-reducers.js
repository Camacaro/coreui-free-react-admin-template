import { OBTENER_REPORTES, MOSTRAR_REPORTES } from '../actions/types';

/** Cada reducers tiene su propio state */
const initialState = {
    reportes: []
};

export default function(state = initialState, action) {
   
    switch(action.type){

        case OBTENER_REPORTES:
            return{
                ...state,
                reportes : action.payload
            }

        case MOSTRAR_REPORTES:
            return state;

        default:
            return state;
    }
}