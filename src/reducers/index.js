import {createStore} from 'redux';
import {publishAreaReducer} from './publishAreaReducer'

const store = createStore(
    publishAreaReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )

export default store