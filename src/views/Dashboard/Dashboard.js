import React, { Component} from 'react';
import { Pie } from 'react-chartjs-2';
import {
  CardColumns,
  Card,
  CardBody,
  CardHeader,
} from 'reactstrap';

/** Redux */
import { connect } from 'react-redux';
import { obtenerUsuario } from '../../actions/user-action';
import { getGraficaUNO, mostrarGraficaUNO } from '../../actions/dashboard-action';


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
        pie : {
            labels: [
              'Aceptados',
              'Rechazados',
              'Sin Estatus',
            ],
            datasets: [{
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
        }
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

        // this.setState({cargar: true});

        await this.props.getGraficaUNO( usuario.db, usuario.access_token );

        await this.props.mostrarGraficaUNO();

        console.log(this.props.graficaUno);

        // this.setState({cargar: false});
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

    render() {

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

        const graficaDos = {
            labels: [
              '1 Dias',
              '2 Dias',
              '3 Dias',
              '4 Dias',
              '5 Dias',
              '6 Dias',
              '7 Dias',
              '8 Dias',
            ],
            datasets: [{
                data: [
                    10, 20, 30, 40, 50, 60, 70, 80
                ],
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

        return (

            <div className="animated fadeIn">
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
                    <Pie data={ graficaUno } />
                </div>
                </CardBody>
            </Card>


            <Card>
                <CardHeader>
                Pie Chart
                <div className="card-header-actions">
                    <a href="http://www.chartjs.org" className="card-header-action">
                    <small className="text-muted">docs</small>
                    </a>
                </div>
                </CardHeader>
                <CardBody>
                <div className="chart-wrapper">
                    <Pie data={graficaDos} />
                </div>
                </CardBody>
            </Card>


            <Card>
                <CardHeader>
                Pie Chart
                <div className="card-header-actions">
                    <a href="http://www.chartjs.org" className="card-header-action">
                    <small className="text-muted">docs</small>
                    </a>
                </div>
                </CardHeader>
                <CardBody>
                <div className="chart-wrapper">
                    <Pie data={this.state.pie} />
                </div>
                </CardBody>
            </Card>

            <Card>
                <CardHeader>
                Pie Chart
                <div className="card-header-actions">
                    <a href="http://www.chartjs.org" className="card-header-action">
                    <small className="text-muted">docs</small>
                    </a>
                </div>
                </CardHeader>
                <CardBody>
                <div className="chart-wrapper">
                    <Pie data={this.state.pie} />
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
        graficaUno: state.graficas.graficaUno
    };
};

//export default Dashboard;
export default connect(mapStateToProps, {obtenerUsuario, getGraficaUNO, mostrarGraficaUNO})(Dashboard);
