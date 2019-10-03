import {OBTENER_DOCUMENTOS_POR_REVISAR, MOSTRAR_DOCUMENTOS_POR_REVISAR, ELIMINAR_DOCUMENTO_POR_REVISAR } from './types';
import environment, { AUTHORIZATION } from '../config';
import axios from 'axios';


export const getDocumentosPorRevisar = ( db, token ) => async dispatch => {

    const respuesta = await axios.get( `${environment.DOCUMENTOS_POR_REVISAR}/${db}`,  { headers: { Authorization:`Bearer ${token}` } });

    dispatch({
        type: OBTENER_DOCUMENTOS_POR_REVISAR,
        payload: respuesta.data
    });
}

export const mostrarDocumentosPorRevisar = () => async dispatch => {
    
    dispatch({
        type: MOSTRAR_DOCUMENTOS_POR_REVISAR
    });
}

export const mandarAProceso = (id, db, token) => async dispatch => {

    const respuesta = await axios.put(`${environment.DOCUMENTOS_A_PROCESAR}/${db}/${id}`, null, { headers: { Authorization:`Bearer ${token}` } });

    if(respuesta.status === 200){
        return respuesta.data
    } else {
        return respuesta.data.ok = false;
    }
}

export const archivar = (id, db, token) => async dispatch => {

    const respuesta = await axios.put(`${environment.DOCUMENTOS_ARCHIVAR}/${db}/${id}`, null, { headers: { Authorization:`Bearer ${token}` } });

    if(respuesta.status === 200){
        return respuesta.data
    } else {
        return respuesta.data.ok = false;
    }
}

export const eliminarDocuemntoArchivado = (id) => async dispatch => {
    
    await dispatch({
        type: ELIMINAR_DOCUMENTO_POR_REVISAR,
        payload: id
    })
}
