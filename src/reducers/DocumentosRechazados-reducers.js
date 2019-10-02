import { OBTENER_DOCUMENTOS_RECHAZADOS, MOSTRAR_DOCUMENTOS_RECHAZADOS } from '../actions/types';

/** Cada reducers tiene su propio state */
const initialState = {
    documentosRechazados: []
};

export default function(state = initialState, action) {
   
    switch(action.type){

        case OBTENER_DOCUMENTOS_RECHAZADOS:
            return{
                ...state,
                documentosRechazados : action.payload
            }

        case MOSTRAR_DOCUMENTOS_RECHAZADOS:
            return state;

        default:
            return state;
    }
}