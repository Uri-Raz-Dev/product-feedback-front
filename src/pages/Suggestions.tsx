import { useEffect } from 'react'
import AddFeedback from '../cmps/AddFeedback'
import SortBy from '../cmps/SortBy'
import SuggestionsList from '../cmps/SuggestionsList'
import { loadSuggestions } from '../store/actions/suggestions.action'
import { RootState } from '../store/store'
import { useSelector } from 'react-redux'
function Suggestions(): JSX.Element {
  const suggestions = useSelector(
    (state: RootState) => state.suggestionsModule.suggestions
  )
  useEffect(() => {
    loadSuggestions()
  }, [])
  return (
    <div className='suggestions-layout full main-layout'>
      <section className='feedback-menu-layout full main-layout '>
        <div className='feedback-menu'>
          <SortBy />
          <AddFeedback />
        </div>
      </section>
      <SuggestionsList suggestions={suggestions} />
    </div>
  )
}

export default Suggestions
