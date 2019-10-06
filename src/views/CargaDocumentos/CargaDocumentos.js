import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Button,
    Modal, ModalBody, ModalFooter, ModalHeader,
    Nav, NavItem, NavLink,  TabContent, TabPane,
    Form, FormGroup,  Input, InputGroup, InputGroupAddon,  Label, InputGroupText,
    Alert, FormText
 } from 'reactstrap';
// import { MDBDataTable, MDBBtn, MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import Swal from 'sweetalert2'


/** Redux */
import { connect } from 'react-redux';
import { getDocumentos, mostrarDocumentos, putDocumento, mandarARevision, cargarDocumento, getFragmentarDocumentos, eliminarDocuemnto } from '../../actions/cargaDocumentos-action';
import { obtenerUsuario } from '../../actions/user-action';
import environment from '../../config';
import { ExportCSV } from '../../helper/excel';


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

class CargaDocumentos extends Component {

    // tab 1
    mensajeRef = React.createRef();
    condicionImpuestoRef = React.createRef();
    montoTotalImpuestoAcreditarRef = React.createRef();
    montoTotalDeGastoAplicableRef = React.createRef();
    detalleMensajeRef = React.createRef();
    // tab 2
    idDocumentoRef = React.createRef();
    documentoRef = React.createRef();
    claveRef  = React.createRef();
    fechaEmisionDocRef  = React.createRef();
    montoTotalImpuestoRef  = React.createRef();
    totalFacturaRef  = React.createRef();
    // tab 3
    emisorRef = React.createRef();
    tipoDocEmisor = React.createRef();
    numeroCedulaEmisor = React.createRef();
    telefonoEmisor = React.createRef();
    correoEmisor = React.createRef();

    // Reporte
    dateIn = React.createRef();
    dateOut = React.createRef();

    state = {
        usuario: {},
        modal: false,
        activeTab: new Array(4).fill('1'),
        documento: '',
        error: false,
        cargar: false,
        dataReporte: '',
    }

    async componentDidMount(){

        this.props.obtenerUsuario();

        const { usuario } = this.props;

        this.setState({
            usuario
        });

        this.setState({cargar: true});

        await this.props.getDocumentos( usuario.db, usuario.access_token );

        await this.props.mostrarDocumentos();

        this.setState({cargar: false});
    }

    aceptarRechazar = (id) => { 

        const documento = this.props.documentos.filter( documento => {
            return documento.id_documento == id;
        })[0];

        this.setState({modal: !this.state.modal, documento: documento});
    };

    cerrarModalAceptarRechazar = () => {
        this.setState({modal: !this.state.modal});
    }


    enviarRevision = async (id) => { 

        this.setState({cargar: true});

        const respuesta = await this.props.mandarARevision(id, this.state.usuario.db, this.state.usuario.access_token);

        if ( respuesta.ok ) {

            // this.props.documentos.map( documento => {
                
            //     if ( documento.id_documento == id ) {
                    
            //         documento.Estatus = respuesta.estatus;
            //     }
            // });

            await this.props.eliminarDocuemnto(id);

            this.setState({cargar: false});

            Swal.fire(
                'Documentos Hacienda!',
                respuesta.message,
                'success'
            );
        }
    };

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

