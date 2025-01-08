import {
  combineReducers,
  compose,
  legacy_createStore as createStore,
} from 'redux'
import { suggestionsReducer } from './reducers/suggestions.reducer'

const rootReducer = combineReducers({
  suggestionsModule: suggestionsReducer,
  userModule: userReducer,
})

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}

// Redux DevTools setup
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// Create the store with the composed enhancers
export const store = createStore(rootReducer, composeEnhancers())

// Export RootState type to be used throughout the application
export type RootState = ReturnType<typeof rootReducer>
