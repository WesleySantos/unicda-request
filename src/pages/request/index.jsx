import React, { useEffect, useState } from 'react'
import { Dash } from '../../layout'
import { getRequestHistory } from '../../_services';

const Request = ({match, location}) => {
  const [steps, updateSteps] = useState([])
  const [requestName, updateRequestName ] = useState('')

  useEffect(() => {
    updateRequestName( new URLSearchParams(location.search).get('n'))
    getRequestHistory(match.params.id).then( res => updateSteps(res))
  }, [])

  return (
    <Dash>
        <div className="uk-section-small">
          <div className="uk-container">
            <h1 className="uk-h2">{ requestName }</h1>
            <div className="uk-overflow-auto">
              <table className="uk-table uk-table-middle uk-table-divider">
                <thead>
                  <tr>
                    <th className="">Usuario encargado</th>
                    <th className="">Pendiente por</th>
                    <th className="uk-table-shrink">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  { steps.length > 0 && steps.sort(function(a, b){
                      if(a.status < b.status) { return -1; }
                      if(a.status > b.status) { return 1; }
                      return 0;
                    }).map(step =>
                    <tr key={step._id}>
                      <td className="uk-flex uk-flex-middle">
                        <img className="uk-preserve-width uk-border-circle" src="https://getuikit.com/docs/images/avatar.jpg" width="40" alt=""/>
                        <span className="uk-margin-small-left">{ step.reviewer.username }</span>
                      </td>
                      <td className="uk-table-truncate">{ step.requestStep.step.name }</td>
                      <td className="uk-text-nowrap"><span className={`uk-border-pill uk-padding-xsmall ${ step.status === 'APPROVE_PENDING' ? 'uk-alert-primary' : 'uk-alert-muted'}`}>{ step.status === 'APPROVE_PENDING' ? 'En proceso' : 'Pendiente' }</span></td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
    </Dash>
  )
}

export default Request