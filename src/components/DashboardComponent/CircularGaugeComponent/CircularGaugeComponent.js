import React from 'react';
import ReactApexCharts from 'react-apexcharts'
import _ from 'lodash';

class CircularGaugeComponent extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);

    this.state = {
      options: {
        labels: ['CPU', 'GPU', 'MEMORY'],
        colors: [
          this.colorFunction(this.props.data.cpu, '#00974a', '#ff3400'),
          this.colorFunction(this.props.data.gpu, '#00974a', '#ff3400'),
          this.colorFunction(this.props.data.memory, '#00974a', '#ff3400')
        ],
        radialBar: {
          dataLabels: {
            name: {
              fontSize: '22px',
            },
            value: {
              fontSize: '16px',
            },
            total: {
              show: true,
              label: 'Total',
              formatter: function (w) {
                // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                return w
              }
            }
          }
        }
      },
      series: [],
    }
  }

  componentWillMount() {
    this.updateSeries(this.props);
  }

  componentWillUpdate(nextProps) {
    if(this.props.data !== nextProps.data) {
      this.updateSeries(nextProps);
      this.updateColors(nextProps);
    }
  }

  updateSeries(newProps) {
    let hardware_load_obj = {
      cpu: (newProps.data.cpu * 100).toFixed(2),
      gpu: (newProps.data.gpu * 100).toFixed(2),
      memory: (newProps.data.memory * 100).toFixed(2)
    }

    let values = _.values(hardware_load_obj);

    this.setState({series: values}, () => console.log(this.state));
  }

  updateColors(newProps) {
    let hardware_load_obj = {
      cpu: (newProps.data.cpu * 100).toFixed(2),
      gpu: (newProps.data.gpu * 100).toFixed(2),
      memory: (newProps.data.memory * 100).toFixed(2)
    }

    let values = _.values(hardware_load_obj);

    let new_colors = values.map(val => this.colorFunction(val, '#00974a', '#ff2f07'));

    this.setState({options: { colors: new_colors }}, () => console.log(this.state.options.colors));
  }



  colorFunction(value, normalColor, alertColor) {
    if (value < 80) {
      return normalColor;
    }
    else {
      return alertColor;
    }
  }



  render() {
     return(
        <div id="chart">
          <ReactApexCharts
            options={this.state.options}
            series={this.state.series}
            type="radialBar"
            height="350"
          />
        </div>


      )

  }
}

export default CircularGaugeComponent;
