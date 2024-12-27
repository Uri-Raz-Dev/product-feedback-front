import { Link } from 'react-router-dom'
import { SvgIcon } from './Svgicon'

function NavBack() {
  return (
    <span className='nav-back'>
      <SvgIcon iconName='arrowLeft' />
      <Link to={'/'}>Go Back</Link>
    </span>
  )
}

export default NavBack
