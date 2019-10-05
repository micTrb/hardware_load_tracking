import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

import getGenevaLastRecord from '../../data/queries';

import CircularGaugeComponent from "./CircularGaugeComponent";

class DashboardComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      geneva_data: {}
    };

    this.tickData = this.tickData.bind(this);
  }

  timerID;


  componentDidMount() {
    this.timerID = setInterval(() => this.tickData(), 3000);
  }


  tickData() {
    getGenevaLastRecord().then(value => {
      let last_record = value.data.data.store_metrics[0];

      // formatting the last Geneva record
      let formatted_last_record = {
        cpu: last_record.cpu,
        gpu: parseFloat(last_record.gpu),
        memory:parseFloat(last_record.memory),
        location: last_record.location,
        timestamp: last_record.timestamp
      }

      this.setState({ geneva_data: formatted_last_record }, () => console.log(this.state));
    });
  }

  render() {

    return (
      <div>

        <div className="content-area">
          <div className="container-fluid">
            <div className="main">


              {/* Second Row */ }
              <div className="row">
                <div className="col-md-5">
                  <div className="box radialbox mt-4">
                    <div>

                      <CircularGaugeComponent
                        data={this.state.geneva_data}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-md-7">
                  <div className="box mt-4">
                    <div className="mt-4">
                      <div id="progress1"> Progress 1 </div>
                    </div>
                    <div className="mt-4">
                      <div id="progress2"> Progress </div>
                    </div>
                    <div className="mt-4">
                      <div id="progress3"> Progress 3</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="float-right edit-on-codepen">

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
