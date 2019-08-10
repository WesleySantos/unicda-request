import React from 'react'

const Input = (props) => {

  return (
    <div className="uk-margin">
      <label className="uk-form-label" forHtml={ props.id }>{ props.label }</label>
      <div className="uk-form-controls">
        { props.type === 'BOOLEAN' ?
          <div className="uk-margin uk-grid-small uk-child-width-auto uk-grid">
            <label><input className="uk-checkbox" name={ props.name } type="checkbox" value={true} onChange={ (e) => props.handleChange(e)}/> Si</label>
            <label><input className="uk-checkbox" name={ props.name } type="checkbox" value={false} onChange={ (e) => props.handleChange(e)}/> No</label>
          </div> :
          <input
            className="uk-input"
            id={ props.id }
            type={ props.type }
            name={ props.name }
            placeholder={ props.placeholder }
            value={ props.value }
            onChange={ (e) => props.handleChange(e) }
          />
        }
      </div>
    </div>
  )
}

export default Input