import React, { Component} from 'react';
import { Pie } from 'react-chartjs-2';
import {
  CardColumns,
  Card,
  CardBody,
  CardHeader,
} from 'reactstrap';


/** Almacenar en el localstorage */
import store from '../../store';

store.subscribe( () => {
    localStorage.setItem('user', JSON.stringify( store.getState() ) );
} );


const pie = {
    labels: [
      'Red',
      'Green',
      'Yellow',
    ],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
        ],
      }],
  };

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
    };
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

    return (

        <div className="animated fadeIn">
        <CardColumns className="cols-2">
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
                <Pie data={pie} />
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
                <Pie data={pie} />
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
                <Pie data={pie} />
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
                <Pie data={pie} />
              </div>
            </CardBody>
          </Card>
        </CardColumns>
      </div>
        
    );
  }
}

export default Dashboard;
