import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Button,
    Modal, ModalBody, ModalFooter, ModalHeader,
    Nav, NavItem, NavLink,  TabContent, TabPane,
    Form, FormGroup,  Input, InputGroup, InputGroupAddon,  Label, InputGroupText,
 } from 'reactstrap';
// import { MDBDataTable, MDBBtn, MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

/** Redux */
import { connect } from 'react-redux';
import { getDocumentos, mostrarDocumentos, verPDFAction } from '../../actions/cargaDocumentos-action';
import { obtenerUsuario } from '../../actions/user-action';
import environment from '../../config';

class CargaDocumentos extends Component {

    emisorRef = React.createRef();
    mensajeRef = React.createRef();
    condicionImpuestoRef = React.createRef();
    montoTotalImpuestoAcreditarRef = React.createRef();

    state = {
        usuario: {},
        modal: false,
        activeTab: new Array(4).fill('1'),
    }

    componentDidMount(){
        
        this.props.obtenerUsuario();

        const { usuario } = this.props;

        this.setState({
            usuario
        });

        this.props.getDocumentos( usuario.db, usuario.access_token );

        this.props.mostrarDocumentos();
    }

    aceptarRechazar = (id) => { this.setState({modal: !this.state.modal}) };


    enviarRevision = (id) => { console.log('enviarRevision', id); };

    buttonGroup = (cell, row) => {

        const aStyle = {
            color: 'white',
            textDecoration: 'none'
        };

        return (
            <React.Fragment>
                <Button block color="primary" className="btn-pill">
                    <a 
                        style={aStyle}
                        target="_blank" 
                        href={`${environment.VER_PDF}/${this.state.usuario.db}/${row.id_documento}`}
                        title="Ver PDF">
                        Ver PDF 
                    </a>
                </Button>
                <Button block color="info" className="btn-pill"> 
                    <a 
                        style={aStyle}
                        target="_blank" 
                        href={`${environment.VER_XML}/${this.state.usuario.db}/${row.id_documento}`}
                        title="Ver PDF">
                        Ver XML 
                    </a>
                </Button>
                <Button block color="success"   className="btn-pill" onClick={ () => this.aceptarRechazar(row.id_documento) } > Aceptar / Rechazar </Button>
                <Button block color="warning"   className="btn-pill" onClick={ () => this.enviarRevision(row.id_documento) } > Enviar a Revision </Button>
            </React.Fragment>
        );
    }

    dateFormatter = (cell, row) => {
        const date = new Date(row.FechaEmisionDoc);
        
        return `${('0' + date.getDate()).slice(-2)}/${('0' + (date.getMonth() + 1)).slice(-2)}/${date.getFullYear()}`;
    }

    MostarTab(tabPane, tab) {
        const newArray = this.state.activeTab.slice()

        newArray[tabPane] = tab

        this.setState({
          activeTab: newArray,
        });
    }

    lorem() {
        return 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.'
    }

