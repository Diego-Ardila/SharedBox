const today = new Date()
const todayString = `${today.getFullYear()}-${today.getMonth() < 10 ? "0"+today.getMonth(): today.getMonth()}-${today.getDate() < 10 ? "0"+today.getDate(): today.getDate()}`
const tomorrowString = `${today.getFullYear()}-${today.getMonth() < 10 ? "0"+today.getMonth(): today.getMonth()}-${today.getDate() + 1 < 10 ? "0"+(today.getDate()+1): today.getDate()+1}`


let initialState={
  area: "",
  location:"",
  initialDate: todayString,
  finalDate: tomorrowString,
  height: 20,
  width: 20,
  length:20,
  pricePerDay: 0,
  pricePerMonth:0,
  rendering: false
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
  CHANGE_PRICE_PER_MONTH : "CHANGE_PRICE_PER_MONTH",
  CHANGE_RENDERING : "CHANGE_RENDERING"
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
    case ACTIONS.CHANGE_RENDERING:
      return {
        ...state,
        rendering: !state.rendering
      }                          
    default : return state
  }  
}

export {searchFormReducer, ACTIONS}