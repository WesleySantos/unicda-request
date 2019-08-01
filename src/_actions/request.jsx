import { requestConstants } from '../_constants';
import { requestService } from '../_services';

export const requestActions = { getAll };

function getAll() {
  return dispatch => {
    dispatch(request());

    requestService.getAll()
    .then(
      requests => dispatch(success(requests)),
      error => dispatch(failure(error))
    );
  };

  function request() { return { type: requestConstants.GETALL_REQUEST } }
  function success(requests) { return { type: requestConstants.GETALL_SUCCESS, requests } }
  function failure(error) { return { type: requestConstants.GETALL_FAILURE, error } }
}