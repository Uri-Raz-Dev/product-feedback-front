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
  useEffect(() => {
    loadSuggestions()
  }, [])

  const categories: string[] = [
    'ALL',
    'UI',
    'UX',
    'Enhancement',
    'Bug',
    'Feature',
  ]

  return (
    <div className='suggestions-layout full main-layout'>
      <section className='feedback-menu-layout full main-layout '>
        <div className='feedback-menu'>
          <SortBy />
          <AddFeedback />
        </div>
      </section>
      <SuggestionsList suggestions={suggestions} />
      <Sidebar categories={categories} sidebar={sidebar} />
    </div>
  )
}

export default Suggestions
