const today = new Date()
const todayMonth = (today.getMonth() + 1)
const tomorrow= new Date(today)
tomorrow.setDate(tomorrow.getDate() + 1)
const tomorrowMonth = (tomorrow.getMonth() + 1)

const todayString = `${today.getFullYear()}-${todayMonth < 10 ? "0" + todayMonth : todayMonth}-${today.getDate() < 10 ? "0"+today.getDate(): today.getDate()}`
const tomorrowString =  `${tomorrow.getFullYear()}-${tomorrowMonth < 10 ? "0"+ tomorrowMonth: tomorrowMonth}-${tomorrow.getDate() < 10 ? "0"+tomorrow.getDate(): tomorrow.getDate()}`


let initialState={
  keyowrd: "",
  area: "",
  location:"",
  initialDate: todayString,
  finalDate: tomorrowString,
  height: 0,
  width: 0,
  length:0,
  tags: [],
  pricePerDay: 0,
  pricePerMonth:0,
  rendering: false,
  specificSearch: false
}

const ACTIONS = {
  CHANGE_KEYWORD : "CHANGE_KEYWORD",
  CHANGE_AREA : "CHANGE_AREA",
  CHANGE_LOCATION : "CHANGE_LOCATION",
  CHANGE_INITIAL_DATE : "CHANGE_INITIAL_DATE",
  CHANGE_FINAL_DATE : "CHANGE_FINAL_DATE",
  CHANGE_HEIGHT : "CHANGE_HEIGHT",
  CHANGE_WIDTH : "CHANGE_WIDTH",
  CHANGE_LENGTH : "CHANGE_LENGTH",
  CHANGE_TAGS : "CHANGE_TAGS",
  CHANGE_PRICE_PER_DAY : "CHANGE_PRICE_PER_DAY",
  CHANGE_PRICE_PER_MONTH : "CHANGE_PRICE_PER_MONTH",
  CHANGE_RENDERING : "CHANGE_RENDERING",
  CHANGE_SPECIFIC_SEARCH: "SPECIFIC_SEARCH"
}

const searchFormReducer = (state = initialState, action) => {
  switch(action.type){
    case ACTIONS.CHANGE_KEYWORD:
      return {
        ...state,
        keyword: action.payload
      }
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
    case ACTIONS.CHANGE_TAGS:
      return {
        ...state,
        tags: action.payload
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
    case ACTIONS.CHANGE_SPECIFIC_SEARCH:
      return {
        ...state,
        specificSearch: action.payload
      }                          
    default : return state
  }  
}

export {searchFormReducer, ACTIONS}