    tabPane() {
        return (
            <>
                <TabPane tabId="1">
                    <Card>
                        
                        <CardBody>
                            <Form className="form-horizontal">
                                
                                {/* <FormGroup>
                                    <Label htmlFor="prependedInput">Prepended text</Label>
                                    
                                    <div className="controls">
                                        <InputGroup className="input-prepend">
                                            <InputGroupAddon addonType="prepend">
                                            <InputGroupText>@</InputGroupText>
                                            </InputGroupAddon>
                                            <Input id="prependedInput" size="16" type="text" />
                                        </InputGroup>
                                        <p className="help-block">Here's some help text</p>
                                    </div>

                                </FormGroup> */}

                                <FormGroup >
                                    <Label htmlFor="Mensaje"> <strong>Mensaje</strong> </Label>
                                    <div className="controls">
                                        <InputGroup className="input-prepend">
                                            <InputGroupAddon addonType="prepend">
                                            <InputGroupText>*</InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="select" innerRef={this.mensajeRef} name="Mensaje" id="Mensaje">
                                                <option value="1">Acepto éste documento</option>
                                                <option value="2">Acepto Parcialmente éste documento</option>
                                                <option value="3">Rechazo éste documento</option>
                                            </Input>
                                        </InputGroup>
                                    </div>
                                </FormGroup>

                                <FormGroup >
                                    <Label htmlFor="CondicionImpuesto"> <strong>Condicion de Impuesto</strong> </Label>
                                    <div className="controls">
                                        <InputGroup className="input-prepend">
                                            <InputGroupAddon addonType="prepend">
                                            <InputGroupText></InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="select" innerRef={this.condicionImpuestoRef} name="CondicionImpuesto" id="CondicionImpuesto">
                                                <option value="00">Seleccione</option>
                                                <option value="01">General Credito IVA</option>
                                                <option value="02">General Credito parcial del IVA</option>
                                                <option value="03">Bienes de Capital</option>
                                                <option value="04">Gasto Corriente no genera credito</option>
                                                <option value="05">Proporcionalidad</option>
                                                
                                            </Input>
                                        </InputGroup>
                                    </div>
                                </FormGroup>

                                <FormGroup >
                                    <Label htmlFor="MontoTotalImpuestoAcreditar"> <strong>Monto Total Impuesto Acreditar</strong> </Label>
                                    <div className="controls">
                                        <InputGroup className="input-prepend">
                                            <InputGroupAddon addonType="prepend">
                                            <InputGroupText></InputGroupText>
                                            </InputGroupAddon>
                                            <Input innerRef={this.montoTotalImpuestoAcreditarRef} type="text" name="MontoTotalImpuestoAcreditar" id="MontoTotalImpuestoAcreditar" placeholder="0.00000" />
                                        </InputGroup>
                                    </div>
                                </FormGroup>

                                <FormGroup >
                                    <Label htmlFor="MontoTotalImpuestoAcreditar"> <strong>Monto Total De Gasto Aplicable</strong> </Label>
                                    <div className="controls">
                                        <InputGroup className="input-prepend">
                                            <InputGroupAddon addonType="prepend">
                                            <InputGroupText></InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="text" innerRef={this.montoTotalImpuestoAcreditarRef} name="MontoTotalImpuestoAcreditar" id="MontoTotalImpuestoAcreditar" placeholder="0.00000" />
                                        </InputGroup>
                                    </div>
                                </FormGroup>

                                <FormGroup >
                                    <Label htmlFor="select"> <strong>Detalle Mensaje</strong> </Label>
                                    <div className="controls">
                                        <InputGroup className="input-prepend">
                                            <InputGroupAddon addonType="prepend">
                                            <InputGroupText>*</InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="textarea" name="textarea-input" id="textarea-input" rows="7" placeholder="Content..." />
                                        </InputGroup>
                                    </div>
                                </FormGroup>

                            </Form>
                        </CardBody>
                    </Card>
                </TabPane>

                <TabPane tabId="2">
                    {`2. ${this.lorem()}`}
                </TabPane>

                <TabPane tabId="3">
                    {`3. ${this.lorem()}`}
                </TabPane>
            </>
        );
    }

    guardarDocumento = (e) => {
        e.preventDefault();

    };

