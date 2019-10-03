import { OBTENER_DOCUMENTOS_POR_REVISAR, MOSTRAR_DOCUMENTOS_POR_REVISAR, ELIMINAR_DOCUMENTO_POR_REVISAR } from '../actions/types';

/** Cada reducers tiene su propio state */
const initialState = {
    documentosPorRevisar: []
};

export default function(state = initialState, action) {
   
    switch(action.type){

        case OBTENER_DOCUMENTOS_POR_REVISAR:
            return{
                ...state,
                documentosPorRevisar : action.payload
            }

        case MOSTRAR_DOCUMENTOS_POR_REVISAR:
            return state;

        case ELIMINAR_DOCUMENTO_POR_REVISAR:
            return {
                ...state,
                documentosPorRevisar: state.documentosPorRevisar.filter( documento => documento.id_documento !== action.payload )
            }

        default:
            return state;
    }
}