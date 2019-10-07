import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

import { getLastGenevaRecord, getLastFawltyTowersRecord } from '../../data/queryFunctions';

import CircularGaugeComponent from "./CircularGaugeComponent";
import LineChartComponent from "./LineChartComponent";


class DashboardComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      geneva_data: { cpu: 0, gpu: 0, memory:0, location: "", timestamp: "" },
      fawlty_towers_data: { cpu: 0, gpu: 0, memory:0, location: "", timestamp: "" },
      geneva_ranges: {
        geneva_last_week: [],
        geneva_last_day: [],
        geneva_last_hour: [],
        geneva_custom_range: []
      },
      fawlty_towers_ranges: {
        fawlty_towers_last_week: [],
        fawlty_towers_last_day: [],
        fawlty_towers_last_hour: [],
        fawlty_towers_custom_range: []
      }

    };

    this.tickLastData = this.tickLastData.bind(this);
  }

  componentWillMount() {
    this.tickLastData();
  }

  componentDidMount() {
    setInterval(() => this.tickLastData(), 3000);
  }


  //Functions for radial gauge charts
  /****************************************************/

  lastRecordPrep(data) {
    let last_record = data;

    // formatting the last record
    let formatted_last_record = {
      cpu: last_record.cpu,
      gpu: parseFloat(last_record.gpu),
      memory: parseFloat(last_record.memory),
      location: last_record.location,
      timestamp: last_record.timestamp
    }
    return formatted_last_record;
  }


  tickLastData() {
    getLastGenevaRecord().then(value => {
      this.setState({ geneva_data: this.lastRecordPrep(value.data.data.store_metrics[0]) });
    });

    getLastFawltyTowersRecord().then(value => {
      this.setState({ fawlty_towers_data: this.lastRecordPrep(value.data.data.store_metrics[0]) });
    });
  }




  render() {

    return (
      <div>
        <div className="content-area">
          <div className="container-fluid">
            <div className="main" style={{paddingTop: "50px"}}>

              {/* First Row */ }

              <div className="row">

                {/*Geneva Radial Gauge*/}
                <div className="col-md-4">
                  <CircularGaugeComponent
                    data={this.state.geneva_data}
                  />
                </div>
                <div className="col-md-8">
                  <LineChartComponent/>
                </div>

              </div>

              <div className="row">

                {/*Geneva Radial Gauge*/}
                <div className="col-md-4">
                  <CircularGaugeComponent
                    data={this.state.fawlty_towers_data}
                  />
                </div>
                {/*<div className="col-md-8">
                  <LineChartComponent/>
                </div>*/}

              </div>

            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DashboardComponent;
