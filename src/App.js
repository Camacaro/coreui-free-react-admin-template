import React, { Component } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';
import './App.scss';
/** Redux */
import { Provider } from 'react-redux'
import store from './store';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./views/Pages/Login'));
const Register = React.lazy(() => import('./views/Pages/Register'));
const Page404 = React.lazy(() => import('./views/Pages/Page404'));
const Page500 = React.lazy(() => import('./views/Pages/Page500'));

class App extends Component {

    estaLogeado = () => {
        return false;
    }

    verificarRuta = (Component) => {
        
        return ( this.estaLogeado ) ? <Component/> : <Redirect from="/" to="/login" />
    }
  
    render() {
        return (
            <Provider store={store} >
                <HashRouter>
                    <React.Suspense fallback={loading()}>
                        <Switch>

                            {/* <Route exact path="/login" name="Login Page" render={ props => 
                                <Login {...props} />} 
                            /> */}
                            {/* { console.log( this.estaLogeado() ) } */}
                            <Route exact path="/login" name="Login Page" render={ props => ( this.estaLogeado() ) ? <Redirect from="/" to="/dashboard" /> :   <Login {...props} />  } />


                        <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} />
                        <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
                        <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
                        {/* <Route path="/" name="Home" render={props => <DefaultLayout {...props}/>} /> */}

                            <Route path="/" name="Home" render={props =>  ( this.estaLogeado() ) ? <DefaultLayout {...props}/>   : <Login {...props} />   } />
                        </Switch>
                    </React.Suspense>
                </HashRouter>
            </Provider>
        );
    }
}

export default App;
