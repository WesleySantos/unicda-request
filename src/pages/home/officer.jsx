import React, { useEffect, useState } from 'react'
import { Dash } from '../../layout'
import { getMeRequestsPending, Approve, Disapprove } from '../../_services/officer';
import moment from 'moment'
import 'moment/locale/es'
import { Link } from 'react-router-dom'

moment.locale('es')

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
        updateActionMessage('Solicitud aprovada con exito.')
        getMeRequestsPending()
        .then( res => updateRequestsPending(res))
      })
    } else {
      Disapprove(step)
      .then( res => {
        updateAction(true)
        updateActionMessage('Solicitud rechazada con exito.')
        getMeRequestsPending()
        .then( res => updateRequestsPending(res))
      })
    }
  }

  return(
    <Dash>
      <div className="uk-section-small">
      { action ? <div className="uk-alert-success uk-position-bottom uk-text-center" uk-alert="true">
          <a className="uk-alert-close" uk-close="true"></a>
          <p>{ actionMessage }</p>
        </div>
      : null }
          <div className="uk-container">
            <h1 className="uk-h2 uk-text-bold uk-text-capitalize">Solicitudes pendientes</h1>
            <div className="uk-overflow-auto">
              { requestsPending.length > 0 ? <table className="uk-table uk-table-middle uk-table-divider">
                <thead>
                  <tr>
                    <th className="">Usuario</th>
                    <th className="">Solicitud</th>
                    <th className="">Descripción</th>
                    <th className="">Estado</th>
                    <th className="">Fecha</th>
                    <th className="">Acción</th>
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
                      <td className="uk-text-nowrap"><span className="uk-badge">{ pending.status === 'APPROVE_PENDING' ? 'Pendiente' : 'Aprobada' }</span></td>
                      <td className="uk-text-nowrap"><span className="">{ moment(pending.createdAt, 'YYYY-MM-DD').fromNow() }</span></td>
                      <td>
                        <select className="uk-select" value={stepStatus} onChange={ (e) => handleEstatus(e.target) } data-step={pending._id}>
                          <option value="" disabled>Seleccionar una acción</option>
                          <option value="rechazar">Rechazar</option>
                          <option value="aceptar">Aceptar</option>
                        </select>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              : <div className="uk-alert-warning uk-placeholder uk-text-center" style={{ background: 'antiquewhite'}}>No tienes ninguna solicitud pendiente </div> }
            </div>
          </div>
        </div>
    </Dash>
  )
}

export { OfficerHome }