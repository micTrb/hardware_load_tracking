import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class DashboardComponent extends Component {
  render() {
    return (
      <div>

        <div className="content-area">
          <div className="container-fluid">
            <div className="main">

              {/*First Row */}

              <div className="row mt-4">
                <div className="col-md-5">
                  <div className="box columnbox mt-4">
                    <div id="columnchart">
                      COLUMN
                    </div>
                  </div>
                </div>
                <div className="col-md-7">
                  <div className="box  mt-4">
                    <div id="linechart">
                      LINE
                    </div>
                  </div>
                </div>
              </div>

              {/* Second Row */ }
              <div className="row">
                <div className="col-md-5">
                  <div className="box radialbox mt-4">
                    <div id="circlechart">
                      CIRCEL
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
