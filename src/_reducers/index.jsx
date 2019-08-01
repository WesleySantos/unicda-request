import { combineReducers } from 'redux';

import { authentication } from './authentication';
import { registration } from './registration';
import { requests } from './requests';
import { users } from './users';
import { alert } from './alert';

const rootReducer = combineReducers({
  authentication,
  registration,
  requests,
  users,
  alert
});

export default rootReducer;