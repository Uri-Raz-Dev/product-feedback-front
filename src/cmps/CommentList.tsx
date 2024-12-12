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

  const replies = suggestion.comments.flatMap((comment) => {
    return comment.replies
  })

  return (
    <>
      <ul className='comment-list'>
        <h2 className='comment-count'>
          {suggestion.comments.length + replies.length - 1} Comments
        </h2>
        {suggestion.comments.map((comment: comments) => {
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
