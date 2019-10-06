import { OBTENER_DOCUMENTOS_ACEPTADOS, MOSTRAR_DOCUMENTOS_ACEPTADOS } from './types';
import environment from '../config';
import axios from 'axios';


export const getDocumentosAceptados = ( db, token ) => async dispatch => {

    const respuesta = await axios.get( `${environment.DOCUMENTOS_ACEPTADOS}/${db}`,  { headers: { Authorization:`Bearer ${token}` } });

    dispatch({
        type: OBTENER_DOCUMENTOS_ACEPTADOS,
        payload: respuesta.data
    });
}

export const mostrarDocumentosAceptados = () => async dispatch => {
    
    dispatch({
        type: MOSTRAR_DOCUMENTOS_ACEPTADOS
    });
}

