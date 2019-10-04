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
import { ExportCSV } from '../../helper/excel';

import { getReportes, mostrarReportes } from '../../actions/Reportes-action';


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

class Reporte extends Component {

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

        await this.props.getReportes( usuario.db, usuario.access_token );

        await this.props.mostrarReportes();

        this.setState({cargar: false});
    }


    dateFormatter = (cell, row) => {
        const date = new Date(row.fecha_factura);
        
        return `${('0' + date.getDate()).slice(-2)}/${('0' + (date.getMonth() + 1)).slice(-2)}/${date.getFullYear()}`;
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

            const documentos = [...this.props.reportes];
    
            const dataExport = documentos.filter( documento => {
                
                let date = new Date(documento.fecha_factura);
                return (date >= dateIn && date <= dateOut);
            } );

            this.setState({
                dataReporte: dataExport 
            });
        }
    }

    render() {

        let dataRow = [];
        
        this.props.reportes.map( documento => {

            dataRow.push({
                'id_compra' : documento.id_compra,
                'proveedor': documento.proveedor,
                'n_fact_compra': documento.n_fact_compra,
                'fecha_factura': documento.fecha_factura,
                'credito_compra': documento.credito_compra,
                'sub_total_compra': documento.sub_total_compra,
                'descuento_compra': documento.descuento_compra,
                'full_tax_compra': documento.full_tax_compra,
                'full_total_compra': documento.full_total_compra,
                'TotalVentaNeta': documento.TotalVentaNeta,
                'TotalVenta': documento.TotalVenta,
                'TotalGravado': documento.TotalGravado
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
                                    <TableHeaderColumn isKey dataField='id_compra'   width='160px' filter={ { type: 'RegexFilter', placeholder: 'Buscar...' } }> ID</TableHeaderColumn>
                                    <TableHeaderColumn dataField='proveedor'            width='300px' filter={ { type: 'RegexFilter', placeholder: 'Buscar...' } } >Proveedor</TableHeaderColumn>
                                    <TableHeaderColumn dataField='n_fact_compra'        width='180px' filter={ { type: 'RegexFilter', placeholder: 'Buscar...' } } >Consecutivo</TableHeaderColumn>
                                    <TableHeaderColumn dataField='fecha_factura'      width='300px'  dataFormat={ this.dateFormatter } filter={ { type: 'DateFilter' } }  >Fecha Factura</TableHeaderColumn>
                                    <TableHeaderColumn dataField='credito_compra'   width='160px' filter={ { type: 'RegexFilter', placeholder: 'Buscar...' } } >Credito Compra</TableHeaderColumn>
                                    <TableHeaderColumn dataField='sub_total_compra'         width='160px' filter={ { type: 'RegexFilter', placeholder: 'Buscar...' } } >SubTota</TableHeaderColumn>
                                    <TableHeaderColumn dataField='descuento_compra'       width='160px' filter={ { type: 'RegexFilter', placeholder: 'Buscar...' } } >Descuento</TableHeaderColumn>
                                    <TableHeaderColumn dataField='full_tax_compra'       width='160px' filter={ { type: 'RegexFilter', placeholder: 'Buscar...' } } >Total Impuesto </TableHeaderColumn>
                                    <TableHeaderColumn dataField='full_total_compra'       width='160px' filter={ { type: 'RegexFilter', placeholder: 'Buscar...' } } >Total</TableHeaderColumn>
                                    <TableHeaderColumn dataField='TotalVentaNeta'       width='160px' filter={ { type: 'RegexFilter', placeholder: 'Buscar...' } } >Total Venta Neta</TableHeaderColumn>
                                    <TableHeaderColumn dataField='TotalVenta'       width='160px' filter={ { type: 'RegexFilter', placeholder: 'Buscar...' } } >Total Venta</TableHeaderColumn>
                                    <TableHeaderColumn dataField='TotalGravado'       width='160px' filter={ { type: 'RegexFilter', placeholder: 'Buscar...' } } >Total Gravado</TableHeaderColumn>
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
        reportes: state.reportes.reportes
    };
};

//export default CargaDocumentos;
export default connect(mapStateToProps, {obtenerUsuario, getReportes, mostrarReportes})(Reporte);
