import { combineReducers } from 'redux';
import loginReducer from './login-reducers';
import cargaDocumentosReducer from './cargaDocumentos-reducers';
import documentosAceptadosReducer from './DocumentosAceptados-reducers';
import documentosRechazadosReducer from './DocumentosRechazados-reducers';
import documentosPorRevisarReducer from './DocumentosPorRevisar-reducers';

export default combineReducers({
    usuario: loginReducer,
    documentos: cargaDocumentosReducer,
    documentosAceptados: documentosAceptadosReducer,
    documentosRechazados: documentosRechazadosReducer,
    documentosPorRevisar: documentosPorRevisarReducer
});