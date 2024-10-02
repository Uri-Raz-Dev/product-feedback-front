import {
  combineReducers,
  compose,
  legacy_createStore as createStore,
} from 'redux'
import { productReducer } from './reducers/product.reducer'

const rootReducer = combineReducers({
  productModule: productReducer,
})

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(rootReducer, composeEnhancers())
