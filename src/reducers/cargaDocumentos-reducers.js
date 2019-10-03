import { OBTENER_DOCUMENTOS, MOSTRAR_DOCUMENTOS, ELIMINAR_DOCUMENTO } from '../actions/types';

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

        case MOSTRAR_DOCUMENTOS:
            return state;

        case ELIMINAR_DOCUMENTO:
            return {
                ...state,
                documentos: state.documentos.filter( doc => doc.id_documento !== action.payload )
            }

        default:
            return state;
    }
}