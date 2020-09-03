import {ACTIONS} from '../reducers/viewSpacesReducer';

const changeSpaces = (payload)=>{
    return{
        type: ACTIONS.CHANGE_SPACES,
        payload
    }
}


export default changeSpaces;