import {dateFormatter, dateTimeFormatter } from "../utils/dateFormatter";

// Time range queries

//Get some times...

function getWeekAgoFormattedDate() {
  let a_week_ago = new Date();
  let past_week_day = a_week_ago.getDate() - 7;
  a_week_ago.setDate(past_week_day);

  let a_week_ago_formatted = dateFormatter(a_week_ago);
  return a_week_ago_formatted;
}

function getYesterdayFormattedDate() {
  let yesterday = new Date();
  let past_week_day = yesterday.getDate() - 1;
  yesterday.setDate(past_week_day);

  let yesterday_formatted = dateFormatter(yesterday);
  return yesterday_formatted;
}

function getTodayFormattedDate() {
  let today = new Date();
  let today_formatted = dateFormatter(today);
  return today_formatted;
}

function getNowFormattedTime() {
  let now = new Date();
  let now_formatted = dateTimeFormatter(now);
  return now_formatted;
}


function getAnHourAgoFormattedTime() {
  let hour_ago = new Date();
  let past_hour = hour_ago.getHours() - 1;
  hour_ago.setHours(past_hour);
  let hour_ago_formatted = dateTimeFormatter(hour_ago);

  return hour_ago_formatted;
}



/**********************************************************************************************************************/
/* QUERIES */
/**********************************************************************************************************************/



// Last record queries
export const lastGenevaRecordQuery = `
  query {
    store_metrics(
        where: {location: {_eq: "Geneva"}}, 
        limit: 1, 
        order_by: {timestamp: desc}
      ) {
      cpu,
      gpu,
      memory,
      location,
      timestamp,
    }
  }
`;


export const lastFawltyTowersRecordQuery = `
  query {
    store_metrics(
        where: {location: {_eq: "Fawlty Towers"}}, 
        limit: 1, 
        order_by: {timestamp: desc}
      ) {
      cpu,
      gpu,
      memory,
      location,
      timestamp,
    }
  }
`;



export const lastWeekGenevaQuery = `
  query {
    store_metrics(
        where: { 
          _and: [
            {location: {_eq: "Geneva"}},
            {timestamp: {_gte: "${ getWeekAgoFormattedDate() }" }},
            {timestamp: {_lte: "${ getTodayFormattedDate() }" }},
          ]
        },
        order_by: {timestamp: asc}
      ) {
      cpu,
      gpu,
      memory,
      location,
      timestamp,
    }
  }
`;


export const yesterdayGenevaQuery = `
  query {
    store_metrics(
        where: { 
          _and: [
            {location: {_eq: "Geneva"}},
            {timestamp: {_gte: "${ getYesterdayFormattedDate() }" }},
            {timestamp: {_lte: "${ getTodayFormattedDate() }" }},
          ]
        },
        order_by: {timestamp: asc}
      ) {
      cpu,
      gpu,
      memory,
      location,
      timestamp,
    }
  }
`;


export const lastHourGenevaQuery = `
  query {
    store_metrics(
        where: { 
          _and: [
            {location: {_eq: "Geneva"}},
            {timestamp: {_gte: "${ getAnHourAgoFormattedTime() }" }},
            {timestamp: {_lte: "${ getNowFormattedTime() }" }},
          ]
        },
        order_by: {timestamp: asc}
      ) {
      cpu,
      gpu,
      memory,
      location,
      timestamp,
    }
  }
`;

console.log(getAnHourAgoFormattedTime());
console.log(getNowFormattedTime());