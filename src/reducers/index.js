import { combineReducers } from 'redux';
import loginReducer from './login-reducers';
import cargaDocumentosReducer from './cargaDocumentos-reducers';

export default combineReducers({
    usuario: loginReducer,
    documentos: cargaDocumentosReducer
});