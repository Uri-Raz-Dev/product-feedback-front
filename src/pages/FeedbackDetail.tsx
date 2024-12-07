import { useParams } from 'react-router-dom'
import CommentsList from '../cmps/CommentList'
import FeedbackHeader from '../cmps/FeedbackHeader'
import { useEffect } from 'react'
import { loadSuggestion } from '../store/actions/suggestions.action'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import SuggestionCard from '../cmps/SuggestionCard'

function FeedbackDetail() {
  const { id } = useParams()
  const suggestion = useSelector(
    (state: RootState) => state.suggestionsModule.suggestion
  )

  useEffect(() => {
    loadSuggestion(id!)
  }, [id])

  if (!suggestion) return <div>Loading...</div>

  return (
    <section className='feedback-detail'>
      <FeedbackHeader />
      <SuggestionCard suggestion={suggestion} />
      <CommentsList suggestion={suggestion} />
    </section>
  )
}

export default FeedbackDetail
