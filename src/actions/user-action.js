import { LOGIN, MOSTRAR_USUARIO } from './types';
import environment from '../config';
import axios from 'axios';

export const loginAction = ( usuario ) => async dispatch => {
    
    try {
        const headers = {'Content-Type': 'application/json'};
        const respuesta = await axios.post( environment.LOGIN, usuario, headers);
        // Success 🎉
        
        dispatch({
            type: LOGIN,
            payload: respuesta.data
        });

        return respuesta.data.ok;
    } catch (error) {
        console.log(error);
        return false;
    }

}

export const obtenerUsuario = () => async dispatch => {
    
    dispatch({
        type: MOSTRAR_USUARIO
    });
}

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
