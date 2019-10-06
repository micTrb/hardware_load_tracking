import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

import { getLastGenevaRecord,
  getLastWeekGeneva,
  getLastFawltyTowersRecord
} from '../../data/queryFunctions';

import CircularGaugeComponent from "./CircularGaugeComponent";


class DashboardComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      geneva_data: { cpu: 0, gpu: 0, memory:0, location: "", timestamp: "" },
      fawlty_towers_data: { cpu: 0, gpu: 0, memory:0, location: "", timestamp: "" },
      geneva_last_week: [],
    };

    this.tickLastData = this.tickLastData.bind(this);
    this.getLastWeekGenevaData = this.getLastWeekGenevaData.bind(this);
  }

  componentWillMount() {
    this.tickLastData();
    this.getLastWeekGenevaData();
  }

  componentDidMount() {
    setInterval(() => this.tickLastData(), 3000);
    setTimeout(() => this.getLastWeekGenevaData(), 1000 )
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
      console.log(value);
      this.setState({ geneva_data: this.lastRecordPrep(value.data.data.store_metrics[0]) }, () => console.log(this.state));
    });

    getLastFawltyTowersRecord().then(value => {
      this.setState({ fawlty_towers_data: this.lastRecordPrep(value.data.data.store_metrics[0]) }, () => console.log(this.state));
    });
  }


  //Functions for line charts
  /****************************************************/

  getLastWeekGenevaData() {
    getLastWeekGeneva().then(value => {
      console.log(value);
      this.setState({ geneva_last_week: value.data.data.store_metrics })
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
                <div className="col-md-6">
                  <CircularGaugeComponent
                    data={this.state.geneva_data}
                  />
                </div>
                <div className="col-md-6">
                  <CircularGaugeComponent
                    data={this.state.fawlty_towers_data}
                  />
                </div>


              </div>
              <div className="row">
              </div>







            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DashboardComponent;
