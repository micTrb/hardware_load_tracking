import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

import {
  getLastGenevaRecord,
  getLastFawltyTowersRecord,
  getLastHourGeneva, getYesterdayGeneva, getLastWeekGeneva,
  getLastHourFawltyTowers, getLastWeekFawltyTowers, getYesterdayFawltyTowers
} from '../../data/queryFunctions';

import CircularGaugeComponent from "./CircularGaugeComponent";
import DataHistoryComponent from "./DataHistoryComponent";
import {readableTimestamp} from "../../utils/dateFormatter";


class DashboardComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      geneva_data: { cpu: 0, gpu: 0, memory:0, location: "", timestamp: "" },
      fawlty_towers_data: { cpu: 0, gpu: 0, memory:0, location: "", timestamp: "" },
      geneva_range: [],
      fawlty_towers_range: []

    };

    this.tickLastData = this.tickLastData.bind(this);
    this.setLastHourRangeGeneva = this.setLastHourRangeGeneva.bind(this);
    this.setLastDayRangeGeneva = this.setLastDayRangeGeneva.bind(this);
    this.setLastWeekRangeGeneva = this.setLastWeekRangeGeneva.bind(this);

    this.setLastHourRangeFawltyTowers = this.setLastHourRangeFawltyTowers.bind(this);
    this.setLastDayRangeFawltyTowers = this.setLastDayRangeFawltyTowers.bind(this);
    this.setLastWeekRangeFawltyTowers = this.setLastWeekRangeFawltyTowers.bind(this);

  }

  //Functions for radial gauge charts
  /****************************************************/

  lastRecordPrep(data) {
    let last_record = data;

    // formatting the last record
    let formatted_last_record = {
      id: last_record.id,
      cpu: (last_record.cpu == null) ? 0 : last_record.cpu.toFixed(2),
      gpu: (last_record.gpu == null) ? 0 : parseFloat(last_record.gpu).toFixed(2),
      memory: (last_record.memory == null) ? 0 : parseFloat(last_record.memory).toFixed(2),
      location: last_record.location,
      timestamp: readableTimestamp(last_record.timestamp)
    }
    return formatted_last_record;
  }


  tickLastData() {
    getLastGenevaRecord().then(value => {
      this.setState({ geneva_data: this.lastRecordPrep(value.data.data.store_metrics[0]) }, () => console.log(this.state));
    });

    getLastFawltyTowersRecord().then(value => {
      this.setState({ fawlty_towers_data: this.lastRecordPrep(value.data.data.store_metrics[0]) });
    });


  }


  //Setting ranges for both cities
  /****************************************************/

  //GENEVA
  setLastHourRangeGeneva() {
    getLastHourGeneva().then(value => {
      console.log(value);
      let response = value.data.data.store_metrics;
      console.log(response);
      this.setState({
        geneva_range: response.map(obj => this.lastRecordPrep(obj))
      }, () => console.log(this.state))
    });
  }

  setLastDayRangeGeneva() {
    getYesterdayGeneva().then(value => {
      console.log(value);
      let response = value.data.data.store_metrics;
      console.log(response);
      this.setState({
        geneva_range: response.map(obj => this.lastRecordPrep(obj))
      }, () => console.log(this.state))
    });
  }

  setLastWeekRangeGeneva() {
    getLastWeekGeneva().then(value => {
      console.log(value);
      let response = value.data.data.store_metrics;
      console.log(response);
      this.setState({
        geneva_range: response.map(obj => this.lastRecordPrep(obj))
      }, () => console.log(this.state))
    });
  }


  /****************************************************/


  //FAWLTY TOWERS
  setLastHourRangeFawltyTowers() {
    getLastHourFawltyTowers().then(value => {
      console.log(value);
      let response = value.data.data.store_metrics;
      console.log(response);
      this.setState({
        fawlty_towers_range: response.map(obj => this.lastRecordPrep(obj))
      }, () => console.log(this.state))
    });
  }

  setLastDayRangeFawltyTowers() {
    getYesterdayFawltyTowers().then(value => {
      console.log(value);
      let response = value.data.data.store_metrics;
      console.log(response);
      this.setState({
        fawlty_towers_range: response.map(obj => this.lastRecordPrep(obj))
      }, () => console.log(this.state))
    });
  }

  setLastWeekRangeFawltyTowers() {
    getLastWeekFawltyTowers().then(value => {
      console.log(value);
      let response = value.data.data.store_metrics;
      console.log(response);
      this.setState({
        fawlty_towers_range: response.map(obj => this.lastRecordPrep(obj))
      }, () => console.log(this.state))
    });
  }







  componentWillMount() {
    this.tickLastData();

  }

  componentDidMount() {
    setInterval(() => this.tickLastData(), 3000);
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
                  <DataHistoryComponent
                    location={this.state.geneva_data.location}
                    data={this.state.geneva_range}
                    getLastHourRange={this.setLastHourRangeGeneva}
                    getLastDayRange={this.setLastDayRangeGeneva}
                    getLastWeekRange={this.setLastWeekRangeGeneva}
                  />
                </div>

              </div>

              <br/>

              <div className="row">

                {/*Fawlty Towers Radial Gauge*/}
                <div className="col-md-4">
                  <CircularGaugeComponent
                    data={this.state.fawlty_towers_data}
                  />
                </div>
                <div className="col-md-8">
                  <DataHistoryComponent
                    location={this.state.fawlty_towers_data.location}
                    data={this.state.fawlty_towers_range}
                    getLastHourRange={this.setLastHourRangeFawltyTowers}
                    getLastDayRange={this.setLastDayRangeFawltyTowers}
                    getLastWeekRange={this.setLastWeekRangeFawltyTowers}
                  />
                </div>


              </div>

            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DashboardComponent;
