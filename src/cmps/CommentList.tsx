import { suggestion } from './SuggestionCard'
import CommentDetail from './CommentDetail'

export type comments = {
  _id: number
  replies: replies[]
  content: string
  user: { image: string; name: string; username: string }
}

export type replies = {
  content: string
  replyingTo: string
  user: {
    image: string
    name: string
    username: string
  }
}

function CommentList({ suggestion }: suggestion) {
  // console.log(suggestion)
  const comments = suggestion.comments || []
  const replies = comments.flatMap((comment) => {
    return comment.replies
  })
  console.log('sug', suggestion)
  return (
    <>
      <ul className='comment-list'>
        <h2 className='comment-count'>
          {comments.length > 0 ? comments.length + replies.length - 1 : 0}{' '}
          Comments
        </h2>
        {comments.map((comment: comments) => {
          return (
            <CommentDetail
              key={comment._id}
              comment={comment}
              reply={comment.replies}
            />
          )
        })}
      </ul>
    </>
  )
}

export default CommentList
