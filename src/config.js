
// const URL = (process.env.NODE_ENV !== 'production') ? 'http://localhost/sng/backend/public/api/' : 'http://apidoc.sngcr.com/api/'; 
const URL = 'http://apidoc.sngcr.com/api';
const HEADERS = {'Content-Type': 'application/json'};

export const AUTHORIZATION = (token) => {
    return {
        'Authorization': `Bearer ${token}`
    }
};

/**
 * Glosario
 * /documentoshacienda/{admin_sng}
 * /verpdf/{admin_sng}/{2}
 * /verxml/admin_sng/1
 */
const environment  = {
    URL,
    HEADERS,
    LOGIN: `${URL}/auth/login`,
    DOCUMENTOS: `${URL}/documentoshacienda`,
    VER_PDF: `${URL}/verpdf`,
    VER_XML: `${URL}/verxml`,
};

export default environment ;

// const dev = {
//     URL,
//     login: 'auth/login'
// };
  
// const prod = {
//     URL,
//     login: 'auth/login'
// // };
  
//   const config = process.env.REACT_APP_STAGE === 'production'
//     ? prod
//     : dev;
  
//   export default {
//     // Add common config values here
//     MAX_ATTACHMENT_SIZE: 5000000,
//     ...config
//   };