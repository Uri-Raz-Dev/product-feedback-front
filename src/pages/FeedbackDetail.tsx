import { useParams } from 'react-router-dom'
import CommentsList from '../cmps/CommentList'
import FeedbackHeader from '../cmps/FeedbackHeader'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { utilService } from '../services/util.service'
import { SvgIcon } from '../cmps/Svgicon'
import { loadSuggestion } from '../store/actions/suggestions.action'

function FeedbackDetail() {
  const { id } = useParams()
  const suggestion = useSelector(
    (state: RootState) => state.suggestionsModule.suggestion
  )
  useEffect(() => {
    if (id) {
      loadSuggestion(id) // No need to await here since Redux handles state updates
    }
  }, [id])

  return (
    <section className='feedback-detail'>
      <FeedbackHeader />

      {/*       
        <div className='suggestion-card'>
          <div>{suggestion.title}</div>
          <p>{suggestion.description}</p>
          <div>{utilService.toUpperCase(suggestion.category)}</div>
          <section className='upvote-and-comment'>
            <div>
              <SvgIcon iconName='arrowUp' />
              <span> {suggestion.upvotes}</span>
            </div>
            <div>
              <SvgIcon iconName='comments' />
              <span> {suggestion.comments?.length ?? 0}</span>
            </div>
          </section>
        </div> */}

      <CommentsList />
    </section>
  )
}

export default FeedbackDetail
