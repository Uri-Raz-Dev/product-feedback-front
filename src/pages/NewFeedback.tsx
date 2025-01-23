import { Link, useNavigate, useParams } from 'react-router-dom'
import { SvgIcon } from '../cmps/Svgicon'
import NavBack from '../cmps/NavBack'
import { useEffect, useState } from 'react'
import {
  loadSuggestion,
  loadSuggestions,
  saveSuggestion,
  setCategory,
  setSortBy,
  updateSuggestion,
} from '../store/actions/suggestions.action'
import { RootState } from '../store/store'
import { useSelector } from 'react-redux'
import { utilService } from '../services/util.service'
import { SelectCategory } from '../services/feedback.service.local'
import SortByDropdown from '../cmps/SortBy'

function NewFeedback() {
  const [feedbackData, setFeedbackData] = useState({
    title: '',
    description: '',
    status: 'live',
    category: 'Feature',
    upvotes: 0,
  })

  const filterBy = useSelector(
    (state: RootState) => state.suggestionsModule.filterBy
  )

  const sortBy = useSelector(
    (state: RootState) => state.suggestionsModule.sortBy
  )

  const navigate = useNavigate()
  const { id } = useParams()
  const suggestion = useSelector(
    (state: RootState) => state.suggestionsModule.suggestion || {}
  )
  const [sug, setSug] = useState(suggestion)

  const someArr = ['Feature', 'UI', 'UX', 'Enhancement', 'Bug']

  useEffect(() => {
    if (id) {
      loadSuggestion(id)
    }
  }, [id])

  useEffect(() => {
    if (id) {
      setSug(suggestion) // Sync local state with Redux suggestion
    }
  }, [suggestion, id])

  function handleSortChange(sortType: string) {
    id
      ? setSug((prevSug: any) => ({
          ...prevSug,
          category: sortType,
        }))
      : setFeedbackData((prevFeedback) => ({
          ...prevFeedback,
          category: sortType, // Update the category in feedbackData
        }))
  }
  function handleChange({ target }: any) {
    let value = target.value
    const field = target.name
    switch (target.type) {
      case 'number':
        value = +value
        break
      case 'checkbox':
        value = target.checked
        break
      default:
        break
    }
    id
      ? setSug((prevSug: any) => ({
          ...prevSug,
          [field]: value,
        }))
      : setFeedbackData((prevFeedback) => ({
          ...prevFeedback,
          [field]: value,
        }))
  }
  console.log(suggestion)

  function onSubmit() {
    saveSuggestion(feedbackData)
    console.log('Feedback submitted:', feedbackData)
  }
  return (
    <div className='new-feedback-layout'>
      <NavBack />
      <div className='feedback-form '>
        <section className='feedback-title-container'>
          <span className='circle'>
            <SvgIcon iconName='newFeedback' />
          </span>
          <h2 className='new-feedback-header'>Create New Feedback</h2>
          <h3>Feedback Title</h3>
          <div className='sub-header'>Add a short, descriptive headilne</div>
          <textarea
            onChange={handleChange}
            name='title'
            id='feedback-title'
            value={id ? sug.title || '' : feedbackData.title}
          ></textarea>
        </section>

        <section className='category-container'>
          <h3>Category</h3>
          <div className='sub-header'>Choose Category for your feedback</div>
          <SortByDropdown
            handlesortchange={handleSortChange}
            someArr={someArr}
            sug={sug}
            id={id}
          />
        </section>

        <section className='feedback-detail-container'>
          <h3>Feedback Detail</h3>
          <div className='sub-header'>
            Include any specific comments on what should be improved,added,etc.
          </div>
          <textarea
            onChange={handleChange}
            name='description'
            id='feedback-detail'
            value={id ? sug.description || '' : feedbackData.description}
          ></textarea>
          <div className='feedback-btn-container'>
            <div
              onClick={(e) => {
                e.preventDefault()
                id
                  ? updateSuggestion(sug).then(() => navigate('/'))
                  : saveSuggestion(feedbackData).then(() => navigate('/'))
              }}
            >
              {id ? 'Edit  Feedback' : 'Add Feedback'}
            </div>
            <span>Cancel</span>
          </div>
        </section>
      </div>
    </div>
  )
}

export default NewFeedback
