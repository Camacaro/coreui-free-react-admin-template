import { OBTENER_GRAFICA_UNO, MOSTRAR_GRAFICA_UNO,
    OBTENER_GRAFICA_DOS, MOSTRAR_GRAFICA_DOS,
    OBTENER_GRAFICA_TRES, MOSTRAR_GRAFICA_TRES,
    OBTENER_GRAFICA_CUATRO, MOSTRAR_GRAFICA_CUATRO,
    OBTENER_GRAFICA_CINCO, MOSTRAR_GRAFICA_CINCO } from './types';
import environment from '../config';
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

// grafica dos
export const getGraficaDOS = ( db, token ) => async dispatch => {

    const respuesta = await axios.get( `${environment.GRAFICA_DOS}/${db}`,  { headers: { Authorization:`Bearer ${token}` } });

    dispatch({
        type: OBTENER_GRAFICA_DOS,
        payload: respuesta.data
    });
}

export const mostrarGraficaDOS = () => async dispatch => {
    
    dispatch({
        type: MOSTRAR_GRAFICA_DOS
    });
}

// grafica tres
export const getGraficaTRES = ( db, token ) => async dispatch => {

    const respuesta = await axios.get( `${environment.GRAFICA_TRES}/${db}`,  { headers: { Authorization:`Bearer ${token}` } });

    dispatch({
        type: OBTENER_GRAFICA_TRES,
        payload: respuesta.data
    });
}

export const mostrarGraficaTRES = () => async dispatch => {
    
    dispatch({
        type: MOSTRAR_GRAFICA_TRES
    });
}

// grafica cuatro
export const getGraficaCUATRO = ( db, token ) => async dispatch => {

    const respuesta = await axios.get( `${environment.GRAFICA_CUATRO}/${db}`,  { headers: { Authorization:`Bearer ${token}` } });

    dispatch({
        type: OBTENER_GRAFICA_CUATRO,
        payload: respuesta.data
    });
}

export const mostrarGraficaCUATRO = () => async dispatch => {
    
    dispatch({
        type: MOSTRAR_GRAFICA_CUATRO
    });
}

// grafica cuatro
export const getGraficaCINCO = ( db, token ) => async dispatch => {

    const respuesta = await axios.get( `${environment.GRAFICA_CINCO}/${db}`,  { headers: { Authorization:`Bearer ${token}` } });

    dispatch({
        type: OBTENER_GRAFICA_CINCO,
        payload: respuesta.data
    });
}

export const mostrarGraficaCINCO = () => async dispatch => {
    
    dispatch({
        type: MOSTRAR_GRAFICA_CINCO
    });
}

