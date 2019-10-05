import React from 'react';
import ReactApexCharts from 'react-apexcharts'
import _ from 'lodash';

class CircularGaugeComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        labels: ['CPU', 'GPU', 'MEMORY'],
        series: [32, 53, 51],
        /*colors: [this.colorFunction(this.state.series[0], '#00974a', '#ff3400'),
          this.colorFunction(this.state.series[1], '#0e4a97', '#ff3400'),
          this.colorFunction(this.state.series[2], '#b28000', '#ff3400')
        ],*/
        colors: ['#00974a', '#ff3400', '#00974a'],
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
                return 249
              }
            }
          }
        }
      },
      series: [32, 45, 67],


      anomalies: [],
    }
  }

  componentWillUpdate(nextProps) {
    if(this.props.data !== nextProps.data) {
      this.updateSeries(nextProps);
      this.checkAnomalies({cpu: 81.3, gpu: 84.3, memory: 77.3});
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

    let new_colors = values.map(val => () => console.log(val));

    return new_colors;

  }

  checkAnomalies(newProps) {
    let anomalies = [];
    console.log(newProps);
    for(let key in newProps) {
      console.log(newProps[key]);
      if(newProps[key] > 80) {
        anomalies.push({
          key: key,
          value: newProps[key]
        })
      };
    }

    this.setState({anomalies: anomalies}, () => console.log(this.state.anomalies));
  }

  colorFunction(value, normalColor, alertColor) {
    if (value < 80) {
      return normalColor;
    }
    else {
      return alertColor;
    }
  }





  alertBox() {
    return(
      <div>
        <h6 color="red">ALERT</h6>
        <ul>
          {this.state.anomalies.map((element) => <li key={element.key}>{element.key} is {element.value}</li>)}
        </ul>

      </div>
    )
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
          {this.alertBox()}
        </div>


      )

  }
}

export default CircularGaugeComponent;
