import { useState } from 'react'
import { suggestion } from './SuggestionCard'

function CommentList({ suggestion }: suggestion) {
  // console.log(suggestion)

  type replies = {
    content: string
    replyingTo: string
    user: {
      image: string
      name: string
      username: string
    }
  }

  const replies = suggestion.comments.map((comment) => {
    return comment.replies
  })

  return (
    <>
      <ul className='comment-list'>
        <h2 className='comment-count'>
          {suggestion.comments.length + replies.length} Comments
        </h2>
        {suggestion.comments.map((comment) => {
          return (
            <li
              className={comment.replies ? 'comment-open' : 'comment'}
              key={comment._id}
            >
              <section className='comment-header'>
                <img src={comment.user.image} alt='user-image' />
                <div className='comment-username-container'>
                  <div>{comment.user.name}</div>
                  <div>
                    <span>@</span>
                    {comment.user.username}
                  </div>
                </div>
                <span>Reply</span>
              </section>
              <p>{comment.content}</p>
              {comment.replies && (
                <ul className='reply-container'>
                  {comment.replies.map((reply: replies) => {
                    return (
                      <li className='reply' key={reply.user.username}>
                        <section className='reply-header comment-header'>
                          <img src={reply.user.image} alt='user-image' />
                          <div className='comment-username-container reply-comment-container'>
                            <div>{reply.user.name}</div>
                            <div>
                              <span>@</span>
                              {reply.user.username}
                            </div>
                          </div>
                          <span className='reply-button'>Reply</span>
                        </section>

                        <p>
                          <span>@{reply.replyingTo} </span>
                          {reply.content}
                        </p>
                      </li>
                    )
                  })}
                </ul>
              )}
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default CommentList
