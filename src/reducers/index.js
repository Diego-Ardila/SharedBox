import {createStore} from 'redux';
import {publishAreaReducer} from './publishAreaReducer'

const store = createStore(
    publishAreaReducer
  )

export default store