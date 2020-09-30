let initialState={
  isLogged: false,
  typeUser: "",
  userName: "",
  userPhoto: "",
  notifications: []
}

const ACTIONS = {
  CHANGE_LOGIN : "CHANGE_LOGIN",
  CHANGE_TYPE_USER : "CHANGE_TYPE_USER",
  CHANGE_USER_NAME : "CHANGE_USER_NAME",
  CHANGE_USER_PHOTO : "CHANGE_USER_PHOTO",
  CHANGE_NOTIFICATIONS : "CHANGE_NOTIFICATIONS"
}

const loginUserReducer = (state = initialState , action) => {
  switch(action.type){
      case ACTIONS.CHANGE_LOGIN:
        return {
          ...state,
          isLogged: action.payload
        }
      case ACTIONS.CHANGE_TYPE_USER:
        return {
          ...state,
          typeUser: action.payload
        }
      case ACTIONS.CHANGE_USER_NAME:
        return {
          ...state,
          userName: action.payload
        }
      case ACTIONS.CHANGE_USER_PHOTO:
        return {
          ...state,
          userPhoto: action.payload
        }
      case ACTIONS.CHANGE_NOTIFICATIONS:
        return {
          ...state,
          notifications: action.payload
        }
      default : return state
  }
}

export {
  loginUserReducer,
  ACTIONS
} 