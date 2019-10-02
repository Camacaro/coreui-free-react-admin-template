import { OBTENER_DOCUMENTOS, MOSTRAR_DOCUMENTOS, GUARDAR_DOCUMENTO, VER_PDF } from './types';
import environment, { AUTHORIZATION } from '../config';
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
    
    console.log(respuesta);
}


export const verPDFAction = ( db, id, token ) => async () => {

    //await axios.get( `${environment.VER_PDF}/${db}/${id}`,  { headers: { Authorization:`Bearer ${token}`, 'Content-Type': 'application/pdf', 'Access-Control-Allow-Origin': '*', 'X-Content-Type-Options': 'nosniff' } });

    await axios({
        url: `${environment.VER_PDF}/${db}/${id}`,
        method: 'GET',
        responseType: 'blob', // important
        headers: { 
            Authorization:`Bearer ${token}`, 
            'Content-Type': 'application/pdf', 
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'application/pdf',
            mode: 'no-cors'
        }
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'file.pdf');
        document.body.appendChild(link);
        link.click();
      });
}