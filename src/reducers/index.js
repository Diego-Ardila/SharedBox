import {createStore, combineReducers} from 'redux';
import {publishAreaReducer} from './publishAreaReducer'
import {viewSpacesReducer} from './viewSpacesReducer'
import {searchFormReducer} from './searchFormReducer'

const rootReducer = combineReducers({ viewSpacesReducer, publishAreaReducer, searchFormReducer});

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )

export default store