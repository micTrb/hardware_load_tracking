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
};

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
  {
    id: 'population',
    label: 'Population',
    minWidth: 170,
    align: 'right',
    format: value => value.toLocaleString(),
  },
  {
    id: 'size',
    label: 'Size\u00a0(km\u00b2)',
    minWidth: 170,
    align: 'right',
    format: value => value.toLocaleString(),
  },
  {
    id: 'density',
    label: 'Density',
    minWidth: 170,
    align: 'right',
    format: value => value.toFixed(2),
  },
];

const rows = [
  createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
  createData('Italy', 'IT', 60483973, 301340),
  createData('United States', 'US', 327167434, 9833520),
  createData('Canada', 'CA', 37602103, 9984670),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Germany', 'DE', 83019200, 357578),
  createData('Ireland', 'IE', 4857000, 70273),
  createData('Mexico', 'MX', 126577691, 1972550),
  createData('Japan', 'JP', 126317000, 377973),
  createData('France', 'FR', 67022000, 640679),
  createData('United Kingdom', 'GB', 67545757, 242495),
  createData('Russia', 'RU', 146793744, 17098246),
  createData('Nigeria', 'NG', 200962417, 923768),
  createData('Brazil', 'BR', 210147125, 8515767),
];


class DataHistoryComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      rowsPerPage: 5,
      //emptyRows: this.state.rowsPerPage - Math.min(this.state.rowsPerPage, this.state.rows.length - this.state.page * this.state.rowsPerPage)
    };

    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);

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


  render() {
    return (
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
            {rows.slice(this.state.page * this.state.rowsPerPage,
              this.state.page * this.state.rowsPerPage + this.state.rowsPerPage
            ).map(row => (
              <TableRow key={row.name}>

                <TableCell component="th" scope="row"> {row.name} </TableCell>
                <TableCell align="right">{row.code}</TableCell>
                <TableCell align="right">{row.population}</TableCell>
                <TableCell align="right">{row.size}</TableCell>

              </TableRow>
            ))}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                colSpan={3}
                count={rows.length}
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
    );
  }

}


export default withStyles(styles)(DataHistoryComponent);
