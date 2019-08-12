import React, { useEffect, useState, Fragment } from 'react'
import { getMeRequestsPending, Approve, Disapprove } from '../../_services/officer';
import moment from 'moment'
// import 'moment/locale/en'

// moment.locale('en')

const OfficerHome = () => {
  const [requestsPending, updateRequestsPending] = useState([])
  const [stepStatus, updateStepStatus] = useState('')
  const [actionMessage, updateActionMessage] = useState('')
  const [action, updateAction] = useState(false)

  useEffect(() => {
    getMeRequestsPending()
    .then( res => updateRequestsPending(res))
  }, [])

  const handleEstatus = e => {
    let value = e.value
    let step = e.dataset.step

    updateStepStatus(value)

    if( value === 'aceptar' ) {
      Approve(step)
      .then( res => {
        updateAction(true)
        updateActionMessage('Application approved successfully.')
        getMeRequestsPending()
        .then( res => updateRequestsPending(res))
      })
    } else {
      Disapprove(step)
      .then( res => {
        updateAction(true)
        updateActionMessage('Application rejected successfully.')
        getMeRequestsPending()
        .then( res => updateRequestsPending(res))
      })
    }
  }

  return(
    <Fragment>
      <div className="uk-section-small">
      { action ? <div className="uk-alert-success uk-position-bottom uk-text-center" uk-alert="true">
          <a className="uk-alert-close" uk-close="true"></a>
          <p>{ actionMessage }</p>
        </div>
      : null }
          <div className="uk-container">
            <h1 className="uk-h2 uk-text-bold uk-text-capitalize">Awaiting requests</h1>
            <div className="uk-overflow-auto">
              { requestsPending.length > 0 ? <table className="uk-table uk-table-middle uk-table-divider">
                <thead>
                  <tr>
                    <th className="">User</th>
                    <th className="">Request</th>
                    <th className="">Description</th>
                    <th className="">State</th>
                    <th className="">Date</th>
                    <th className="">Action</th>
                  </tr>
                </thead>
                <tbody>
                  { requestsPending.map(pending =>
                    <tr key={pending._id}>
                      <td className="uk-flex uk-flex-middle">
                        <img className="uk-preserve-width uk-border-circle" src="https://getuikit.com/docs/images/avatar.jpg" width="40" alt=""/>
                        <span className="uk-margin-small-left">{ pending.requestRecord.user.username }</span>
                      </td>
                      <td className="uk-table-truncate">{ pending.requestRecord.request.name }</td>
                      <td className="uk-text-nowrap">{ pending.requestRecord.request.description }</td>
                      <td className="uk-text-nowrap"><span className="uk-badge">{ pending.status === 'APPROVE_PENDING' ? 'Pending' : pending.status === 'CANCELLED' ? 'Canceled' : 'Approved' }</span></td>
                      <td className="uk-text-nowrap"><span className="">{ moment(pending.createdAt, 'YYYY-MM-DD').fromNow() }</span></td>
                      <td>
                        <select className="uk-select" value={stepStatus} onChange={ (e) => handleEstatus(e.target) } data-step={pending._id}>
                          <option value="" disabled>Select an action</option>
                          <option value="rechazar">Refuse</option>
                          <option value="aceptar">Accept</option>
                        </select>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              : <div className="uk-alert-warning uk-placeholder uk-text-center" style={{ background: 'antiquewhite'}}>You have no pending request</div> }
            </div>
          </div>
        </div>
    </Fragment>
  )
}

export { OfficerHome }