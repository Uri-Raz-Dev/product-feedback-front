import { Suggestions } from '../../services/feedback.service.local'

export const SET_SUGGESTIONS = 'SET_SUGGESTIONS'
export const SET_SUGGESTION = 'SET_SUGGESTION'
export const REMOVE_SUGGESTION = 'REMOVE_SUGGESTION'
export const ADD_SUGGESTION = 'ADD_SUGGESTION'
export const UPDATE_SUGGESTION = 'UPDATE_SUGGESTION'
export const SET_FILTER_BY = 'SET_FILTER_BY'
export const EDIT_SUGGESTION = 'EDIT_SUGGESTION'
export const SET_SIDEBAR = 'SET_SIDEBAR'

type SuggestionsState = {
  suggestions: Suggestions[]
  sidebar: boolean
  suggestion: null
  filterBy: {
    mostupvotes: boolean
    leastupvotes: boolean
    mostcomments: boolean
    leastcomments: boolean
    ALL?: boolean
    UI?: boolean
    UX?: boolean
    Enhancement?: boolean
    Bug?: boolean
    Feature?: boolean
  }
}

type ReducerAction = {
  type: string
  suggestions?: Suggestions[]
  suggestion?: any
  suggestionToEdit?: Suggestions
  suggestionId?: string
  sidebar?: boolean
  filterBy?: {
    mostupvotes?: boolean
    leastupvotes?: boolean
    mostcomments?: boolean
    leastcomments?: boolean
    ALL?: boolean
    UI?: boolean
    UX?: boolean
    Enhancement?: boolean
    Bug?: boolean
    Feature?: boolean
  }
}

const initialState: SuggestionsState = {
  suggestions: [],
  sidebar: false,
  suggestion: null,
  filterBy: {
    mostupvotes: true,
    leastupvotes: true,
    mostcomments: true,
    leastcomments: true,
    ALL: true,
    UI: true,
    UX: true,
    Enhancement: true,
    Bug: true,
    Feature: true,
  },
}
export function suggestionsReducer(
  state = initialState,
  action: ReducerAction
) {
  switch (action.type) {
    case SET_SUGGESTIONS:
      return { ...state, suggestions: action.suggestions || [] }

    case SET_SUGGESTION:
      return { ...state, suggestion: action.suggestion }
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

    case SET_SIDEBAR:
      return { ...state, sidebar: action.sidebar! }
    //TODO: ADD FILTERBY
    case SET_FILTER_BY:
      return { ...state, filterBy: action.filterBy }

    default:
      return state
  }
}
