import { LOGIN, MOSTRAR_USUARIO } from './types';

export const loginAction = ( usuario ) => async dispatch => {
    // const respuesta = await axios.get('http://localhost:5000/productos');

    await timeout(3000);

    dispatch({
        type: LOGIN,
        payload: usuario
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
