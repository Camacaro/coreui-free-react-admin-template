import { OBTENER_DOCUMENTOS, MOSTRAR_DOCUMENTOS, VER_PDF } from './types';
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