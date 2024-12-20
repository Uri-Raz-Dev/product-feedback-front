import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { loadSuggestion } from '../store/actions/suggestions.action'
import { RootState } from '../store/store'
import { layouts } from 'chart.js'
import { SvgIcon } from '../cmps/Svgicon'
import { log } from 'console'

function EditFeedback() {
  const { id } = useParams()
  const suggestion = useSelector(
    (state: RootState) => state.suggestionsModule.suggestion
  )
  useEffect(() => {
    loadSuggestion(id!)
  }, [id])
  if (!suggestion) return <div>Loading...</div>

  // console.log(suggestion)

  const category =
    suggestion.category.substring(0, 1).toUpperCase() +
    suggestion.category.substring(1, suggestion.category.length)

  const status =
    suggestion.status.substring(0, 1).toUpperCase() +
    suggestion.status.substring(1, suggestion.status.length)

  return (
    <div className='edit-feedback-layout'>
      <span className='nav-back'>
        <SvgIcon iconName='arrowLeft' />
        <Link to={'/'}>Go Back</Link>
      </span>
      <div className='feedback-form '>
        <section className='feedback-title-container'>
          <span className='circle'>
            <SvgIcon iconName='editFeedback' />
          </span>
          <h2 className='new-feedback-header'>{suggestion.title}</h2>
          <h3>Feedback Title</h3>
          <div className='sub-header'>Add a short, descriptive headilne</div>
          <textarea
            name='feedback-title'
            id='feedback-title'
            placeholder={suggestion.title}
          ></textarea>
        </section>

        <section className='category-container'>
          <h3>Category</h3>
          <div className='sub-header'>Choose Category for your feedback</div>
          <div className='category-dropdown-container'>
            <span className='category-dropdown'>{category}</span>
            <SvgIcon iconName='arrowDown' />
          </div>
        </section>

        <section className='update-container'>
          <h3>Update Status</h3>
          <div className='sub-header'>Change feature state</div>
          <div className='update-dropdown-container'>
            <span className='update-dropdown'>{status}</span>
            <SvgIcon iconName='arrowDown' />
          </div>
        </section>

        <section className='feedback-detail-container'>
          <h3>Feedback Detail</h3>
          <div className='sub-header'>
            Include any specific comments on what should be improved,added,etc.
          </div>
          <textarea
            name='feedback-detail'
            id='feedback-detail'
            placeholder={suggestion.description}
          ></textarea>
          <div className='feedback-btn-container'>
            <Link to={'/'}>Add Feedback</Link>
            <span>Cancel</span>
            <span>Delete</span>
          </div>
        </section>
      </div>
    </div>
  )
}

export default EditFeedback