    tabPane() {
        return (
            <>
                <TabPane tabId="1">
                    <Card>
                        <CardBody>
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
                                    <Label htmlFor="MontoTotalDeGastoAplicable"> <strong>Monto Total De Gasto Aplicable</strong> </Label>
                                    <div className="controls">
                                        <InputGroup className="input-prepend">
                                            <InputGroupAddon addonType="prepend">
                                            <InputGroupText></InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="text" innerRef={this.montoTotalDeGastoAplicableRef} name="MontoTotalDeGastoAplicable" id="MontoTotalDeGastoAplicable" placeholder="0.00000" />
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
                                            <Input type="textarea" innerRef={this.detalleMensajeRef} name="DetalleMensaje" id="DetalleMensaje" rows="7" placeholder="Content..." />
                                        </InputGroup>
                                    </div>
                                </FormGroup>
                        </CardBody>
                    </Card>
                </TabPane>

                <TabPane tabId="2">
                    <Card>
                        <CardBody>
                        <Input type="hidden" innerRef={this.idDocumentoRef} defaultValue={this.state.documento.id_documento}  name="id_documento" id="id_documento" />
                            <FormGroup >
                                <Label htmlFor="documento"> <strong>Documento</strong> </Label>
                                <div className="controls">
                                    <InputGroup className="input-prepend">
                                        <InputGroupAddon addonType="prepend">
                                        <InputGroupText></InputGroupText>
                                        </InputGroupAddon>
                                        <Input type="text" innerRef={this.documentoRef} defaultValue={this.state.documento.documento}  name="documento" id="documento" placeholder="Tipo de documento" />
                                    </InputGroup>
                                </div>
                            </FormGroup>  
                            
                            <FormGroup >
                                <Label htmlFor="Clave"> <strong>Clave</strong> </Label>
                                <div className="controls">
                                    <InputGroup className="input-prepend">
                                        <InputGroupAddon addonType="prepend">
                                        <InputGroupText></InputGroupText>
                                        </InputGroupAddon>
                                        <Input type="text" innerRef={this.claveRef} defaultValue={this.state.documento.Clave} name="Clave" id="Clave" placeholder="Clave" />
                                    </InputGroup>
                                </div>
                            </FormGroup> 

                            <FormGroup >
                                <Label htmlFor="FechaEmisionDoc"> <strong>Fecha Emision</strong> </Label>
                                <div className="controls">
                                    <InputGroup className="input-prepend">
                                        <InputGroupAddon addonType="prepend">
                                        <InputGroupText></InputGroupText>
                                        </InputGroupAddon>
                                        <Input type="text" innerRef={this.fechaEmisionDocRef} defaultValue={this.state.documento.FechaEmisionDoc} name="FechaEmisionDoc" id="FechaEmisionDoc" placeholder="Fecha Emision" />
                                    </InputGroup>
                                </div>
                            </FormGroup>  

                            <FormGroup >
                                <Label htmlFor="MontoTotalImpuesto"> <strong> Monto Total Impuesto </strong> </Label>
                                <div className="controls">
                                    <InputGroup className="input-prepend">
                                        <InputGroupAddon addonType="prepend">
                                        <InputGroupText></InputGroupText>
                                        </InputGroupAddon>
                                        <Input type="text" innerRef={this.montoTotalImpuestoRef}  name="MontoTotalImpuesto" id="MontoTotalImpuesto" placeholder="0.0000" />
                                    </InputGroup>
                                </div>
                            </FormGroup> 

                            <FormGroup >
                                <Label htmlFor="TotalFactura"> <strong> Total </strong> </Label>
                                <div className="controls">
                                    <InputGroup className="input-prepend">
                                        <InputGroupAddon addonType="prepend">
                                        <InputGroupText></InputGroupText>
                                        </InputGroupAddon>
                                        <Input type="text" innerRef={this.totalFacturaRef} defaultValue={this.state.documento.TotalFactura} name="TotalFactura" id="TotalFactura" placeholder="Total" />
                                    </InputGroup>
                                </div>
                            </FormGroup>  
                        </CardBody>
                    </Card>
                </TabPane>

                <TabPane tabId="3">
                    <Card>
                        <CardBody>
                            <FormGroup >
                                <Label htmlFor="nombre_emisor"> <strong>Nombre Emisor</strong> </Label>
                                <div className="controls">
                                    <InputGroup className="input-prepend">
                                        <InputGroupAddon addonType="prepend">
                                        <InputGroupText></InputGroupText>
                                        </InputGroupAddon>
                                        <Input type="text" innerRef={this.emisorRef} defaultValue={this.state.documento.nombre_emisor}  name="nombre_emisor" id="nombre_emisor" placeholder="Emisor" />
                                    </InputGroup>
                                </div>
                            </FormGroup>  
                            
                            <FormGroup >
                                <Label htmlFor="tipo_doc_emisor"> <strong>Tipo Doc Emisor</strong> </Label>
                                <div className="controls">
                                    <InputGroup className="input-prepend">
                                        <InputGroupAddon addonType="prepend">
                                        <InputGroupText></InputGroupText>
                                        </InputGroupAddon>
                                        <Input type="text" innerRef={this.tipoDocEmisor} defaultValue={this.state.documento.tipo_doc_emisor} name="tipo_doc_emisor" id="tipo_doc_emisor" placeholder="Tipo Doc Emisor" />
                                    </InputGroup>
                                </div>
                            </FormGroup> 

                            <FormGroup >
                                <Label htmlFor="NumeroCedulaEmisor"> <strong>Numero Cedula</strong> </Label>
                                <div className="controls">
                                    <InputGroup className="input-prepend">
                                        <InputGroupAddon addonType="prepend">
                                        <InputGroupText></InputGroupText>
                                        </InputGroupAddon>
                                        <Input type="text" innerRef={this.numeroCedulaEmisor} defaultValue={this.state.documento.NumeroCedulaEmisor} name="NumeroCedulaEmisor" id="NumeroCedulaEmisor" placeholder="Numero Cedula" />
                                    </InputGroup>
                                </div>
                            </FormGroup>  

                            <FormGroup >
                                <Label htmlFor="telefono_emisor"> <strong> Telefono Emisor </strong> </Label>
                                <div className="controls">
                                    <InputGroup className="input-prepend">
                                        <InputGroupAddon addonType="prepend">
                                        <InputGroupText></InputGroupText>
                                        </InputGroupAddon>
                                        <Input type="text" innerRef={this.telefonoEmisor} defaultValue={this.state.documento.telefono_emisor} name="telefono_emisor" id="telefono_emisor" placeholder="Telefono Emisor" />
                                    </InputGroup>
                                </div>
                            </FormGroup> 

                            <FormGroup >
                                <Label htmlFor="correo_emisor"> <strong> Correo Emisor </strong> </Label>
                                <div className="controls">
                                    <InputGroup className="input-prepend">
                                        <InputGroupAddon addonType="prepend">
                                        <InputGroupText></InputGroupText>
                                        </InputGroupAddon>
                                        <Input type="text" innerRef={this.correoEmisor} defaultValue={this.state.documento.correo_emisor} name="correo_emisor" id="correo_emisor" placeholder="Correo Emisor" />
                                    </InputGroup>
                                </div>
                            </FormGroup>  
                        </CardBody>
                    </Card>
                </TabPane>
            </>
        );
    }

