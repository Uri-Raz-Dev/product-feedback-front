import { useEffect } from 'react'
import AddFeedback from '../cmps/AddFeedback'
import SortBy from '../cmps/SortBy'
import SuggestionsList from '../cmps/SuggestionsList'
import { loadSuggestions } from '../store/actions/suggestions.action'
import { RootState } from '../store/store'
import { useSelector } from 'react-redux'
import Sidebar from '../cmps/Sidebar'
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

  function handleSortChange(sortType: string) {
    const filterBy: any = {}
    if (sortType === 'Most Upvotes') filterBy.mostupvotes = true
    if (sortType === 'Least Upvotes') filterBy.leastupvotes = true
    if (sortType === 'Most Comments') filterBy.mostcomments = true
    if (sortType === 'Least Comments') filterBy.leastcomments = true

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
      <Sidebar categories={categories} sidebar={sidebar} />
    </div>
  )
}

export default Suggestions