    render() {

        let dataRow = [];

        this.props.documentos.map( documento => {

            dataRow.push({
                'id_documento' : documento.id_documento,
                'documento': documento.documento,
                'nombre_emisor': documento.nombre_emisor,
                'FechaEmisionDoc': documento.FechaEmisionDoc,
                'MontoTotalImpuesto': documento.MontoTotalImpuesto,
                'consecutivo': documento.consecutivo,
                'TotalFactura': documento.TotalFactura,
                'Estatus': documento.Estatus,
                'DetalleMensaje': documento.DetalleMensaje,
                'Fecha_aceptacion': documento.Fecha_aceptacion,
                'id_empresa': documento.id_empresa,
                'Empresa': documento.Empresa,
                
            });

        } );

        return (
            <div className="animated fadeIn">
                <Row> 
                    <Col xs="12" lg="12">
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i> Documentos de hacienda
                            </CardHeader>
                            <CardBody>

                                <BootstrapTable data={dataRow} striped hover  pagination >
                                    <TableHeaderColumn isKey dataField='id_documento'   width='160px'>Documento ID</TableHeaderColumn>
                                    <TableHeaderColumn dataField='documento'            width='160px' filter={ { type: 'RegexFilter', placeholder: 'Buscar...' } } >Documento</TableHeaderColumn>
                                    <TableHeaderColumn dataField='nombre_emisor'        width='160px' filter={ { type: 'RegexFilter', placeholder: 'Buscar...' } } >Emisor</TableHeaderColumn>
                                    <TableHeaderColumn dataField='FechaEmisionDoc'      width='300px' filter={ { type: 'DateFilter' } } dataFormat={ this.dateFormatter } >Fecha Doc</TableHeaderColumn>
                                    <TableHeaderColumn dataField='MontoTotalImpuesto'   width='160px' filter={ { type: 'RegexFilter', placeholder: 'Buscar...' } } >Monto Impuesto</TableHeaderColumn>
                                    <TableHeaderColumn dataField='consecutivo'          width='160px' filter={ { type: 'RegexFilter', placeholder: 'Buscar...' } } >Consecutivo</TableHeaderColumn>
                                    <TableHeaderColumn dataField='TotalFactura'         width='160px' filter={ { type: 'RegexFilter', placeholder: 'Buscar...' } } >Total Doc</TableHeaderColumn>
                                    <TableHeaderColumn dataField='Estatus'              width='160px' filter={ { type: 'RegexFilter', placeholder: 'Buscar...' } } >Estatus Hacienda</TableHeaderColumn>
                                    <TableHeaderColumn dataField='DetalleMensaje'       width='160px' filter={ { type: 'RegexFilter', placeholder: 'Buscar...' } } >Detalle Mensaje</TableHeaderColumn>
                                    <TableHeaderColumn dataField='Fecha_aceptacion'     width='300px' filter={ { type: 'DateFilter' } } dataFormat={ this.dateFormatter } >Fecha Aceptacion</TableHeaderColumn>
                                    <TableHeaderColumn dataField='id_empresa'           width='160px' filter={ { type: 'RegexFilter', placeholder: 'Buscar...' } } >Id Empresa</TableHeaderColumn>
                                    <TableHeaderColumn dataField='Empresa'              width='160px' filter={ { type: 'RegexFilter', placeholder: 'Buscar...' } } >Empresa</TableHeaderColumn>
                                    <TableHeaderColumn dataField='action'               width='160px' dataFormat={this.buttonGroup} >Acciones</TableHeaderColumn>
                                </BootstrapTable>,

                            </CardBody>
                        </Card>

                    </Col>
                </Row>

                <Modal isOpen={this.state.modal} toggle={this.aceptarRechazar} className={'modal-lg'}>
                <Form onSubmit={this.login}>
                    <ModalHeader toggle={this.aceptarRechazar}> Aceptar / Rechazar Documento </ModalHeader>
                    <ModalBody>
                        
                        <Nav tabs>

                            <NavItem>
                                <NavLink active={this.state.activeTab[0] === '1'} onClick={() => { this.MostarTab(0, '1'); }} >
                                    ¿Que desea hacer con este documento?
                                </NavLink>
                            </NavItem>

                            <NavItem>
                                <NavLink active={this.state.activeTab[0] === '2'} onClick={() => { this.MostarTab(0, '2'); }}>
                                    Datos del documento
                                </NavLink>
                            </NavItem>

                            <NavItem>
                                <NavLink active={this.state.activeTab[0] === '3'} onClick={() => { this.MostarTab(0, '3'); }}>
                                    Datos del emisor
                                </NavLink>
                            </NavItem>

                        </Nav>

                        <TabContent activeTab={this.state.activeTab[0]}>
                            {this.tabPane()}
                        </TabContent>
                        
                    </ModalBody>

                  <ModalFooter>
                    <Button type="submit" color="primary" >Guardar</Button>{' '}
                    <Button color="secondary" onClick={this.aceptarRechazar}>Cancel</Button>
                  </ModalFooter>
                </Form>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => {

    return {
        usuario: state.usuario.usuario,
        documentos: state.documentos.documentos
    };
};

//export default CargaDocumentos;
export default connect(mapStateToProps, {getDocumentos, obtenerUsuario, mostrarDocumentos, verPDFAction})(CargaDocumentos);