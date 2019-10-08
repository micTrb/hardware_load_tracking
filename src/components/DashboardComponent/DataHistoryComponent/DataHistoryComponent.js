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

import TablePaginationActionsComponent from './TablePaginationActionsComponent';

const styles = {
  root: {
    width: '100%',
    marginTop: "10px",
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
  buttonList: {
    paddingLeft: "0%",
    listStyle: "none",
    margin: "0%",
    paddingTop: "20%",
  },
  redRow: {
    backgroundColor: '#ff3900',
    color: '#ffffff'
  }

};


class DataHistoryComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {

      page: 0,
      rowsPerPage: 5,
      dataLenght: 0,
      //emptyRows: this.state.rowsPerPage - Math.min(this.state.rowsPerPage, this.state.rows.length - this.state.page * this.state.rowsPerPage)
      options: {
        location: "",
        data: []
      }

    };

    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);

    this.onClickLastWeek = this.onClickLastWeek.bind(this);
    this.onClickLastDay = this.onClickLastDay.bind(this);
    this.onClickLastHour = this.onClickLastHour.bind(this);

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

  onClickLastWeek() {
    this.props.getLastWeekRange();
  }

  onClickLastDay() {
    this.props.getLastDayRange();
  }

  onClickLastHour() {
    this.props.getLastHourRange();
  }

  componentDidMount() {
    this.props.getLastHourRange();
  }


  render() {
    return (
      <div className="row">

        <div className="col-md-10">


          <Paper className={this.props.classes.root}>
            <Table className={this.props.classes.table} stickyHeader>


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
                      (<TableRow key={row.id} className={this.props.classes.redRow}>
                        <TableCell align="right">{row.id}</TableCell>
                        <TableCell align="right">{row.timestamp}</TableCell>
                        <TableCell align="right">{row.cpu}</TableCell>
                        <TableCell align="right">{row.gpu}</TableCell>
                        <TableCell align="right">{row.memory}</TableCell>
                      </TableRow>) :
                      (<TableRow key={row.id} >
                        <TableCell align="right">{row.id}</TableCell>
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

        </div>

        <div className="col-md-2">
          <ul className={this.props.classes.buttonList}>
            <li><button className="btn-primary" onClick={this.onClickLastWeek}>Last Week</button></li>
            <br/>
            <li><button className="btn-primary" onClick={this.onClickLastDay}>Last Day</button></li>
            <br/>
            <li><button className="btn-primary" onClick={this.onClickLastHour}>Last Hour</button></li>

          </ul>
        </div>
      </div>
    );
  }

}


export default withStyles(styles)(DataHistoryComponent);
