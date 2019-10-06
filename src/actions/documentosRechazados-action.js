import {OBTENER_DOCUMENTOS_RECHAZADOS, MOSTRAR_DOCUMENTOS_RECHAZADOS } from './types';
import environment from '../config';
import axios from 'axios';


export const getDocumentosRechazados = ( db, token ) => async dispatch => {

    const respuesta = await axios.get( `${environment.DOCUMENTOS_RECHAZADO}/${db}`,  { headers: { Authorization:`Bearer ${token}` } });

    dispatch({
        type: OBTENER_DOCUMENTOS_RECHAZADOS,
        payload: respuesta.data
    });
}

export const mostrarDocumentosRechazados = () => async dispatch => {
    
    dispatch({
        type: MOSTRAR_DOCUMENTOS_RECHAZADOS
    });
}
