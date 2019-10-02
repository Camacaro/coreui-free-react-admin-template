import { OBTENER_DOCUMENTOS_ACEPTADOS, MOSTRAR_DOCUMENTOS_ACEPTADOS } from '../actions/types';

/** Cada reducers tiene su propio state */
const initialState = {
    documentosAceptados: []
};

export default function(state = initialState, action) {
   
    switch(action.type){

        case OBTENER_DOCUMENTOS_ACEPTADOS:
            return{
                ...state,
                documentosAceptados : action.payload
            }

        case MOSTRAR_DOCUMENTOS_ACEPTADOS:
            return state;

        default:
            return state;
    }
}