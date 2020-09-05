let initialState={
  isLogged: false
}

const ACTIONS = {
  CHANGE_LOGIN : "CHANGE_LOGIN"
}

const loginUserReducer = (state = initialState , action) => {
  switch(action.type){
      case ACTIONS.CHANGE_LOGIN:
          return {
              ...state,
              isLogged: action.payload
          }
      default : return state
  }
}

export {
  loginUserReducer,
  ACTIONS
} 