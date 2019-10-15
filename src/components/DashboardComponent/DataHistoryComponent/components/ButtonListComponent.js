import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles1 = makeStyles(theme => ({
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
  }
}));

export default function ButtonListComponent(props) {
  const classes = useStyles1();

  const onClickLastWeek = () => {
    props.getLastWeek();
  }

  const onClickLastDay = () => {
    props.getLastDayRange();
  }

  const onClickLastHour = () => {
    props.getLastHourRange();
  }

  const onClickAnomalies = () => {
    props.getAnomalies();
  }


  return (
    <div>
      <ul className={`list-group list-group-horizontal ${classes.buttonList}`}>
        <li className={`list-group list-group-horizontal ${classes.listEl}`}>
          <button className={`btn btn-primary ${classes.button}`} onClick={onClickLastWeek}>Last Week</button>
        </li>
        <li className={`list-group list-group-horizontal ${classes.listEl}`}>
          <button className={`btn btn-primary ${classes.button}`} onClick={onClickLastDay}>Last Day</button>
        </li>
        <li className={`list-group list-group-horizontal ${classes.listEl}`}>
          <button className={`btn btn-primary ${classes.button}`} onClick={onClickLastHour}>Last Hour</button>
        </li>
        <li className={`list-group list-group-horizontal ${classes.listEl}`}>
          <button className={`btn btn-danger ${classes.button}`} onClick={onClickAnomalies}>Get anomalies</button>
        </li>
      </ul>
    </div>
  );
}
