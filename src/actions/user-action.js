import { LOGIN, MOSTRAR_USUARIO } from './types';
import environment from '../config';
import axios from 'axios';

export const loginAction = ( usuario ) => async dispatch => {
    
    const headers = {'Content-Type': 'application/json'};
    const respuesta = await axios.post( environment.LOGIN, usuario, headers);
    //const respuesta = await axios.post( environment.testURL, usuario, headers);
    
    // console.log(respuesta.data);

    // await timeout(3000);

    dispatch({
        type: LOGIN,
        payload: respuesta.data
    });
}

export const obtenerUsuario = () => async dispatch => {
    
    dispatch({
        type: MOSTRAR_USUARIO
    });
}

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