    guardarDocumento = async e => {
        e.preventDefault();
        this.setState({error: false});

        const Mensaje = this.mensajeRef.current.value;
        const CondicionImpuesto = this.condicionImpuestoRef.current.value;
        const MontoTotalImpuestoAcreditar = this.montoTotalImpuestoAcreditarRef.current.value;
        const MontoTotalDeGastoAplicableRef = this.montoTotalDeGastoAplicableRef.current.value;
        const DetalleMensaje = this.detalleMensajeRef.current.value;

        const id_documento = this.idDocumentoRef.current.value;
        const documento = this.documentoRef.current.value;
        const Clave = this.claveRef .current.value;
        const FechaEmisionDoc = this.fechaEmisionDocRef.current.value;
        const MontoTotalImpuesto = this.montoTotalImpuestoRef .current.value;
        const TotalFactura = this.totalFacturaRef .current.value;

        const nombre_emisor = this.emisorRef.current.value;
        const tipo_doc_emisor = this.tipoDocEmisor.current.value;
        const NumeroCedulaEmisor = this.numeroCedulaEmisor.current.value;
        const telefono_emisor = this.telefonoEmisor.current.value;
        const correo_emisor = this.correoEmisor.current.value;

        if( Mensaje == '' || DetalleMensaje == '' ) {
            
            this.setState({error: true});

        }else{

            this.setState({cargar: true});
            
            const documentoData = {
                Mensaje,
                CondicionImpuesto,
                MontoTotalImpuestoAcreditar,
                MontoTotalDeGastoAplicableRef,
                DetalleMensaje,
                id_documento,
                documento,
                Clave,
                FechaEmisionDoc,
                MontoTotalImpuesto,
                TotalFactura,
                nombre_emisor,
                tipo_doc_emisor,
                NumeroCedulaEmisor,
                telefono_emisor,
                correo_emisor
            };            

            const respuesta = await this.props.putDocumento(documentoData, this.state.usuario.db, this.state.usuario.access_token);

            if( respuesta.ok ){

                this.props.documentos.map( documento => {
                    
                    if ( documento.id_documento == id_documento ) {
                        
                        documento.consecutivo        = respuesta.consecutivo;
                        documento.DetalleMensaje     = DetalleMensaje;
                        documento.MontoTotalImpuesto = MontoTotalImpuesto;
                    }
                });
    
                this.setState({cargar: false});
    
                this.cerrarModalAceptarRechazar();
    
                Swal.fire(
                    'Documentos Hacienda!',
                    respuesta.message,
                    'success'
                );
            }
        }        
    };

