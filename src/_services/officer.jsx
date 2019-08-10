import { authHeader } from "../_helpers"

const getMeRequestsPending = async (pageNum = 1, pageSize = 10) => {
  return await fetch(`http://unicdarequests.herokuapp.com/api/request/me/pending?pageNum=${pageNum}&pageSize=${pageSize}`, {
    method: 'GET',
    headers: authHeader(),
  })
  .then( resp => resp.json())
}

const getFormValues = async id => {
  return await fetch(`http://unicdarequests.herokuapp.com/api/request/formValues/${id}`, {
    method: 'GET',
    headers: authHeader(),
  })
  .then( resp => resp.json())
}

export {
  getMeRequestsPending,
  getFormValues
}