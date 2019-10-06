import axios from 'axios';


//Geneva city data

export default function getLastGenevaRecord() {

  return axios({
    method: 'post',
    url: 'https://graphql-challenge.thirdeye.cloud/v1alpha1/graphql',
    headers: {
      'x-hasura-admin-secret': 'fhKfh3kahaDHQAwhajhUhdfkncvbWUY'
    },
    data: {
      query: `
        query {
          store_metrics(limit: 2, order_by: {timestamp: desc}) {
            cpu,
            gpu,
            memory,
            location,
            timestamp,
          }
        }
      `
    },
    responseType: 'json'
  }).catch(error => { return error });
}