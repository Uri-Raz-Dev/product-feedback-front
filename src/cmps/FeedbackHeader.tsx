import { Link } from 'react-router-dom'
import { SvgIcon } from './Svgicon'

function FeedbackHeader() {
  return (
    <header className='feedback-header'>
      <span className='nav-back'>
        <SvgIcon iconName='arrowLeft'></SvgIcon>
        <Link to={'/'}>Go Back</Link>
      </span>
      <Link className='edit-feedback' to='/edit'>
        <span>Edit Feedback</span>
      </Link>
    </header>
  )
}

export default FeedbackHeader
