import { Link } from 'react-router-dom'
import { SvgIcon } from './Svgicon'

function AddFeedback(): JSX.Element {
  return (
    <Link className='add-feedback' to='/create_feedback'>
      <span>
        <SvgIcon iconName='plus' />
      </span>
      <span>Add Feedback</span>
    </Link>
  )
}

export default AddFeedback
