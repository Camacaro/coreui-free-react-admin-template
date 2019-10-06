import { OBTENER_GRAFICA_UNO, MOSTRAR_GRAFICA_UNO,
    OBTENER_GRAFICA_DOS, MOSTRAR_GRAFICA_DOS,
    OBTENER_GRAFICA_TRES, MOSTRAR_GRAFICA_TRES,
    OBTENER_GRAFICA_CUATRO, MOSTRAR_GRAFICA_CUATRO,
    OBTENER_GRAFICA_CINCO, MOSTRAR_GRAFICA_CINCO } from '../actions/types';

/** Cada reducers tiene su propio state */
const initialState = {
    graficaUno: [],
    graficaDos: [],
    graficaTres: [],
    graficaCuatro: [],
    graficaCinco: [],
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

        case OBTENER_GRAFICA_DOS:
            return{
                ...state,
                graficaDos : action.payload
            }

        case MOSTRAR_GRAFICA_DOS:
            return state;

        case OBTENER_GRAFICA_TRES:
            return{
                ...state,
                graficaTres : action.payload
            }

        case MOSTRAR_GRAFICA_TRES:
            return state;

        case OBTENER_GRAFICA_TRES:
            return{
                ...state,
                graficaTres : action.payload
            }

        case MOSTRAR_GRAFICA_TRES:
            return state;

        case OBTENER_GRAFICA_CUATRO:
            return{
                ...state,
                graficaCuatro : action.payload
            }

        case MOSTRAR_GRAFICA_CUATRO:
            return state;

        case OBTENER_GRAFICA_CINCO:
            return{
                ...state,
                graficaCinco : action.payload
            }

        case MOSTRAR_GRAFICA_CINCO:
            return state;

        default:
            return state;
    }
}