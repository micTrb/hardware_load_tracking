import { GET_GENEVA_DATA } from "../constants/actionTypes";

const initialState = {
  geneva_data: {}
}

export default function metricsLogs(state = initialState, action) {
  switch (action.type) {
    case GET_GENEVA_DATA:
      return Object.assign({}, state, { geneva_data: action.data})
    default:
      return state
  }
}