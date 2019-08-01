import { requestConstants } from '../_constants';

export function requests(state = {}, action) {
  switch (action.type) {
    case requestConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case requestConstants.GETALL_SUCCESS:
      return {
        items: action.requests
      };
    case requestConstants.GETALL_FAILURE:
      return { 
        error: action.error
      };
    default:
      return state
  }
}