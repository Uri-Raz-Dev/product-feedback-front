import { Suggestions } from '../../services/feedback.service.local'

export const SET_SUGGESTIONS = 'SET_SUGGESTIONS'
export const REMOVE_SUGGESTION = 'REMOVE_SUGGESTION'
export const ADD_SUGGESTION = 'ADD_SUGGESTION'
export const UPDATE_SUGGESTION = 'UPDATE_SUGGESTION'
export const SET_FILTER_BY = 'SET_FILTER_BY'
export const EDIT_SUGGESTION = 'EDIT_SUGGESTION'

type ReducerAction = {
  type: string
  suggestions?: Suggestions[]
  suggestion?: void
  suggestionToEdit?: Suggestions
  suggestionId?: string
}

const initialState = {
  suggestions: [] as Suggestions[],
}
export function suggestionsReducer(
  state = initialState,
  action: ReducerAction
) {
  switch (action.type) {
    case SET_SUGGESTIONS:
      return { ...state, suggestions: action.suggestions || [] }
    case ADD_SUGGESTION:
      return {
        ...state,
        suggestions: [...state.suggestions, action.suggestion!],
      }
    case UPDATE_SUGGESTION:
      const suggestion = state.suggestions.map((suggestion: Suggestions) => {
        const hasMatchingProductRequest = suggestion.productRequests.some(
          (productRequest) => productRequest._id === action.suggestionId
        )

        return hasMatchingProductRequest ? action.suggestion! : suggestion
      })
      return { ...state, suggestion }

    case REMOVE_SUGGESTION:
      const suggestions = state.suggestions.filter(
        (suggestion: Suggestions) => {
          const hasMatchingProductRequest = suggestion.productRequests.some(
            (productRequest) => productRequest._id === action.suggestionId
          )

          return !hasMatchingProductRequest
        }
      )
      return { ...state, suggestions }

    case EDIT_SUGGESTION:
      return { ...state, suggestionToEdit: action.suggestionToEdit }

    //TODO: ADD FILTERBY
    // case SET_FILTER_BY:
    //   return { ...state, filterBy: action.filterBy }

    default:
      return state
  }
}
