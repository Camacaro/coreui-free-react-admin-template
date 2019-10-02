import { combineReducers } from 'redux';
import loginReducer from './login-reducers';
import cargaDocumentosReducer from './cargaDocumentos-reducers';
import documentosAceptadosReducer from './DocumentosAceptados-reducers';

export default combineReducers({
    usuario: loginReducer,
    documentos: cargaDocumentosReducer,
    documentosAceptados: documentosAceptadosReducer
});