import React from 'react';
import { connect } from 'react-redux';
import { Dash } from '../../layout';

import { requestActions } from '../../_actions';

class Home extends React.Component {
  componentDidMount() {
    this.props.getAll();
  }

  render() {
    const { requests } = this.props;

    return(
      <Dash>
        <div className="uk-section">
          <div className="uk-container">
            <div className="uk-child-width-1-3@s" data-uk-grid>
              { requests.items && requests.items.map( (item, idx) =>
                <div key={idx}>
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
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="uk-section-small">
          <div className="uk-container">
          <h1 className="uk-h2">Requests</h1>
          <div className="uk-overflow-auto">
    <table className="uk-table uk-table-hover uk-table-middle uk-table-divider">
        <thead>
            <tr>
                <th className="uk-table-shrink"></th>
                <th className="uk-table-shrink">Preserve</th>
                <th className="uk-table-expand">Expand + Link</th>
                <th className="uk-width-small">Truncate</th>
                <th className="uk-table-shrink uk-text-nowrap">Shrink + Nowrap</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><input className="uk-checkbox" type="checkbox"/></td>
                <td><img className="uk-preserve-width uk-border-circle" src="https://getuikit.com/docs/images/avatar.jpg" width="40" alt=""/></td>
                <td className="uk-table-link">
                    <a className="uk-link-reset" href="">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</a>
                </td>
                <td className="uk-text-truncate">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</td>
                <td className="uk-text-nowrap">Lorem ipsum dolor</td>
            </tr>
            <tr>
                <td><input className="uk-checkbox" type="checkbox"/></td>
                <td><img className="uk-preserve-width uk-border-circle" src="https://getuikit.com/docs/images/avatar.jpg" width="40" alt=""/></td>
                <td className="uk-table-link">
                    <a className="uk-link-reset" href="">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</a>
                </td>
                <td className="uk-text-truncate">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</td>
                <td className="uk-text-nowrap">Lorem ipsum dolor</td>
            </tr>
            <tr>
                <td><input className="uk-checkbox" type="checkbox"/></td>
                <td><img className="uk-preserve-width uk-border-circle" src="https://getuikit.com/docs/images/avatar.jpg" width="40" alt=""/></td>
                <td className="uk-table-link">
                    <a className="uk-link-reset" href="">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</a>
                </td>
                <td className="uk-text-truncate">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</td>
                <td className="uk-text-nowrap">Lorem ipsum dolor</td>
            </tr>
            <tr>
                <td><input className="uk-checkbox" type="checkbox"/></td>
                <td><img className="uk-preserve-width uk-border-circle" src="https://getuikit.com/docs/images/avatar.jpg" width="40" alt=""/></td>
                <td className="uk-table-link">
                    <a className="uk-link-reset" href="">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</a>
                </td>
                <td className="uk-text-truncate">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</td>
                <td className="uk-text-nowrap">Lorem ipsum dolor</td>
            </tr>
        </tbody>
    </table>
</div>
          </div>
        </div>
      </Dash>
    )
  }
}

function mapState(state) {
	const { requests } = state;
  return { requests };
}

const actionCreators = {
	getAll: requestActions.getAll,
};

const connectedRegisterPage = connect(mapState, actionCreators)(Home);
export default connectedRegisterPage