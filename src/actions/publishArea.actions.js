import {ACTIONS} from "../reducers/publishAreaReducer"


const changeDescription = (payload) => {
    return {
        type: ACTIONS.CHANGE_DESCRIPTION,
        payload
    }
}

const changeArea = (payload) => {
    return {
        type: ACTIONS.CHANGE_AREA,
        payload
    }
}

const changePublishAreaView = (payload) => {
    return {
        type: ACTIONS.CHANGE_VIEWING_FORM,
        payload
    }
}

const changeWidth = (payload) => {
    return {
        type: ACTIONS.CHANGE_WIDTH,
        payload
    }
}

const changeLength = (payload) => {
    return {
        type: ACTIONS.CHANGE_LENGTH,
        payload
    }
}

const changeHeight = (payload) => {
    return {
        type: ACTIONS.CHANGE_HEIGHT,
        payload
    }
}

const changeCity = (payload) => {
    return {
        type: ACTIONS.CHANGE_CITY,
        payload
    }
}

const changeAddress = (payload) => {
    return {
        type: ACTIONS.CHANGE_ADDRESS,
        payload
    }
}

const changeTags = (payload) => {
    return {
        type: ACTIONS.CHANGE_TAGS,
        payload
    }
}

const changePhotos = (payload) => {
    return {
        type: ACTIONS.CHANGE_PHOTOS,
        payload
    }
}

const changePrice = (payload) => {
    return {
        type: ACTIONS.CHANGE_PRICE,
        payload
    }
}


export {
    changeDescription,
    changeArea,
    changeLength,
    changeHeight,
    changeWidth,
    changePublishAreaView,
    changeCity,
    changeAddress,
    changeTags,
    changePhotos,
    changePrice
}


