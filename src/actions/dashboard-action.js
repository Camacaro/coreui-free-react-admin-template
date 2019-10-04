import { OBTENER_GRAFICA_UNO, MOSTRAR_GRAFICA_UNO } from './types';
import environment, { AUTHORIZATION } from '../config';
import axios from 'axios';


export const getGraficaUNO = ( db, token ) => async dispatch => {

    const respuesta = await axios.get( `${environment.GRAFICA_UNO}/${db}`,  { headers: { Authorization:`Bearer ${token}` } });

    dispatch({
        type: OBTENER_GRAFICA_UNO,
        payload: respuesta.data
    });
}

export const mostrarGraficaUNO = () => async dispatch => {
    
    dispatch({
        type: MOSTRAR_GRAFICA_UNO
    });
}

