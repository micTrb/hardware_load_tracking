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
    this.getGenevaAnomalies = this.getGenevaAnomalies.bind(this);

    this.setLastHourRangeFawltyTowers = this.setLastHourRangeFawltyTowers.bind(this);
    this.setLastDayRangeFawltyTowers = this.setLastDayRangeFawltyTowers.bind(this);
    this.setLastWeekRangeFawltyTowers = this.setLastWeekRangeFawltyTowers.bind(this);
    this.getFawltyTowersAnomalies = this.getFawltyTowersAnomalies.bind(this);

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
      memory: (isNaN(last_record.memory) || last_record.memory == null) ? 0 : parseFloat(last_record.memory).toFixed(2),
      location: last_record.location,
      timestamp: readableTimestamp(last_record.timestamp)
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


  //Setting ranges for both cities
  /****************************************************/

  //GENEVA
  setLastHourRangeGeneva() {
    getLastHourGeneva().then(value => {
      let response = value.data.data.store_metrics;
      this.setState({
        geneva_range: response.map(obj => this.lastRecordPrep(obj))
      })
    });
  }

  setLastDayRangeGeneva() {
    getYesterdayGeneva().then(value => {
      let response = value.data.data.store_metrics;
      this.setState({
        geneva_range: response.map(obj => this.lastRecordPrep(obj))
      })
    });
  }

  setLastWeekRangeGeneva() {
    getLastWeekGeneva().then(value => {
      let response = value.data.data.store_metrics;
      this.setState({
        geneva_range: response.map(obj => this.lastRecordPrep(obj))
      })
    });
  }



  getGenevaAnomalies() {
    console.log("ANO");
  }



  /****************************************************/


  //FAWLTY TOWERS
  setLastHourRangeFawltyTowers() {
    getLastHourFawltyTowers().then(value => {
      let response = value.data.data.store_metrics;
      this.setState({
        fawlty_towers_range: response.map(obj => this.lastRecordPrep(obj))
      })
    });
  }

  setLastDayRangeFawltyTowers() {
    getYesterdayFawltyTowers().then(value => {
      let response = value.data.data.store_metrics;
      this.setState({
        fawlty_towers_range: response.map(obj => this.lastRecordPrep(obj))
      })
    });
  }

  setLastWeekRangeFawltyTowers() {
    getLastWeekFawltyTowers().then(value => {
      let response = value.data.data.store_metrics;
      this.setState({
        fawlty_towers_range: response.map(obj => this.lastRecordPrep(obj))
      })
    });
  }

  getFawltyTowersAnomalies() {
    console.log("ANO");
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
            <div className="main" style={{padding: "50px"}}>

              {/* First Row */ }

              {/*TITLE*/}
              <div className="row">
                <div className="col-md-2">
                </div>
                <div className="col-md-8">
                  <h2>Geneva</h2>
                </div>
                <div className="col-md-2">
                </div>
              </div>

              <br/>

              <div className="row">
                {/*Geneva Radial Gauge*/}
                <div className="col-md-3">
                  <CircularGaugeComponent
                    data={this.state.geneva_data}
                  />
                </div>
                <div className="col-md-8">
                  <DataHistoryComponent
                    location={this.state.geneva_data.location}
                    data={this.state.geneva_range}
                    lastData={this.state.geneva_data}
                    getLastHourRange={this.setLastHourRangeGeneva}
                    getLastDayRange={this.setLastDayRangeGeneva}
                    getLastWeekRange={this.setLastWeekRangeGeneva}
                    getAnomalies={this.getGenevaAnomalies}
                  />
                </div>

              </div>

              <br/>
              <br/>
              <hr/>
              <br/>
              <br/>

              {/*Second row*/}

              {/*TITLE*/}
              <div className="row">
                <div className="col-md-2">
                </div>
                <div className="col-md-8">
                  <h2>Fawlty towers</h2>
                </div>
                <div className="col-md-2">
                </div>
              </div>

              <br/>

              <div className="row">
                {/*Fawlty Towers Radial Gauge*/}
                <div className="col-md-3">

                  <CircularGaugeComponent
                    data={this.state.fawlty_towers_data}
                  />
                </div>
                <div className="col-md-8">
                  <DataHistoryComponent
                    location={this.state.fawlty_towers_data.location}
                    data={this.state.fawlty_towers_range}
                    lastData={this.state.fawlty_towers_data}
                    getLastHourRange={this.setLastHourRangeFawltyTowers}
                    getLastDayRange={this.setLastDayRangeFawltyTowers}
                    getLastWeekRange={this.setLastWeekRangeFawltyTowers}
                    getAnomalies={this.getFawltyTowersAnomalies}
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
