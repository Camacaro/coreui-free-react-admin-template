import { OBTENER_REPORTES, MOSTRAR_REPORTES } from './types';
import environment, { AUTHORIZATION } from '../config';
import axios from 'axios';


export const getReportes = ( db, token ) => async dispatch => {

    const respuesta = await axios.get( `${environment.REPORTES}/${db}`,  { headers: { Authorization:`Bearer ${token}` } });

    dispatch({
        type: OBTENER_REPORTES,
        payload: respuesta.data
    });
}

export const mostrarReportes = () => async dispatch => {
    
    dispatch({
        type: MOSTRAR_REPORTES
    });
}

