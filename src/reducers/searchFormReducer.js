let initialState={
  area: 0,
  location:"",
  initialDate: new Date(),
  finalDate: new Date(),
  height: 250,
  width: 250,
  length:250,
  pricePerDay: 0,
  pricePerMonth:0
}

const ACTIONS = {
  CHANGE_AREA : "CHANGE_AREA",
  CHANGE_LOCATION : "CHANGE_LOCATION",
  CHANGE_INITIAL_DATE : "CHANGE_INITIAL_DATE",
  CHANGE_FINAL_DATE : "CHANGE_FINAL_DATE",
  CHANGE_HEIGHT : "CHANGE_HEIGHT",
  CHANGE_WIDTH : "CHANGE_WIDTH",
  CHANGE_LENGTH : "CHANGE_LENGTH",
  CHANGE_PRICE_PER_DAY : "CHANGE_PRICE_PER_DAY",
  CHANGE_PRICE_PER_MONTH : "CHANGE_PRICE_PER_MONTH"
}

const searchFormReducer = (state = initialState, action) => {
  switch(action.type){
    case ACTIONS.CHANGE_AREA:
      return {
        ...state,
        area: action.payload
      }
    case ACTIONS.CHANGE_LOCATION:
      return {
        ...state,
        location: action.payload
      }  
    case ACTIONS.CHANGE_INITIAL_DATE:
      return {
        ...state,
        initialDate: action.payload
      }
    case ACTIONS.CHANGE_FINAL_DATE:
      return {
        ...state,
        finalDate: action.payload
      }
    case ACTIONS.CHANGE_HEIGHT:
      return {
        ...state,
        height: action.payload
      }
    case ACTIONS.CHANGE_WIDTH:
      return {
        ...state,
        width: action.payload
      }
    case ACTIONS.CHANGE_LENGTH:
      return {
        ...state,
        length: action.payload
      } 
    case ACTIONS.CHANGE_PRICE_PER_DAY:
      return {
        ...state,
        pricePerDay: action.payload
      }
    case ACTIONS.CHANGE_PRICE_PER_MONTH:
      return {
        ...state,
        pricePerMonth: action.payload
      }                          
    default : return state
  }  
}

export {searchFormReducer, ACTIONS}