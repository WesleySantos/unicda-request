import React, { useEffect, useState } from 'react'
import { Dash } from '../../layout'
import { getFormValues } from '../../_services'

const RequestPending = ({match, location}) => {
  const [requestName, updateRequestName ] = useState('')

  useEffect(() => {
    getFormValues(match.params.id)
    .then( res => console.log({res}))
    // console.log({props});
    updateRequestName( new URLSearchParams(location.search).get('n'))
    // getRequestHistory(match.params.id).then( res => updateSteps(res))
  }, [])

  return (
    <Dash>
        <div className="uk-section-small">
          <div className="uk-container">
            <h1 className="uk-h2">{ requestName }</h1>
            <div className="uk-overflow-auto">
              <div className="uk-child-width-expand@s uk-text-center" uk-grid="true">
                <div>
                  <div className="uk-card uk-card-default uk-card-body">Item</div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </Dash>
  )
}

export default RequestPending