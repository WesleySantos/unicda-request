import { authHeader } from "../_helpers"

const getRequests = async (pageNum = 1, pageSize = 10) => {
  return await fetch(`http://unicdarequests.herokuapp.com/api/request?pageNum=${pageNum}&pageSize=${pageSize}`, {
    method: 'GET',
    headers: authHeader(),
  })
  .then( resp => resp.json())
}

const getRequestForm = async id => {

  return await fetch(`http://unicdarequests.herokuapp.com/api/request/${id}/getForm`, {
    method: 'GET',
    headers: authHeader()
  })
  .then( res => res.json())
}

const getRequestsCreated = async (pageNum = 1, pageSize = 10) => {
  return await fetch(`http://unicdarequests.herokuapp.com/api/request/me/created?pageNum=${pageNum}&pageSize=${pageSize}`, {
    method: 'GET',
    headers: authHeader()
  }).then( res => res.json())
}

const getRequestHistory = async _id => {
  return await fetch(`http://unicdarequests.herokuapp.com/api/request/${_id}/history`, {
    method: 'GET',
    headers: authHeader()
  }).then( res => res.json())
}

const setRequestCreated = async (form, inputs) => {
  return await fetch(`http://unicdarequests.herokuapp.com/api/request/create/${form}`, {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(inputs)
  }).then( res => res.json())
}

const deleteRequestCreated = async id => {
  return await fetch(`http://unicdarequests.herokuapp.com/api/request/remove/${id}`, {
    method: 'DELETE',
    headers: authHeader()
  })
  .then( res => res.json())
}

export {
  getRequests,
  getRequestForm,
  getRequestsCreated,
  getRequestHistory,
  setRequestCreated,
  deleteRequestCreated
}