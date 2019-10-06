import { OBTENER_DOCUMENTOS, MOSTRAR_DOCUMENTOS, GUARDAR_DOCUMENTO, ELIMINAR_DOCUMENTO } from './types';
import environment from '../config';
import axios from 'axios';


export const getDocumentos = ( db, token ) => async dispatch => {

    // const headers = AUTHORIZATION(token);
    
    // console.log(headers);

    const respuesta = await axios.get( `${environment.DOCUMENTOS}/${db}`,  { headers: { Authorization:`Bearer ${token}` } });

    dispatch({
        type: OBTENER_DOCUMENTOS,
        payload: respuesta.data
    });
}

export const mostrarDocumentos = () => async dispatch => {
    
    dispatch({
        type: MOSTRAR_DOCUMENTOS
    });
}

export const putDocumento = (documento, db, token) => async dispatch => {


    const respuesta = await axios.put(`${environment.DOCUMENTOS}/${db}`, documento, { headers: { Authorization:`Bearer ${token}` } });

    if(respuesta.status === 200){
        return respuesta.data
    } else {
        return respuesta.data.ok = false;
    }
}

export const mandarARevision = (id, db, token) => async dispatch => {

    const respuesta = await axios.put(`${environment.DOCUMENTOS_A_REVISION}/${db}/${id}`, null, { headers: { Authorization:`Bearer ${token}` } });

    if(respuesta.status === 200){
        return respuesta.data
    } else {
        return respuesta.data.ok = false;
    }
}

export const cargarDocumento = (file, db, token) => async dispatch => {

    const formData = new FormData();

    formData.append('file',file);

    const respuesta = await axios.post( `${environment.CARGAR_DOCUMENTO}/${db}`, formData,{
        headers: {
            'content-type': 'multipart/form-data',
            Authorization:  `Bearer ${token}`
        }
    });
    
    console.log(respuesta);
}

export const getFragmentarDocumentos = (db, token) => async dispatch => {

    const respuesta = await axios.get( `${environment.FRAGMENTAR_DOCUMENTO}/${db}`,  { headers: { Authorization:`Bearer ${token}` } });
    
    if(respuesta.status === 200){
        return respuesta.data
    } else {
        return respuesta.data.ok = false;
    }
}

export const eliminarDocuemnto = (id) => async dispatch => {
    
    await dispatch({
        type: ELIMINAR_DOCUMENTO,
        payload: id
    })
}