    onChangeDocument = (e) => {
        this.setState({

            file: e.target.files[0]

        }, async () => { 

            console.log(this.state.file);
            await this.props.cargarDocumento(this.state.file, this.state.usuario.db, this.state.usuario.access_token);
        });
    }

    async fragmentarDocumentos() {
        
        this.setState({cargar: true});
        
        const respuesta = await this.props.getFragmentarDocumentos( this.state.usuario.db, this.state.usuario.access_token );

        if ( respuesta.ok ) {

            this.setState({cargar: false});

            Swal.fire(
                'Documentos Hacienda!',
                respuesta.message,
                'success'
            );
        }
    }

    descargarReporte(){

        const dateIn =  new Date( this.dateIn.current.value );
        const dateOut =  new Date( this.dateOut.current.value );

        if (dateIn == '' || dateOut == '') {
            
            return Swal.fire(
                'Descargar Reporte!',
                'Debe llenar los campos de fecha',
                'error'
            );

        } else {

            const documentos = [...this.props.documentos];
    
            const dataExport = documentos.filter( documento => {
                
                let date = new Date(documento.FechaEmisionDoc);
                return (date >= dateIn && date <= dateOut);
            } );

            this.setState({
                dataReporte: dataExport 
            });
        }
    }

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


                <Modal isOpen={this.state.cargar} className="modal-load">
                    <ModalBody>

                        { LOAD }
                    
                    </ModalBody>
                </Modal>

                <Row> 
                <Col xs="12" lg="12">
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i> Cargar Documento
                            </CardHeader>
                            <CardBody>

                                <Button color="danger" className="mb-2" onClick={ () => this.fragmentarDocumentos() }>Generar Compra</Button>{' '}
                                
                                <Form>
                                    <FormGroup >
                                        <div className="controls">
                                            <InputGroup className="input-prepend">

                                                <div className="input-group">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text" id="inputGroupFileAddon01">
                                                            Cargar XML
                                                        </span>
                                                    </div>
                                                    <div className="custom-file">
                                                        <input
                                                            type="file"
                                                            className="custom-file-input"
                                                            aria-describedby="inputGroupFileAddon01"
                                                            onChange={ this.onChangeDocument }
                                                            accept="text/xml"
                                                        />
                                                        <label className="custom-file-label" htmlFor="inputGroupFile01">
                                                            Elegir Archivo
                                                        </label>
                                                    </div>
                                                </div>

                                            </InputGroup>
                                        </div>
                                        
                                    </FormGroup>
                                </Form>
                                
                                <Label htmlFor="exampleInputName2" className="pr-1">Descargar Reporte</Label>

                                <Form inline>
                                    
                                    <FormGroup className="pr-1">
                                        <Input innerRef={this.dateIn} type="date" id="date-in" name="date-input" placeholder="inicio" />
                                        <FormText color="muted"> </FormText>
                                    </FormGroup>
                                    <FormGroup className="pr-1">
                                        <Input innerRef={this.dateOut} type="date" id="date-out" name="date-input" placeholder="fin" />
                                        <FormText color="muted"> </FormText>
                                    </FormGroup>

                                    <Button color="primary" onClick={ () => this.descargarReporte() }>filtrar</Button> {' '}
                                    
