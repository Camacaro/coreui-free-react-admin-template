import React, { Component} from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import {
  CardColumns,
  Card,
  CardBody,
  CardHeader,
  Modal, ModalBody,
} from 'reactstrap';

/** Redux */
import { connect } from 'react-redux';
import { obtenerUsuario } from '../../actions/user-action';
import { getGraficaUNO, mostrarGraficaUNO,
    getGraficaDOS, mostrarGraficaDOS,
    getGraficaTRES, mostrarGraficaTRES,
    getGraficaCUATRO, mostrarGraficaCUATRO,
    getGraficaCINCO, mostrarGraficaCINCO } from '../../actions/dashboard-action';

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
    
class Dashboard extends Component {
    
    pie = {
        labels: [
          'Aceptados',
          'Rechazados',
          'Sin Estatus',
        ],
        datasets: [
          {
            data: [300, 50, 100],
            backgroundColor: [
              '#F7464A',
              '#46BFBD',
              '#FDB45C',
            ],
            hoverBackgroundColor: [
              '#F7464A',
              '#46BFBD',
              '#FDB45C',
            ],
          }],
    };

    state = {
        usuario: '',
        dropdownOpen: false,
        radioSelected: 2,
        graficaUno: {},
        graficaDos: {},
        graficaTres: {},
        graficaCuatro: {},
        graficaCinco: {},
    }

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
    }

    async componentDidMount(){

        this.props.obtenerUsuario();

        const { usuario } = this.props;

        this.setState({
            usuario
        });

        this.setState({cargar: true});

        // Grfica uno
        await this.props.getGraficaDOS( usuario.db, usuario.access_token );
        await this.props.mostrarGraficaUNO();

        // Grfica dos
        await this.props.getGraficaUNO( usuario.db, usuario.access_token );
        await this.props.mostrarGraficaDOS();

        // Grfica tres
        await this.props.getGraficaTRES( usuario.db, usuario.access_token );
        await this.props.mostrarGraficaTRES();

        // grafica cuatro
        await this.props.getGraficaCUATRO( usuario.db, usuario.access_token );
        await this.props.mostrarGraficaCUATRO();

         // grafica cinco
         await this.props.getGraficaCINCO( usuario.db, usuario.access_token );
         await this.props.mostrarGraficaCINCO();


        const graficaUno = {
            labels: [
                `Aceptados ${this.props.graficaUno.aceptadas} %`,
                `Rechazados ${this.props.graficaUno.rechazadas} %`,
                `Sin Estatus ${this.props.graficaUno.sin_estatus} %`
            ],
            datasets: [{
                data: [
                    this.props.graficaUno.aceptadas, 
                    this.props.graficaUno.rechazadas, 
                    this.props.graficaUno.sin_estatus
                ],
                backgroundColor: [
                  '#F7464A',
                  '#46BFBD',
                  '#FDB45C',
                ],
                hoverBackgroundColor: [
                  '#F7464A',
                  '#46BFBD',
                  '#FDB45C',
                ],
            }],
        }

        const graficaDos = this.estructuraGraficaDos();

        const graficaTres = {
            labels: [...this.props.graficaTres.leyenda],
            datasets: [{
                data: [...this.props.graficaTres.valores],
                backgroundColor: [
                  '#F7464A',
                  '#46BFBD',
                  '#FDB45C',
                ],
                hoverBackgroundColor: [
                  '#F7464A',
                  '#46BFBD',
                  '#FDB45C',
                ],
            }],
        }

        const graficaCuatro = this.estructuraGraficaCuatro();

        const graficaCinco = {
            labels: ['Aceptadas', 'Rechazadas', 'Sin Estatus'],
            datasets: [
              {
                label: this.props.graficaCinco.titulo,
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: [...this.props.graficaCinco.valores],
              },
            ],
        };

        this.setState({
            graficaUno,
            graficaDos,
            graficaTres,
            graficaCuatro,
            graficaCinco,
        });

        this.setState({cargar: false});
    }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected,
    });
  }

    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

    estructuraGraficaDos = () => {
        
        let leyenda = [];
        let contador = 0;

        this.props.graficaDos.leyenda.map(ley => {
            leyenda.push( `${ley} (${this.props.graficaDos.valores[contador]}%) (Can. Fac.${this.props.graficaDos.facturas[contador]} ) ` );
            contador++;
        } );

        return {
            labels: leyenda,
            datasets: [{
                data: [...this.props.graficaDos.valores],
                backgroundColor: [
                  '#F7464A',
                  '#46BFBD',
                  '#FDB45C',
                  '#F7464A',
                  '#46BFBD',
                  '#FDB45C',
                  '#F7464A',
                  '#46BFBD',
                ],
                hoverBackgroundColor: [
                  '#F7464A',
                  '#46BFBD',
                  '#FDB45C',
                  '#F7464A',
                  '#46BFBD',
                  '#FDB45C',
                  '#F7464A',
                  '#46BFBD',
                ],
            }],
        }
    }

    estructuraGraficaCuatro = () => {
        let leyenda = [];
        let contador = 0;

        this.props.graficaCuatro.leyenda.map(ley => {
            leyenda.push( `${ley} (${this.props.graficaCuatro.porcentaje[contador]}%) (Monto ${this.props.graficaCuatro.monto[contador]}) ` );
            contador++;
        } );

        return {
            labels: leyenda,
            datasets: [{
                data: [...this.props.graficaCuatro.monto],
                backgroundColor: [
                  '#F7464A',
                  '#46BFBD',
                  '#FDB45C',
                  '#F7464A',
                  '#46BFBD',
                  '#FDB45C',
                  '#F7464A',
                  '#46BFBD',
                ],
                hoverBackgroundColor: [
                  '#F7464A',
                  '#46BFBD',
                  '#FDB45C',
                  '#F7464A',
                  '#46BFBD',
                  '#FDB45C',
                  '#F7464A',
                  '#46BFBD',
                ],
            }]
        }
    }

    render() {

        

        return (

            <div className="animated fadeIn">
                <Modal isOpen={this.state.cargar} className="modal-load">
                    <ModalBody>

                        { LOAD }
                    
                    </ModalBody>
                </Modal>
                <CardColumns className="cols-2">
                    <Card>
                        <CardHeader>
                            Grafico de Facturas segun Estatus
                        <div className="card-header-actions">
                            <small className="text-muted"> { this.props.graficaUno.fecha } </small>
                        </div>
                        </CardHeader>
                        <CardBody>
                        <div className="chart-wrapper">
                            <Pie data={ this.state.graficaUno }  />
                        </div>
                        </CardBody>
                    </Card>


                    <Card>
                        <CardHeader>
                            {this.props.graficaDos.titulo}
                        <div className="card-header-actions">
                            <small className="text-muted">{ this.props.graficaDos.subtitulo }</small>
                        </div>
                        </CardHeader>
                        <CardBody>
                        <div className="chart-wrapper">
                            <Pie data={this.state.graficaDos} />
                        </div>
                        </CardBody>
                    </Card>


                    <Card>
                        <CardHeader>
                            {this.props.graficaTres.titulo}
                        <div className="card-header-actions">
                            <small className="text-muted"> { this.props.graficaTres.subtitulo } </small>
                        </div>
                        </CardHeader>
                        <CardBody>
                        <div className="chart-wrapper">
                            <Pie data={this.state.graficaTres} />
                        </div>
                        </CardBody>
                    </Card>

                    <Card>
                        <CardHeader>
                            {this.props.graficaCuatro.titulo}
                        <div className="card-header-actions">
                            <small className="text-muted"> {this.props.graficaCuatro.subtitulo} </small>
                        </div>
                        </CardHeader>
                        <CardBody>
                        <div className="chart-wrapper">
                            <Pie data={this.state.graficaCuatro}/>
                        </div>
                        </CardBody>
                    </Card>

                    <Card>
                        <CardHeader>
                            {this.props.getGraficaCINCO.titulo}
                        <div className="card-header-actions">
                            
                        </div>
                        </CardHeader>
                        <CardBody>
                        <div className="chart-wrapper">
                            <Bar data={this.state.graficaCinco} />
                        </div>
                        </CardBody>
                    </Card>
                </CardColumns>
            </div>
        );
    }
}

const mapStateToProps = state => {

    return {
        usuario: state.usuario.usuario,
        graficaUno: state.graficas.graficaUno,
        graficaDos: state.graficas.graficaDos,
        graficaTres: state.graficas.graficaTres,
        graficaCuatro: state.graficas.graficaCuatro,
        graficaCinco: state.graficas.graficaCinco,
    };
};

//export default Dashboard;
export default connect(mapStateToProps, {
    obtenerUsuario, 
    getGraficaUNO, mostrarGraficaUNO,
    getGraficaDOS, mostrarGraficaDOS,
    getGraficaTRES, mostrarGraficaTRES,
    getGraficaCUATRO, mostrarGraficaCUATRO,
    getGraficaCINCO, mostrarGraficaCINCO
})(Dashboard);
