import React, { useEffect, useState } from 'react'
import { Dash } from '../../layout'
import { getMeRequestsPending } from '../../_services/officer';
import moment from 'moment'
import 'moment/locale/es'
import { Link } from 'react-router-dom'

moment.locale('es')

const OfficerHome = () => {
  const [requestsPending, updateRequestsPending] = useState([])

  useEffect(() => {
    getMeRequestsPending()
    .then( res => updateRequestsPending(res))
  }, [])

  return(
    <Dash>
      <div className="uk-section-small">
          <div className="uk-container">
            <h1 className="uk-h2 uk-text-bold uk-text-capitalize">Solicitudes pendientes</h1>
            <div className="uk-overflow-auto">
              { requestsPending.length > 0 ? <table className="uk-table uk-table-middle uk-table-divider">
                <thead>
                  <tr>
                    <th className="uk-table-shrink">Usuario</th>
                    <th className="">Solicitud</th>
                    <th className="">Descripción</th>
                    <th className="uk-table-shrink">Estado</th>
                    <th className="uk-table-shrink">Fecha</th>
                    <th className="uk-table-shrink"></th>
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
                        <div className="uk-flex uk-flex-middle uk-flex-center">
                          <Link to={{ pathname: `/requests/${pending._id}`, search: `?n=${pending.requestRecord.request.name}` }} className="uk-text-primary uk-margin-small-right" style={{width: '20px'}} uk-icon="icon: link"></Link>
                          {/* <a href="#" className="uk-text-danger" style={{width: '20px'}} uk-icon="icon: ban" onClick={(e) => .deleteRequest(created._id) }></a> */}
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              : <div className="uk-alert-warning uk-placeholder uk-text-center" style={{ background: 'antiquewhite'}}>No has realizado ninguna solicitud </div> }
            </div>
          </div>
        </div>
    </Dash>
  )
}

export { OfficerHome }