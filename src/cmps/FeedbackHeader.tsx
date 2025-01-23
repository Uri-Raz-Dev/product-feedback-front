import { Link } from 'react-router-dom'
import { SvgIcon } from './Svgicon'

function FeedbackHeader({ id }: any) {
  return (
    <header className='feedback-header'>
      <span className='nav-back'>
        <SvgIcon iconName='arrowLeft'></SvgIcon>
        <Link to={'/'}>Go Back</Link>
      </span>
      <Link className='edit-feedback' to={`/create_feedback/${id}`}>
        <span>Edit Feedback</span>
      </Link>
    </header>
  )
}

export default FeedbackHeader
