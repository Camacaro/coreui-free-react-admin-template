import { OBTENER_DOCUMENTOS } from '../actions/types';

/** Cada reducers tiene su propio state */
const initialState = {
    documentos: []
};

export default function(state = initialState, action) {
   
    switch(action.type){

        case OBTENER_DOCUMENTOS:
            return{
                ...state,
                documentos : action.payload
            }

        default:
            return state;
    }
}