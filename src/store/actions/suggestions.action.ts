import {
  feedbackService,
  FilterBy,
} from '../../services/feedback.service.local'
import {
  ADD_SUGGESTION,
  REMOVE_SUGGESTION,
  SET_FILTER_BY,
  SET_SIDEBAR,
  SET_SUGGESTION,
  SET_SUGGESTIONS,
  UPDATE_SUGGESTION,
} from '../reducers/suggestions.reducer'
import { store } from '../store'

export async function loadSuggestions(filterBy: FilterBy = {}) {
  //ADD PAGE INDEX
  try {
    const suggestions = await feedbackService.query(filterBy)
    store.dispatch({ type: SET_SUGGESTIONS, suggestions })
  } catch (e) {
    console.log((e as Error).message)
    throw new Error("Couldn't load suggestions")
  }
}

export async function loadSuggestion(suggestionId: string) {
  try {
    const suggestion = await feedbackService.getSuggestionById(
      Number(suggestionId)
    )
    store.dispatch({ type: SET_SUGGESTION, suggestion })
  } catch (e) {
    console.log((e as Error).message)
    throw new Error("Couldn't load suggestion")
  }
}

export async function removeSuggestion(suggestionId: string) {
  try {
    const suggestion = await feedbackService.remove(suggestionId)
    store.dispatch({ type: REMOVE_SUGGESTION, suggestion })
  } catch (e) {
    console.log((e as Error).message)
    throw new Error("Couldn't load suggestions")
  }
}

export function setSideBar(sidebar = false) {
  return store.dispatch({ type: SET_SIDEBAR, sidebar })
}

export function setFilterBy(filterBy: FilterBy) {
  store.dispatch({ type: SET_FILTER_BY, filterBy })
}
