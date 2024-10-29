import CommentsList from '../cmps/CommentList'
import FeedbackHeader from '../cmps/FeedbackHeader'

function FeedbackDetail() {
  return (
    <section className='feedback-detail '>
      <FeedbackHeader />
      <CommentsList />
    </section>
  )
}

export default FeedbackDetail
