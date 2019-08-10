import React from 'react'
import { Dash } from '../../layout'
import { Input } from '../../components/inputs'
import { Link } from 'react-router-dom'
import moment from 'moment'
import 'moment/locale/es'
import { getRequests, getRequestForm, getRequestsCreated, setRequestCreated, deleteRequestCreated } from '../../_services'

moment.locale('es')

class StudentHome extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      submitted: false,
      formActive: {},
      requests: [],
      requestForm: [],
      requestsCreated: [],
      form: [],
      loading: false
    }

    this.handleRequest = this.handleRequest.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    let self = this
    getRequests().then( res => self.setState({requests: res}) )
    getRequestsCreated().then( res => self.setState({requestsCreated: res}) )
  }

  handleChange(e) {
    let self = this
    const { name, value } = e.target;

    self.setState( (state) => {
      let form = state.form
      let index = form.findIndex( f => f.formId === name )

      if( index === -1 ) {
        form.push({ "formId": name, "value": value })
      } else {
        form[index].value = value
      }

      return { form };
    });
  }
  
  handleSubmit(e) {
    let self = this
    const { form, formActive } = this.state
		e.preventDefault();

    self.setState({ submitted: true, loading: true });
    setRequestCreated(formActive._id, form).then( resp => {
      self.setState({ loading: false })
      getRequestsCreated().then( res => self.setState({requestsCreated: res}) )
      window.UIkit.modal('#modal-request').hide()
    })
	}

  handleRequest(e, item) {
    let self = this
    e.preventDefault()

    getRequestForm(item._id).then( res => self.setState({ requestForm: res }))
    self.setState({ formActive: item })

    window.UIkit.modal('#modal-request').show();
  }

  deleteRequest(id) {
    let self = this
    deleteRequestCreated(id)
    .then( resp => {
      getRequestsCreated().then( res => self.setState({requestsCreated: res}) )
    })
  }

  render() {
    const { formActive, requests, requestForm, requestsCreated, loading } = this.state

    console.log(this.state);
    return(
      <Dash>
        <div className="uk-section">
          <div className="uk-container">
            <div className="uk-position-relative uk-visible-toggle uk-light" tabIndex="-1" uk-slideshow="max-height: 300; autoplay: true; animation: fade; autoplay-interval: 2000">
              <ul className="uk-slideshow-items">
                  <li>
                      <img src="http://2.bp.blogspot.com/_8w811x5iykE/TFa9PwjmGjI/AAAAAAAAAAk/SjNyDTIStHk/s1600/top.jpg" alt="" uk-cover="true" />
                  </li>
                  <li>
                      <img src="https://i2.wp.com/vumagbucket.s3.amazonaws.com/wp-content/uploads/2018/04/19123935/rela.jpg?fit=1404%2C672" alt="" uk-cover="true" />
                  </li>
                  <li>
                      <img src="https://i0.wp.com/eljacaguero.com/wp-content/uploads/2018/04/UNICDA.jpg?fit=1500%2C722&ssl=1" alt="" uk-cover="true" />
                  </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="uk-section">
          <div className="uk-container">
            <div>
              <h1 className="uk-h2 uk-text-bold uk-text-capitalize">Solicitudes</h1>
            </div>
            <div className="uk-child-width-1-3@s" data-uk-grid>
              { requests && requests.map( (item, idx) =>
                <a href="#" key={idx} onClick={(e) => this.handleRequest(e, item) }>
                  <div className="uk-panel">
                    <div className="uk-card uk-border-rounded uk-card-default uk-card-small uk-card-body">
                      <div className="uk-grid-small uk-width-1-1 uk-flex-middle" data-uk-grid>
                        <div className="uk-width-auto">
                        <span data-uk-icon="icon: file-text; ratio: 3"></span>
                        </div>
                        <div className="uk-width-expand">
                        <h3 className="uk-h5 uk-margin-small-top uk-text-left">{ item.name }</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="uk-section-small">
          <div className="uk-container">
            <h1 className="uk-h2 uk-text-bold uk-text-capitalize">Solicitudes pendientes</h1>
            <div className="uk-overflow-auto">
              { requestsCreated.length > 0 ? <table className="uk-table uk-table-middle uk-table-divider">
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
                  { requestsCreated.map(created =>
                    <tr key={created._id}>
                      <td className="uk-flex uk-flex-middle">
                        <img className="uk-preserve-width uk-border-circle" src="https://getuikit.com/docs/images/avatar.jpg" width="40" alt=""/>
                        <span className="uk-margin-small-left">{ created.user.username }</span>
                      </td>
                      <td className="uk-table-truncate">{ created.request.name }</td>
                      <td className="uk-text-nowrap">{ created.request.description }</td>
                      <td className="uk-text-nowrap"><span className="uk-badge">{ created.status === 'APPROVE_PENDING' ? 'Pendiente' : 'Aprobada' }</span></td>
                      <td className="uk-text-nowrap"><span className="">{ moment( new Date(created.createdTime), 'MM/DD/YYYY').fromNow() }</span></td>
                      <td>
                        <div className="uk-flex uk-flex-middle uk-flex-center">
                          <Link to={{ pathname: `/requests/${created._id}`, search: `?n=${created.request.name}` }} className="uk-text-primary uk-margin-small-right" style={{width: '20px'}} uk-icon="icon: link"></Link>
                          <a href="#" className="uk-text-danger" style={{width: '20px'}} uk-icon="icon: ban" onClick={(e) => this.deleteRequest(created._id) }></a>
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

        {/* form */}
        <div id="modal-request" className="uk-modal-full" data-uk-modal>
          <div className="uk-modal-dialog" data-uk-height-viewport>
            <button className="uk-modal-close-full uk-close-large" type="button" data-uk-close></button>
            <div data-uk-grid>
              <div className="uk-width-1-1@m">
                <div className="uk-container">
                  <div className="uk-panel">
                    <div className="uk-padding-large">
                      <h1 className="uk-h2 uk-text-center uk-text-uppercase uk-text-bold">{ formActive.name }</h1>
                    </div>
                  </div>
                </div>
              </div>

              <div className="uk-width-1-1@m">
                <form className="ur-form-login uk-margin-auto uk-grid" uk-grid="true" name="form-request" onSubmit={this.handleSubmit}>
                  { requestForm && requestForm.map( form =>
                    <div key={form._id} className="uk-width-1-2@s">
                      <Input
                        key={form._id}
                        id={form._id}
                        name={form._id}
                        value={this.state.form[form.id]}
                        label={form.label}
                        type={ form.formTypeId.name === "STRING" ? 'text' : form.formTypeId.name}
                        handleChange={this.handleChange}
                      />
                    </div>
                  ) }

                  <div className="uk-width-1-1 uk-margin-large">
							      <button className="uk-button uk-button-primary uk-display-block uk-margin-auto uk-border-rounded">{ loading ? <div data-uk-spinner="ratio: 0.5"></div> : 'Solicitar'}</button>
							    </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Dash>
    )
  }
}

export { StudentHome }