                                    { this.state.dataReporte != '' ? <ExportCSV csvData={this.state.dataReporte} fileName="file" /> : ''} 
                                </Form>
                            </CardBody>
                        </Card>

                    </Col>

                    <Col xs="12" lg="12">
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i> Documentos de hacienda
                            </CardHeader>
                            <CardBody>
                                <BootstrapTable data={dataRow} striped hover  pagination >
                                    {/* <TableHeaderColumn isKey dataField='id_documento'   width='160px' filter={ { type: 'RegexFilter', placeholder: 'Buscar...' } }>Documento ID</TableHeaderColumn> */}
                                    <TableHeaderColumn isKey dataField='documento'      width='140px' filter={ { type: 'RegexFilter', placeholder: 'Buscar...' } } >Documento</TableHeaderColumn>
                                    <TableHeaderColumn dataField='nombre_emisor'        width='300px' filter={ { type: 'RegexFilter', placeholder: 'Buscar...' } } >Emisor</TableHeaderColumn>
                                    <TableHeaderColumn dataField='FechaEmisionDoc'      width='170px' dataFormat={ this.dateFormatter } filter={ { type: 'DateFilter' } }  >Fecha Doc</TableHeaderColumn>
                                    <TableHeaderColumn dataField='MontoTotalImpuesto'   width='140px' filter={ { type: 'RegexFilter', placeholder: 'Buscar...' } } >Monto Impuesto</TableHeaderColumn>
                                    <TableHeaderColumn dataField='consecutivo'          width='200px' filter={ { type: 'RegexFilter', placeholder: 'Buscar...' } } >Consecutivo</TableHeaderColumn>
                                    <TableHeaderColumn dataField='TotalFactura'         width='160px' filter={ { type: 'RegexFilter', placeholder: 'Buscar...' } } >Total Doc</TableHeaderColumn>
                                    <TableHeaderColumn dataField='Estatus'              width='160px' filter={ { type: 'RegexFilter', placeholder: 'Buscar...' } } >Estatus Hacienda</TableHeaderColumn>
                                    <TableHeaderColumn dataField='DetalleMensaje'       width='160px' filter={ { type: 'RegexFilter', placeholder: 'Buscar...' } } >Detalle Mensaje</TableHeaderColumn>
                                    <TableHeaderColumn dataField='Fecha_aceptacion'     width='170px' filter={ { type: 'DateFilter' } } dataFormat={ this.dateFormatter } >Fecha Aceptacion</TableHeaderColumn>
                                    <TableHeaderColumn dataField='id_empresa'           width='120px' filter={ { type: 'RegexFilter', placeholder: 'Buscar...' } } >Id Empresa</TableHeaderColumn>
                                    <TableHeaderColumn dataField='Empresa'              width='160px' filter={ { type: 'RegexFilter', placeholder: 'Buscar...' } } >Empresa</TableHeaderColumn>
                                    <TableHeaderColumn dataField='action'               width='160px' dataFormat={this.buttonGroup} >Acciones</TableHeaderColumn>
                                </BootstrapTable>,

                            </CardBody>
                        </Card>

                    </Col>
                    
                </Row>

                <Modal isOpen={this.state.modal} toggle={this.cerrarModalAceptarRechazar} className={'modal-lg'}>
                <Form onSubmit={this.guardarDocumento}>
                    <ModalHeader toggle={this.cerrarModalAceptarRechazar}> Aceptar / Rechazar Documento </ModalHeader>
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

                            { this.state.error ? <Alert  color="danger"> Debe llenar los datos con * </Alert> : '' }
                        </TabContent>
                        
                        
                    </ModalBody>

                  <ModalFooter>
                    <Button type="submit" color="primary" >Guardar</Button>{' '}
                    <Button color="secondary" onClick={this.cerrarModalAceptarRechazar}>Cancel</Button>
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
export default connect(mapStateToProps, {getDocumentos, obtenerUsuario, mostrarDocumentos, putDocumento, mandarARevision, cargarDocumento, getFragmentarDocumentos, eliminarDocuemnto})(CargaDocumentos);
