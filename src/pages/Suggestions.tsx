import { useEffect, useState } from 'react'
import AddFeedback from '../cmps/AddFeedback'
import SuggestionsList from '../cmps/SuggestionsList'
import {
  loadSuggestions,
  setFilterBy,
  setSortBy,
} from '../store/actions/suggestions.action'
import { RootState } from '../store/store'
import { useSelector } from 'react-redux'
import Sidebar from '../cmps/Sidebar'
import { FilterBy, SortBy } from '../services/feedback.service.local'
import SortByDropdown from '../cmps/SortBy'
import { login } from '../store/actions/user.action'
import { useLocalStorage } from 'usehooks-ts'

export let someArr: any[]

function Suggestions(): JSX.Element {
  const suggestions = useSelector(
    (state: RootState) => state.suggestionsModule.suggestions
  )

  const suggestion = useSelector(
    (state: RootState) => state.suggestionsModule.suggestion
  )

  const sidebar = useSelector(
    (state: RootState) => state.suggestionsModule.sidebar
  )

  const filterBy = useSelector(
    (state: RootState) => state.suggestionsModule.filterBy
  )

  const sortBy = useSelector(
    (state: RootState) => state.suggestionsModule.sortBy
  )

  // const [suggestion, setSuggestion] = useLocalStorage('suggestions')

  useEffect(() => {
    loadSuggestions(filterBy, sortBy)

    login({ username: 'velvetround', password: 1234 })
  }, [filterBy, sortBy, suggestion])

  console.log(suggestions)
  const categories: string[] = [
    'All',
    'UI',
    'UX',
    'Enhancement',
    'Bug',
    'Feature',
  ]

  function handleCategoryChange(categoryType: string) {
    const categoryMapping: Record<string, FilterBy> = {
      ALL: { ALL: true },
      UI: { UI: true },
      UX: { UX: true },
      Enhancement: { Enhancement: true },
      Bug: { Bug: true },
      Feature: { Feature: true },
    }

    setFilterBy(categoryMapping[categoryType])
  }

  function handleSortChange(sortType: string) {
    const sortMapping: Record<string, SortBy> = {
      'Most Upvotes': { mostupvotes: true },
      'Least Upvotes': { leastupvotes: true },
      'Most Comments': { mostcomments: true },
      'Least Comments': { leastcomments: true },
    }

    setSortBy(sortMapping[sortType])
  }

  return (
    <div className='suggestions-layout full main-layout'>
      <section className='feedback-menu-layout full main-layout '>
        <div className='feedback-menu'>
          <SortByDropdown
            handlesortchange={handleSortChange}
            someArr={someArr}
          />
          <AddFeedback />
        </div>
      </section>
      <SuggestionsList suggestions={suggestions} />
      <Sidebar
        categories={categories}
        sidebar={sidebar}
        handlecategorychange={handleCategoryChange}
        suggestions={suggestions}
      />
    </div>
  )
}

export default Suggestions
