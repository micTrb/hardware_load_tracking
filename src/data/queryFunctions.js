import axios from 'axios';

import {
  lastGenevaRecordQuery,
  lastFawltyTowersRecordQuery,
  lastWeekGenevaQuery,
  yesterdayGenevaQuery,
  lastHourGenevaQuery,
  lastHourFawltyTowersQuery,
  lastWeekFawltyTowersQuery,
  yesterdayFawltyTowersQuery,
} from "./queries";

import {endpoint_url, headers} from "./queryConfig";


/**********************************************************************************************************************/
/* LAST DATA */



//Geneva city last data
export function getLastGenevaRecord() {
  return axios({
    method: 'post',
    url: endpoint_url,
    headers: headers,
    data: {
      query: lastGenevaRecordQuery
    },
    responseType: 'json'
  }).catch(error => { return error });
}


//Fawlty Towers last data
export function getLastFawltyTowersRecord() {
  return axios({
    method: 'post',
    url: endpoint_url,
    headers: headers,
    data: {
      query: lastFawltyTowersRecordQuery
    },
    responseType: 'json'
  }).catch(error => { return error });
}


/**********************************************************************************************************************/
/* RANGES DATA */

//Geneva city time ranges data
export function getLastWeekGeneva() {
  return axios({
    method: 'post',
    url: endpoint_url,
    headers: headers,
    data: {
      query: lastWeekGenevaQuery
    },
    responseType: 'json'
  }).catch(error => { return error });
};

export function getYesterdayGeneva() {
  return axios({
    method: 'post',
    url: endpoint_url,
    headers: headers,
    data: {
      query: yesterdayGenevaQuery
    },
    responseType: 'json'
  }).catch(error => { return error });
};


export function getLastHourGeneva() {
  return axios({
    method: 'post',
    url: endpoint_url,
    headers: headers,
    data: {
      query: lastHourGenevaQuery
    },
    responseType: 'json'
  }).catch(error => { return error });
};

/*
export function getCustomTimestampGeneva(rangeObj) {

  console.log(rangeObj.start, rangeObj.end);


  return axios({
    method: 'post',
    url: endpoint_url,
    headers: headers,
    data: {
      query: `
        query {
          store_metrics(
              where: {
              _and: [
                {location: {_eq: "Fawlty Towers"}},
                {timestamp: {_gte: "" }},
                {timestamp: {_lte: "" }}
              ]
            },
            order_by: {timestamp: asc}
          ) {
              id
              cpu
              gpu
              location
              memory
              timestamp
            }
          }
        `
    },
    responseType: 'json'
  }).catch(error => { return error });

}
*/








//Fawlty Towers city time ranges data
export function getLastWeekFawltyTowers() {
  return axios({
    method: 'post',
    url: endpoint_url,
    headers: headers,
    data: {
      query: lastWeekFawltyTowersQuery
    },
    responseType: 'json'
  }).catch(error => { return error });
};

export function getYesterdayFawltyTowers() {
  return axios({
    method: 'post',
    url: endpoint_url,
    headers: headers,
    data: {
      query: yesterdayFawltyTowersQuery
    },
    responseType: 'json'
  }).catch(error => { return error });
};


export function getLastHourFawltyTowers() {
  return axios({
    method: 'post',
    url: endpoint_url,
    headers: headers,
    data: {
      query: lastHourFawltyTowersQuery
    },
    responseType: 'json'
  }).catch(error => { return error });
};
