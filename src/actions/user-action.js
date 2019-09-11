import { LOGIN } from './types';

export const loginAction = ( user ) => async dispatch => {
    // const respuesta = await axios.get('http://localhost:5000/productos');

    await timeout(3000);

    dispatch({
        type: LOGIN,
        payload: user
    });
    
}

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
