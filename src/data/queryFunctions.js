import axios from 'axios';

import {
  lastGenevaRecordQuery,
  lastFawltyTowersRecordQuery, lastWeekGenevaQuery
} from "./queries";

import {endpoint_url, headers} from "./queryConfig";


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

//Geneva city last week data
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

getLastWeekGeneva().then(value => console.log(value));