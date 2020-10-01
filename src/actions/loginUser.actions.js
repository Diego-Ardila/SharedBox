import {ACTIONS} from '../reducers/loginUserReducer';

export const changeLogin = (payload) => {
  return {
      type: ACTIONS.CHANGE_LOGIN,
      payload
  }
}

export const changeTypeUser = (payload) => {
  return {
      type: ACTIONS.CHANGE_TYPE_USER,
      payload
  }
}

export const changeUserName = (payload) => {
  return {
      type: ACTIONS.CHANGE_USER_NAME,
      payload
  }
}

export const changeUserPhoto = (payload) => {
  return {
      type: ACTIONS.CHANGE_USER_PHOTO,
      payload
  }
}

export const changeNotifications = (payload) => {
  return {
      type: ACTIONS.CHANGE_NOTIFICATIONS,
      payload
  }
}