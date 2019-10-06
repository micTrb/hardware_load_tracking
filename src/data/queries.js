import dateFormatter from '../utils/dateFormatter';

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


// Time range queries

//Get some times...

function getWeekAgoFormattedDate() {
  let a_week_ago = new Date();
  let past_week_day = a_week_ago.getDate() - 7;
  a_week_ago.setDate(past_week_day);

  let a_week_ago_formatted = dateFormatter(a_week_ago);
  console.log(a_week_ago_formatted);
  return a_week_ago_formatted;
}

function getTodayFormattedDate() {
  let today = new Date();
  let today_formatted = dateFormatter(today);
  console.log(today_formatted);
  return today;
}



/*
export const lastWeekGenevaQuery = `
  query {
    store_metrics(
        where: { 
          _and: [
            {location: {_eq: "Geneva"}},
            {timestamp: {_gte:"`+ getWeekAgoFormattedDate() +`"}},
            {timestamp: {_lte:"`+ getTodayFormattedDate() +`"}}, 
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
*/

export const lastWeekGenevaQuery = `
  query {
    store_metrics(
        where: {
            _and: [
                {location: {_eq: "Geneva"}},
                {timestamp: {_gte: "2019-09-29"}},
                {timestamp: {_lte: "2019-10-06"}}
            ]
        },
        order_by: {timestamp: asc}) {
        id
        cpu
        location
        timestamp
    }
}
`;
