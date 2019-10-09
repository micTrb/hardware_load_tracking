import React from 'react';
import ReactApexCharts from 'react-apexcharts'
import _ from 'lodash';

class CircularGaugeComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        labels: ['CPU', 'GPU', 'MEMORY'],
        colors: [
          this.colorFunction(this.props.data.cpu, '#00c316', '#ff3200'),
          this.colorFunction(this.props.data.gpu, '#00c316', '#ff3200'),
          this.colorFunction(this.props.data.memory, '#00c316', '#ff3200')
        ],
        radialBar: {
          dataLabels: {
            name: {
              fontSize: '3em',
            },
            value: {
              fontSize: '1.5em',
            },

          }
        }
      },
      series: [],
    }
  }

  //Lifecycles
  componentWillMount() {
    this.updateSeries(this.props);
  }

  componentWillUpdate(nextProps) {
    if(this.props.data !== nextProps.data) {
      this.updateSeries(nextProps);
      this.updateColors(nextProps);
    }
  }

  //Data formatting
  dataPrep(newProps) {
    let hardware_load_obj = {
      cpu: (newProps.data.cpu * 100).toFixed(2),
      gpu: (newProps.data.gpu * 100).toFixed(2),
      memory: (newProps.data.memory * 100).toFixed(2)
    };

    let values = _.values(hardware_load_obj);

    return values;
  }

  //Updates functions
  updateSeries(newProps) {
    let values = this.dataPrep(newProps);
    this.setState({series: values});
  }

  updateColors(newProps) {
    let values = this.dataPrep(newProps);
    let new_colors = values.map(val => this.colorFunction(val, '#00974a', '#ff2f07'));
    this.setState({options: { colors: new_colors }});
  }


  //Utils functions
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
        <h6>Current hardware load percentage </h6>
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
