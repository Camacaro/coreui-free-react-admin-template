import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Button,
    Modal, ModalBody, Form, FormGroup,  Input,FormText
 } from 'reactstrap';
// import { MDBDataTable, MDBBtn, MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import Swal from 'sweetalert2'


/** Redux */
import { connect } from 'react-redux';
import { obtenerUsuario } from '../../actions/user-action';
import environment from '../../config';
import { ExportCSV } from '../../helper/excel';

import { getDocumentosPorRevisar, mostrarDocumentosPorRevisar, mandarAProceso, archivar, eliminarDocuemntoArchivado} from '../../actions/documentosPorRevisar-action';


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

class DocumentosPorRevisar extends Component {

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

        await this.props.getDocumentosPorRevisar( usuario.db, usuario.access_token );

        await this.props.mostrarDocumentosPorRevisar();

        this.setState({cargar: false});
    }

    enviarProceso = async (id) => {

        this.setState({cargar: true});

        const respuesta = await this.props.mandarAProceso(id, this.state.usuario.db, this.state.usuario.access_token);

        if ( respuesta.ok ) {

            await this.props.eliminarDocuemntoArchivado(id);

            this.setState({cargar: false});

            Swal.fire(
                'Documentos Hacienda!',
                respuesta.message,
                'success'
            );
        }
    }

    archivar = async (id) => {

        this.setState({cargar: true});

        const respuesta = await this.props.archivar(id, this.state.usuario.db, this.state.usuario.access_token);

        if ( respuesta.ok ) {

            await this.props.eliminarDocuemntoArchivado(id);

            this.setState({cargar: false});

            Swal.fire(
                'Documentos Hacienda!',
                respuesta.message,
                'success'
            );
        }
    }

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
                <Button block color="warning" className="btn-pill"> 
                    <a 
                        style={aStyle}
                        target="_blank" 
                        href={`${environment.VER_XML}/${this.state.usuario.db}/${row.id_documento}`}
                        title="Ver XML">
                        Ver XML 
                    </a>
                </Button>

                <Button block color="success"   className="btn-pill" onClick={ () => this.enviarProceso(row.id_documento) } > Enviar a proceso </Button>
                <Button block color="danger"   className="btn-pill" onClick={ () => this.archivar(row.id_documento) } > Archivar </Button>
            </React.Fragment>
        );
    }

    dateFormatter = (cell, row) => {
        const date = new Date(row.FechaEmisionDoc);
        
        return `${('0' + date.getDate()).slice(-2)}/${('0' + (date.getMonth() + 1)).slice(-2)}/${date.getFullYear()}`;
    }

    descargarReporte(){

        console.log('descargarReporte');

        const dateIn =  new Date( this.dateIn.current.value );
        const dateOut =  new Date( this.dateOut.current.value );

        if (dateIn == '' || dateOut == '') {
            
            return Swal.fire(
                'Descargar Reporte!',
                'Debe llenar los campos de fecha',
                'error'
            );

        } else {

            const documentos = [...this.props.documentosPorRevisar];
    
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

        this.props.documentosPorRevisar.map( documento => {

            dataRow.push({
                'id_documento' : documento.id_documento,
                'documento': documento.documento,
                'nombre_emisor': documento.nombre_emisor,
                'FechaEmisionDoc': documento.FechaEmisionDoc,
                'MontoTotalImpuesto': documento.MontoTotalImpuesto,
                'TotalFactura': documento.TotalFactura,
                'DetalleMensaje': documento.DetalleMensaje,
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
                                <i className="fa fa-align-justify"></i> Descargar Reporte
                            </CardHeader>
                            <CardBody>

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
                                <i className="fa fa-align-justify"></i> Documentos de hacienda Rechazados
                            </CardHeader>
                            <CardBody>
                                <BootstrapTable data={dataRow} striped hover  pagination >
                                    <TableHeaderColumn isKey dataField='id_documento'   width='160px' filter={ { type: 'RegexFilter', placeholder: 'Buscar...' } }>Documento ID</TableHeaderColumn>
                                    <TableHeaderColumn dataField='documento'            width='160px' filter={ { type: 'RegexFilter', placeholder: 'Buscar...' } } >Documento</TableHeaderColumn>
                                    <TableHeaderColumn dataField='nombre_emisor'        width='160px' filter={ { type: 'RegexFilter', placeholder: 'Buscar...' } } >Emisor</TableHeaderColumn>
                                    <TableHeaderColumn dataField='FechaEmisionDoc'      width='300px' dataFormat={ this.dateFormatter } filter={ { type: 'DateFilter' } }  >Fecha Doc</TableHeaderColumn>
                                    <TableHeaderColumn dataField='MontoTotalImpuesto'   width='160px' filter={ { type: 'RegexFilter', placeholder: 'Buscar...' } } >Monto Impuesto</TableHeaderColumn>
                                    <TableHeaderColumn dataField='TotalFactura'         width='160px' filter={ { type: 'RegexFilter', placeholder: 'Buscar...' } } >Total Doc</TableHeaderColumn>
                                    <TableHeaderColumn dataField='DetalleMensaje'       width='160px' filter={ { type: 'RegexFilter', placeholder: 'Buscar...' } } >Detalle Mensaje</TableHeaderColumn>
                                    <TableHeaderColumn dataField='action'               width='160px' dataFormat={this.buttonGroup} >Acciones</TableHeaderColumn>
                                </BootstrapTable>,

                            </CardBody>
                        </Card>

                    </Col>
                    
                </Row>
            </div>
        );
    }
}

const mapStateToProps = state => {

    return {
        usuario: state.usuario.usuario,
        documentosPorRevisar: state.documentosPorRevisar.documentosPorRevisar
    };
};

//export default CargaDocumentos;
export default connect(mapStateToProps, {obtenerUsuario, getDocumentosPorRevisar, mostrarDocumentosPorRevisar, mandarAProceso, archivar, eliminarDocuemntoArchivado})(DocumentosPorRevisar);
