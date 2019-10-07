import React from 'react';
import ReactApexCharts from 'react-apexcharts';

import {getLastHourGeneva, getLastWeekGeneva, getYesterdayGeneva} from "../../../data/queryFunctions";


class LineChartComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          zoom: {
            enabled: false
          },
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          width: [5, 7, 5],
          curve: 'straight',
          dashArray: [0, 8, 5]
        },

        title: {
          text: 'Page Statistics',
          align: 'left'
        },
        markers: {
          size: 0,

          hover: {
            sizeOffset: 6
          }
        },
        xaxis: {
          categories: [...Array(10)].map((_, i) => "1"),
        },
        tooltip: {
          y: [{
            title: {
              formatter: function (val) {
                return val + " (mins)"
              }
            }
          }, {
            title: {
              formatter: function (val) {
                return val + " per session"
              }
            }
          }, {
            title: {
              formatter: function (val) {
                return val;
              }
            }
          }]
        },
        grid: {
          borderColor: '#f1f1f1',
        }
      },
      series: [{
          name: "Session Duration",
          data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10]
        },
        {
          name: "Page Views",
          data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35]
        },
        {
          name: 'Total Visits',
          data: [87, 57, 74, 99, 75, 38, 62, 47, 82, 56, 45, 47]
        }
      ],
    }
    this.getWeekData = this.getWeekData.bind(this);

  }


  dataPreparator(data) {
    let log = data;

    // formatting the last record
    let formatted_log = {
      cpu: (data.cpu * 100).toFixed(2),
      gpu: (parseFloat(data.gpu) * 100).toFixed(2),
      memory: (parseFloat(data.memory) * 100).toFixed(2),
      location: data.location,
      timestamp: data.timestamp
    }
    return formatted_log;
  }


  makeSeries(objArr, hardware_name) {
    let series_array = [];
    var prop = hardware_name;
    for(let i = 0; i < objArr.length; i++) {
      series_array.push(objArr[i][prop])
    }

    console.log(series_array);
  }

  makeSeriesArray(objArray) {
    let cpu_label = "CPU",
        gpu_label = "GPU",
        memory_label = "RAM";

    let series_array = [{
        name: cpu_label,
        data: this.makeSeries(objArray, "cpu")
      },
      {
        name: gpu_label,
        data: this.makeSeries(objArray, "gpu")
      },
      {
        name: memory_label,
        data: this.makeSeries(objArray, "memory")
    }];
  }

  getWeekData() {
    getLastWeekGeneva().then(response => {

      let metrics = response.data.data.store_metrics;
      let formatted_metrics = metrics.map(data => this.dataPreparator(data));

      console.log(formatted_metrics);
      this.setState({
        series: this.makeSeriesArray(formatted_metrics)
      });
    })
  }



  render() {

    return (

      <div id="chart">
        <button
          onClick={this.getWeekData}
          className="bt btn-primary">
            { "GET WEEK "}
        </button>
        <ReactApexCharts options={this.state.options} series={this.state.series} type="line" height="350"/>
      </div>
    )
  }

}

export default LineChartComponent;
