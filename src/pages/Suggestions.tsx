import { useEffect } from 'react'
import AddFeedback from '../cmps/AddFeedback'
import SortBy from '../cmps/SortBy'
import SuggestionsList from '../cmps/SuggestionsList'
import { loadSuggestions } from '../store/actions/suggestions.action'
import { RootState } from '../store/store'
import { useSelector } from 'react-redux'
import Sidebar from '../cmps/Sidebar'
import { FilterBy } from '../services/feedback.service.local'

function Suggestions(): JSX.Element {
  const suggestions = useSelector(
    (state: RootState) => state.suggestionsModule.suggestions
  )
  const sidebar = useSelector(
    (state: RootState) => state.suggestionsModule.sidebar
  )

  const filterBy = useSelector(
    (state: RootState) => state.suggestionsModule.filterBy
  )
  useEffect(() => {
    loadSuggestions(filterBy)
  }, [filterBy])

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

    const filterBy = categoryMapping[categoryType] || {}
    loadSuggestions(filterBy)
  }
  function handleSortChange(sortType: string) {
    const sortMapping: Record<string, FilterBy> = {
      'Most Upvotes': { mostupvotes: true },
      'Least Upvotes': { leastupvotes: true },
      'Most Comments': { mostcomments: true },
      'Least Comments': { leastcomments: true },
    }

    const filterBy = sortMapping[sortType] || {}
    loadSuggestions(filterBy)
  }

  return (
    <div className='suggestions-layout full main-layout'>
      <section className='feedback-menu-layout full main-layout '>
        <div className='feedback-menu'>
          <SortBy handlesortchange={handleSortChange} />
          <AddFeedback />
        </div>
      </section>
      <SuggestionsList suggestions={suggestions} />
      <Sidebar
        categories={categories}
        sidebar={sidebar}
        handlecategorychange={handleCategoryChange}
      />
    </div>
  )
}

export default Suggestions
