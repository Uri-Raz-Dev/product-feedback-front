function AddComment() {
  return (
    <section className='add-comment'>
      <h2>Add Comment</h2>
      <textarea placeholder='Type your comment here'></textarea>
      <div className='post-comment'>
        <span>250 Characters left</span>
        <span>Post Comment</span>
      </div>
    </section>
  )
}

export default AddComment
