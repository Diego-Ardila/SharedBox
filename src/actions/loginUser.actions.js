import {ACTIONS} from '../reducers/loginUserReducer';

const changeLogin = (payload) => {
  return {
      type: ACTIONS.CHANGE_LOGIN,
      payload
  }
}

export {changeLogin}