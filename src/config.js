
const URL = (process.env.NODE_ENV !== 'production') ? 'http://localhost/sng/backend/public/api/' : 'http://apidoc.sngcr.com/api/'; 

const environment  = {
    URL,
    LOGIN: `${URL}'auth/login'`,
    
    testURL: 'http://apidoc.sngcr.com/api/auth/login'
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