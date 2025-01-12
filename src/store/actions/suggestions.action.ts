import { EntityWithId } from '../../services/async-storage.service'
import {
  feedbackService,
  FilterBy,
  SortBy,
} from '../../services/feedback.service.local'
import {
  ADD_SUGGESTION,
  REMOVE_SUGGESTION,
  SET_FILTER_BY,
  SET_SIDEBAR,
  SET_SORT_BY,
  SET_SUGGESTION,
  SET_SUGGESTIONS,
  UPDATE_SUGGESTION,
} from '../reducers/suggestions.reducer'
import { store } from '../store'

export async function loadSuggestions(
  filterBy: FilterBy = {},
  sortBy: SortBy = {}
) {
  //ADD PAGE INDEX
  try {
    const suggestions = await feedbackService.query(filterBy, sortBy)
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

export async function saveSuggestion(suggestion: any) {
  try {
    const newSuggestion = await feedbackService.saveSuggestion(suggestion)
    store.dispatch({ type: ADD_SUGGESTION, suggestion: newSuggestion })
  } catch (e) {
    console.log((e as Error).message)
    throw new Error("Couldn't add suggestion")
  }
}

export function setSideBar(sidebar = false) {
  return store.dispatch({ type: SET_SIDEBAR, sidebar })
}

export function setFilterBy(filterBy: FilterBy) {
  store.dispatch({ type: SET_FILTER_BY, filterBy })
}
export function setSortBy(sortBy: SortBy) {
  store.dispatch({ type: SET_SORT_BY, sortBy })
}
