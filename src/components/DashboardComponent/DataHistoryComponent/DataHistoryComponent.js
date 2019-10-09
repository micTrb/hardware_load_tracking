import React from 'react';

import { withStyles } from '@material-ui/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import { columns } from "./tableConfigs";

import { getHardwareAvg } from "../../../utils/mathCalculations";

import TablePaginationActionsComponent from './TablePaginationActionsComponent';

import StatsComponent from './StatsComponent';

import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

const styles = {
  root: {
    width: '100%',
    marginTop: "10px",
    overflowX: 'auto',
  },
  table: {
    minWidth: 450,
  },
  tableTitle: {
    flex: '0 0 auto',
    padding: "10px",
    float: "left"
  },
  buttonList: [{
    paddingLeft: "0%",
    listStyle: "none",
    margin: "0%",
    overflow: "hidden"
  },
    {mainClass: "list-group list-group-horizontal"}],
  listEl: {
    float: "left",
    height: "40px",
    paddingRight:"10px",
    marginTop: "10px",

  },
  button: {
    display: "block",
    width: "130px",

  },
  redRow: {
    backgroundColor: '#ff3900',
    color: '#ffffff'
  },
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  switchDense: {

  }

};


class DataHistoryComponent extends React.Component {


  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      rowsPerPage: 5,
      dense: true,
      dataLenght: 0,
      rangeSelected: "last_hour",

    };

    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    this.handleChangeDense = this.handleChangeDense.bind(this);

    this.onClickLastWeek = this.onClickLastWeek.bind(this);
    this.onClickLastDay = this.onClickLastDay.bind(this);
    this.onClickLastHour = this.onClickLastHour.bind(this);
    this.onClickAnomalies = this.onClickAnomalies.bind(this);

  }

  handleChangePage(event, newPage) {
    this.setState({page: newPage});
  };

  handleChangeRowsPerPage(event) {
    this.setState({
      rowsPerPage: parseInt(event.target.value, 10)
    });
    this.setState({page: 0});
  };

  handleChangeDense(event) {
    this.setState({dense: event.target.checked });
  }

  onClickLastWeek() {
    this.props.getLastWeekRange();
    this.setState({rangeSelected: "last_week"});
  }

  onClickLastDay() {
    this.props.getLastDayRange();
    this.setState({rangeSelected: "last_day"});
  }

  onClickLastHour() {
    this.props.getLastHourRange();
    this.setState({rangeSelected: "last_hour"});
  }

  onClickAnomalies() {
    this.props.getAnomalies();
  }




  /*********************************************************************************************************************/

  componentDidMount() {
    this.props.getLastHourRange();
  }


  /* RENDER */

  render() {
    return (
      <div className="row">




        {/*TABLE*/}
        <div className="col-md-8">
          <h6>Log history</h6>
          <Paper className={this.props.classes.root} width={100}>
            <div className={this.props.classes.tableTitle}>
              {(() => {
                switch(this.state.rangeSelected) {
                  case 'last_week':
                    return <Typography>Last Week</Typography>;

                  case 'last_day':
                    return <Typography>Last Day</Typography>;

                  case 'last_hour':
                    return <Typography>Last Hour</Typography>;
                  default:
                    return null;
                }
              })()}
            </div>
            <Table
              className={this.props.classes.table}
              stickyHeader
              size={this.state.dense ? 'small' : 'medium'}>


              <TableHead>
                <TableRow>
                  {columns.map(column => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {
                  this.props.data.slice(this.state.page * this.state.rowsPerPage,
                    this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map(row =>
                    (row.cpu > 0.80 || row.gpu > 0.80 || row.memory > 0.80) ?
                      (<TableRow key={row.id} style={{ height: (this.state.dense ? 33 : 53) }} className={this.props.classes.redRow}>
                        <TableCell align="right">{row.timestamp}</TableCell>
                        <TableCell align="right">{row.cpu}</TableCell>
                        <TableCell align="right">{row.gpu}</TableCell>
                        <TableCell align="right">{row.memory}</TableCell>
                      </TableRow>) :
                      (<TableRow key={row.id} >
                        <TableCell align="right">{row.timestamp}</TableCell>
                        <TableCell align="right">{row.cpu}</TableCell>
                        <TableCell align="right">{row.gpu}</TableCell>
                        <TableCell align="right">{row.memory}</TableCell>
                      </TableRow>)

                  )
                }
              </TableBody>

              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 50, 100]}
                    colSpan={3}
                    count={this.props.data.length}
                    rowsPerPage={this.state.rowsPerPage}
                    page={this.state.page}
                    SelectProps={{
                      inputProps: { 'aria-label': 'rows per page' },
                      native: true,
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActionsComponent}
                  />


                </TableRow>

              </TableFooter>
            </Table>
          </Paper>
          <FormControlLabel
            className={this.props.classes.switchDense}
            control={<Switch checked={this.state.dense} onChange={this.handleChangeDense} />}
            label="Dense padding"
          />


          {/*BUTTON LIST*/}
          <div>

            <ul className={`list-group list-group-horizontal ${this.props.classes.buttonList}`}>
              <li className={`list-group list-group-horizontal ${this.props.classes.listEl}`}>
                <button className={`btn btn-primary ${this.props.classes.button}`} onClick={this.onClickLastWeek}>Last Week</button>
              </li>
              <li className={`list-group list-group-horizontal ${this.props.classes.listEl}`}>
                <button className={`btn btn-primary ${this.props.classes.button}`} onClick={this.onClickLastDay}>Last Day</button>
              </li>
              <li className={`list-group list-group-horizontal ${this.props.classes.listEl}`}>
                <button className={`btn btn-primary ${this.props.classes.button}`} onClick={this.onClickLastHour}>Last Hour</button>
              </li>
              <li className={`list-group list-group-horizontal ${this.props.classes.listEl}`}>
                <button className={`btn btn-danger ${this.props.classes.button}`} onClick={this.onClickAnomalies}>Get anomalies</button>
              </li>
            </ul>
          </div>

        </div>



        {/*AVERAGES Table*/}
        <div className="col-md-2" >
          <h6>Calculations</h6>
          <Card className={this.props.classes.card}>
            <div className="row">
              <div className="col-md-6">
                <StatsComponent
                  title={"Average CPU"}
                  content={getHardwareAvg("cpu", this.props.data).toFixed(2)}
                />
              </div>
              <div className="col-md-6">
                <StatsComponent
                  title={"Current CPU"}
                  content={this.props.lastData.cpu}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <StatsComponent
                  title={"Average GPU"}
                  content={getHardwareAvg("gpu", this.props.data).toFixed(2)}
                />
              </div>
              <div className="col-md-6">
                <StatsComponent
                  title={"Current GPU"}
                  content={this.props.lastData.gpu}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <StatsComponent
                  title={"Average RAM"}
                  content={getHardwareAvg("memory", this.props.data).toFixed(2)}
                />
              </div>
              <div className="col-md-6">
                <StatsComponent
                  title={"Current RAM"}
                  content={this.props.lastData.memory}
                />
              </div>
            </div>
          </Card>
        </div>


      </div>
    );
  }
}


export default withStyles(styles)(DataHistoryComponent);
