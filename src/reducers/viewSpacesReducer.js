let initialState = {
    spaces:[]
}

const ACTIONS= {
     CHANGE_SPACES : "CHANGE_SPACES"
}


const viewSpacesReducer = (state = initialState, action) => {
    switch(action.type){
        case ACTIONS.CHANGE_SPACES : 
        return {
            spaces: action.payload
        }
        default : return state
    }
}

export {
    viewSpacesReducer,
    ACTIONS
}