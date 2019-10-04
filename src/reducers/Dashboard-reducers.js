import { OBTENER_GRAFICA_UNO, MOSTRAR_GRAFICA_UNO } from '../actions/types';

/** Cada reducers tiene su propio state */
const initialState = {
    graficaUno: []
};

export default function(state = initialState, action) {
   
    switch(action.type){

        case OBTENER_GRAFICA_UNO:
            return{
                ...state,
                graficaUno : action.payload
            }

        case MOSTRAR_GRAFICA_UNO:
            return state;

        default:
            return state;
    }
}