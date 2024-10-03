import { Link } from 'react-router-dom'
import { SvgIcon } from './Svgicon'

function AddFeedback(): JSX.Element {
  return (
    <Link className='add-feedback' to='/'>
      <span>
        <SvgIcon iconName='plus' />
      </span>
      <span>Add Feedback</span>
    </Link>
  )
}

export default AddFeedback
