import { Link } from 'react-router-dom'
import { SvgIcon } from '../cmps/Svgicon'
import NavBack from '../cmps/NavBack'

function NewFeedback() {
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
          <textarea name='feedback-title' id='feedback-title'></textarea>
        </section>

        <section className='category-container'>
          <h3>Category</h3>
          <div className='sub-header'>Choose Category for your feedback</div>
          <div className='category-dropdown-container'>
            <span className='category-dropdown'>Feature</span>
            <SvgIcon iconName='arrowDown' />
          </div>
        </section>

        <section className='feedback-detail-container'>
          <h3>Feedback Detail</h3>
          <div className='sub-header'>
            Include any specific comments on what should be improved,added,etc.
          </div>
          <textarea name='feedback-detail' id='feedback-detail'></textarea>
          <div className='feedback-btn-container'>
            <Link to={'/'}>Add Feedback</Link>
            <span>Cancel</span>
          </div>
        </section>
      </div>
    </div>
  )
}

export default NewFeedback
