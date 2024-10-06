import {
  combineReducers,
  compose,
  legacy_createStore as createStore,
} from 'redux'
import { suggestionsReducer } from './reducers/suggestions.reducer'

const rootReducer = combineReducers({
  suggestionsModule: suggestionsReducer,
})

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(rootReducer, composeEnhancers())
export type RootState = ReturnType<typeof store.getState>
