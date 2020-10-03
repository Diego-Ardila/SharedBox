import { ACTIONS } from '../reducers/searchFormReducer';

export const changeKeyword = (payload) => {
  return {
      type: ACTIONS.CHANGE_KEYWORD,
      payload
  }
}

export const changeArea = (payload) => {
  return {
      type: ACTIONS.CHANGE_AREA,
      payload
  }
}

export const changeLocation = (payload) => {
  return {
      type: ACTIONS.CHANGE_LOCATION,
      payload
  }
}

export const changeInitialDate = (payload) => {
  return {
      type: ACTIONS.CHANGE_INITIAL_DATE,
      payload
  }
}

export const changeFinalDate = (payload) => {
  return {
      type: ACTIONS.CHANGE_FINAL_DATE,
      payload
  }
}

export const changeHeight = (payload) => {
  return {
      type: ACTIONS.CHANGE_HEIGHT,
      payload
  }
}

export const changeWidth = (payload) => {
  return {
      type: ACTIONS.CHANGE_WIDTH,
      payload
  }
}

export const changeLength = (payload) => {
  return {
      type: ACTIONS.CHANGE_LENGTH,
      payload
  }
}

export const changeTags = (payload) => {
  return {
      type: ACTIONS.CHANGE_TAGS,
      payload
  }
}

export const changePricePerDay = (payload) => {
  return {
      type: ACTIONS.CHANGE_PRICE_PER_DAY,
      payload
  }
}

export const changePricePerMonth = (payload) => {
  return {
      type: ACTIONS.CHANGE_PRICE_PER_MONTH,
      payload
  }
}

export const changeRendering = (payload) => {
  return {
      type: ACTIONS.CHANGE_RENDERING
  }
}

export const changeSpecificSearch = (payload) => {
  return {
    type: ACTIONS.CHANGE_SPECIFIC_SEARCH,
    payload
  }
}