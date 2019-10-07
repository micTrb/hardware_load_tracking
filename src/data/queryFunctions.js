import axios from 'axios';

import {
  lastGenevaRecordQuery,
  lastFawltyTowersRecordQuery,
  lastWeekGenevaQuery,
  yesterdayGenevaQuery,
  lastHourGenevaQuery
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
}

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
}


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
}
;