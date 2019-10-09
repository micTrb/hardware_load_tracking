import _ from 'lodash';
import {readableTimestamp} from "./dateFormatter";

function dataPrep(data) {

  // formatting the last record
  let formatted_data = {
    id: data.id,
    cpu: (data.cpu == null) ? 0 : parseFloat(data.cpu),
    gpu: (data.gpu == null) ? 0 : parseFloat(data.gpu),
    memory: (data.memory == null || Number.isNaN(data.memory)) ? 0 : parseFloat(data.memory),
    location: data.location,
    timestamp: readableTimestamp(data.timestamp)
  }
  return formatted_data;
}

export function getHardwareAvg(hardwareName, array) {

  let formatted_array = array.map((obj) => dataPrep(obj));

  let mean = _.meanBy(formatted_array, function(o) {
    return o[hardwareName];
  });
  return mean;
}

