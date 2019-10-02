import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Alert, Modal, ModalBody, } from 'reactstrap';
/** Redux */
import { connect } from 'react-redux';
import { loginAction, obtenerUsuario  } from '../../../actions/user-action';

const LOAD = <div className="sk-circle">
<div className="sk-circle1 sk-child"></div>
<div className="sk-circle2 sk-child"></div>
<div className="sk-circle3 sk-child"></div>
<div className="sk-circle4 sk-child"></div>
<div className="sk-circle5 sk-child"></div>
<div className="sk-circle6 sk-child"></div>
<div className="sk-circle7 sk-child"></div>
<div className="sk-circle8 sk-child"></div>
<div className="sk-circle9 sk-child"></div>
<div className="sk-circle10 sk-child"></div>
<div className="sk-circle11 sk-child"></div>
<div className="sk-circle12 sk-child"></div>
</div>;


class Login extends Component {
    
    email = React.createRef();
    password = React.createRef();
    // codigo de base de datos
    name = React.createRef();

    /**
     * state local en este componente
     */
    state = {
        error: false,
        cargar: false,
    }
    
    componentDidMount(){
        
        this.props.obtenerUsuario();

        const { usuario } = this.props;
        
        if( usuario.access_token ) {

            return this.props.history.push('/dashboard'); 
        } 
    }

    login = async (e) => {
        e.preventDefault();

        const email = this.email.current.value;
        const password = this.password.current.value;
        const name = this.name.current.value;

        // console.log(username, password);

        // Crear nuevo producto
        const data = {
            name,
            email,
            password
        }

        if( data.name === "" || data.email === "" || data.password === "" ) {
            
            this.setState({
                error:true
            });
        
        } else {

            this.setState({
                error:false
            });

            this.setState({cargar: true});

            await this.props.loginAction( data );

            const { usuario } = this.props;

            if( usuario ) {
                
                this.setState({cargar: false});

                return this.props.history.push('/dashboard'); 
            }
        }

    }
  
    render() {
        const existError = this.state.error;
    return (
      <div className="app flex-row align-items-center">
        <Container>

        <Modal isOpen={this.state.cargar} className="modal-load">
            <ModalBody>

                { LOAD }
            
            </ModalBody>
        </Modal>

          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={this.login}>
                      <h1>Login</h1>
                      <p className="text-muted">Ingresa en tu cuenta</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa fa-database"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input innerRef={this.name} type="text" placeholder="Codigo" autoComplete="codigo" />
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input innerRef={this.email} type="text" placeholder="Email" autoComplete="email" />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input innerRef={this.password} type="password" placeholder="Password" autoComplete="current-password" />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button type="submit" color="primary" className="px-4 mb-2">Ingresar</Button>
                          
                        </Col>
                        <Col xs="6" className="text-right">
                          {/* <Button color="link" className="px-0">Forgot password?</Button> */}
                        </Col>
                      </Row>

                        <Row>
                        { existError ? <Alert  color="danger"> Debe llenar los datos </Alert> : '' }

                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Facturaexpert</h2>
                      <div className="justify-content">
                        <p >Crea rápidamente tus facturas y mantén el control de tu negocio con características como, seguimiento de pagos, envíos de facturas por correo electrónico..</p>
                      </div>
                      <p>
                        <strong> E-Mail : </strong>info@facturaexpert.com <br/>
                        <strong>Call Center:</strong> (506) 4701-0754 <br/>
                        <strong>Dirección: </strong>San José, Costa Rica
                      </p>
                      <Link to="/register">
                        {/* <Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button> */}
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
    usuario: state.usuario.usuario
});

// export default Login;
export default connect(mapStateToProps, {loginAction, obtenerUsuario})(Login)
