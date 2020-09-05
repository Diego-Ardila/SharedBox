import {createStore, combineReducers} from 'redux';
import {publishAreaReducer} from './publishAreaReducer'
import {viewSpacesReducer} from './viewSpacesReducer'
import {searchFormReducer} from './searchFormReducer'
import {loginUserReducer} from './loginUserReducer'

const rootReducer = combineReducers({ viewSpacesReducer, publishAreaReducer, searchFormReducer, loginUserReducer});

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )

export default store