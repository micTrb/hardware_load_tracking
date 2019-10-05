import { combineReducers } from 'redux';
import metricsLogs from './reducers/logReducer';

const rootReducer = combineReducers({
  metricsLogs
})

export default rootReducer;